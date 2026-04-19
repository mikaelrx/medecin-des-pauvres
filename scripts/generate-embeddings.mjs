import { pipeline } from "@xenova/transformers";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const remedies = JSON.parse(
  readFileSync(join(__dirname, "../data/remedies.json"), "utf-8")
);

console.log(`Chargement du modèle...`);
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
);

console.log(`Calcul des embeddings pour ${remedies.length} remèdes...`);

const embeddings = [];
for (let i = 0; i < remedies.length; i++) {
  const r = remedies[i];
  const text = [r.remede, ...(r.symptomes ?? []), r.description].join(" ");
  const output = await extractor(text, { pooling: "mean", normalize: true });
  embeddings.push({ id: i, embedding: Array.from(output.data) });
  process.stdout.write(`\r${i + 1}/${remedies.length} - ${r.remede}`);
}

writeFileSync(
  join(__dirname, "../data/embeddings.json"),
  JSON.stringify(embeddings)
);

console.log("\nTerminé ! data/embeddings.json généré.");
