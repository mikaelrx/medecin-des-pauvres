import { NextRequest, NextResponse } from "next/server";
import { pipeline, env } from "@xenova/transformers";
import remediesData from "@/data/remedies.json";
import embeddingsData from "@/data/embeddings.json";
import type { Remedy } from "@/types/remedy";
import { normalize } from "@/lib/normalize";

env.cacheDir = "/tmp/transformers-cache";

type Extractor = Awaited<ReturnType<typeof pipeline>>;
let extractor: Extractor | null = null;

async function getExtractor(): Promise<Extractor> {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
    );
  }
  return extractor;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

const remedies = (remediesData as Remedy[]).map((r, i) => ({ ...r, id: i }));
const embeddings = embeddingsData as { id: number; embedding: number[] }[];

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const categorie = request.nextUrl.searchParams.get("categorie");
  if (!query || query.trim().length < 2) return NextResponse.json({ results: [], suggestions: [] });

  const ext = await getExtractor();
  const embed = (text: string) =>
    (ext as (text: string, opts: object) => Promise<{ data: Float32Array }>)(
      text,
      { pooling: "mean", normalize: true }
    ).then((o) => Array.from(o.data));

  const raw = query.trim();
  const stripped = normalize(raw);
  const [embRaw, embStripped] = await Promise.all([embed(raw), embed(stripped)]);

  const hasAccents = raw !== stripped;
  const threshold = hasAccents ? 0.50 : 0.35;

  const queryWords = stripped.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

  const scored = embeddings.map((e) => {
    const r = remedies[e.id];
    const semanticScore = Math.max(
      cosineSimilarity(embRaw, e.embedding),
      cosineSimilarity(embStripped, e.embedding)
    );
    // Boost lexical si un mot de la requête apparaît dans le remède
    const remedyText = [r.remede, ...(r.symptomes ?? []), r.description ?? ""]
      .join(" ")
      .toLowerCase();
    const lexicalBoost = queryWords.some((w) => remedyText.includes(w)) ? 0.15 : 0;
    return { remedy: r, score: Math.min(1, semanticScore + lexicalBoost) };
  });

  scored.sort((a, b) => b.score - a.score);

  const filtered = categorie
    ? scored.filter((r) => r.remedy.categories?.includes(categorie) ?? r.remedy.categorie === categorie)
    : scored;

  const results = filtered
    .filter((r) => r.score > threshold)
    .slice(0, 5)
    .map((r) => ({ ...r.remedy, pertinence: Math.round(r.score * 100) }));

  const suggestions = results.length === 0
    ? filtered
        .slice(0, 3)
        .map((r) => ({ ...r.remedy, pertinence: Math.round(r.score * 100) }))
    : [];

  return NextResponse.json({ results, suggestions });
}
