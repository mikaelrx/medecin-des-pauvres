import { NextRequest, NextResponse } from "next/server";
import remediesData from "@/data/remedies.json";
import type { Remedy } from "@/types/remedy";
import { normalize } from "@/lib/normalize";

const remedies = (remediesData as Remedy[]).map((r, i) => ({ ...r, id: i }));

const STOPWORDS = new Set([
  "je", "j", "me", "m", "te", "se", "il", "elle", "nous", "vous", "ils", "elles",
  "le", "la", "les", "un", "une", "des", "du", "de", "da", "au", "aux",
  "et", "ou", "mais", "donc", "que", "qui", "dont", "ou", "ce", "cet", "cette", "ces",
  "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses", "leur", "leurs",
  "ai", "as", "avons", "avez", "ont", "suis", "es", "est", "sommes", "etes", "sont",
  "avoir", "etre", "faire", "jai", "jal", "tres", "bien", "tout", "tous", "toutes",
  "plus", "peu", "tres", "quand", "car", "par", "sur", "sous", "dans", "avec",
  "pour", "sans", "entre", "vers", "chez", "depuis", "pendant", "aussi", "meme",
  "an", "en", "si", "ni", "ne", "pas", "plus", "non", "oui",
]);

// Synonymes pour les expressions courantes en français
const SYNONYMS: Record<string, string[]> = {
  dormir: ["sommeil", "insomnie", "cauchemar"],
  sommeil: ["insomnie", "dormir", "cauchemar"],
  manger: ["digestion", "appetit", "estomac"],
  ventre: ["digestion", "estomac", "intestin", "colique"],
  tete: ["migraine", "cephalee", "crane"],
  gorge: ["angine", "larynx", "amygdale"],
  fievre: ["temperature", "infection", "febrile"],
  peau: ["dermatose", "eczema", "dermique"],
  dent: ["dentaire", "dentition", "odontologie"],
  yeux: ["ophtalmique", "oeil", "vue"],
  nez: ["nasal", "rhinite", "rhume"],
  dos: ["lombaire", "lumbago", "colonne"],
  genou: ["articulation", "articulaire", "rhumatisme"],
  constipe: ["constipation", "transit", "evacuation"],
  fatigue: ["epuisement", "asthenie", "faiblesse"],
  stress: ["nervosite", "anxiete", "nerveux"],
  anxieux: ["anxiete", "nerveux", "nervosite"],
  angoisse: ["anxiete", "nerveux", "nervosite"],
  digerer: ["digestion", "estomac", "digestif"],
  tousser: ["toux", "bronchite", "expectorant"],
  rhume: ["rhinite", "nasal", "expectorant"],
  transpirer: ["sudation", "sueurs", "transpiration"],
  grippe: ["fievre", "infection", "febrile"],
  brulure: ["brulures", "inflammation", "tisane"],
  blessure: ["plaie", "coupure", "cicatrisation"],
  gonflement: ["oedeme", "inflammation", "articulation"],
  demangeaison: ["prurit", "peau", "eczema"],
  nausee: ["vomissement", "digestion", "estomac"],
};

const K1 = 1.5;
const B = 0.75;

function tokenize(text: string): string[] {
  return normalize(text)
    .toLowerCase()
    .replace(/'/g, " ")
    .split(/[\s,.\-;:()/!?]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function expandQuery(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const t of tokens) {
    for (const syn of SYNONYMS[t] ?? []) expanded.add(syn);
  }
  return Array.from(expanded);
}

function remedyText(r: Remedy): string {
  return [r.remede, ...(r.symptomes ?? []), r.description ?? "", r.preparation ?? ""].join(" ");
}

const corpus = remedies.map((r) => tokenize(remedyText(r)));
const avgLen = corpus.reduce((s, d) => s + d.length, 0) / corpus.length;

const idf: Record<string, number> = {};
for (const doc of corpus) {
  const seen = new Set(doc);
  for (const t of seen) idf[t] = (idf[t] ?? 0) + 1;
}
const N = corpus.length;
for (const t in idf) {
  idf[t] = Math.log((N - idf[t] + 0.5) / (idf[t] + 0.5) + 1);
}

function bm25Score(docTokens: string[], queryTokens: string[]): number {
  const freq: Record<string, number> = {};
  for (const t of docTokens) freq[t] = (freq[t] ?? 0) + 1;
  const dl = docTokens.length;
  let score = 0;
  for (const qt of queryTokens) {
    if (!(qt in idf)) continue;
    const tf = freq[qt] ?? 0;
    score += idf[qt] * ((tf * (K1 + 1)) / (tf + K1 * (1 - B + B * (dl / avgLen))));
  }
  return score;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const categorie = request.nextUrl.searchParams.get("categorie");
  if (!query || query.trim().length < 2) return NextResponse.json({ results: [], suggestions: [] });

  const rawTokens = tokenize(query.trim());
  const queryTokens = expandQuery(rawTokens);
  if (queryTokens.length === 0) return NextResponse.json({ results: [], suggestions: [] });

  const scored = corpus.map((docTokens, i) => ({
    remedy: remedies[i],
    score: bm25Score(docTokens, queryTokens),
  }));

  scored.sort((a, b) => b.score - a.score);

  const maxScore = scored[0]?.score ?? 1;
  const normalized = scored.map((s) => ({
    ...s,
    pct: maxScore > 0 ? Math.round((s.score / maxScore) * 100) : 0,
  }));

  const filtered = categorie
    ? normalized.filter(
        (r) => r.remedy.categories?.includes(categorie) ?? r.remedy.categorie === categorie
      )
    : normalized;

  const threshold = 45;
  const results = filtered
    .filter((r) => r.pct >= threshold)
    .slice(0, 5)
    .map((r) => ({ ...r.remedy, pertinence: r.pct }));

  const suggestions =
    results.length === 0
      ? filtered.slice(0, 3).map((r) => ({ ...r.remedy, pertinence: r.pct }))
      : [];

  return NextResponse.json({ results, suggestions });
}
