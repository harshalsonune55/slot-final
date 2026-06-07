import { pipeline } from "@xenova/transformers";

// Small (~80MB) local embedding model — runs on CPU, no API key needed.
// Produces 384-dimensional vectors.
const MODEL = "Xenova/all-MiniLM-L6-v2";
export const EMBEDDING_DIMENSIONS = 384;

let extractorPromise;
function getExtractor() {
  if (!extractorPromise) extractorPromise = pipeline("feature-extraction", MODEL);
  return extractorPromise;
}

export async function embed(text) {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

export async function embedBatch(texts) {
  const extractor = await getExtractor();
  const results = [];
  for (const text of texts) {
    const output = await extractor(text, { pooling: "mean", normalize: true });
    results.push(Array.from(output.data));
  }
  return results;
}
