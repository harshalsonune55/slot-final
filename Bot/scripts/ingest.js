// Embeds the static FAQ/knowledge chunks and stores them in the
// `knowledge_chunks` collection for Atlas Vector Search retrieval.
//
// Usage: npm run ingest
//
// IMPORTANT — one-time manual step: create an Atlas Vector Search index named
// VECTOR_INDEX_NAME (default "knowledge_vector_index") on the
// `knowledge_chunks` collection with this definition:
//
// {
//   "fields": [
//     { "type": "vector", "path": "embedding", "numDimensions": 384, "similarity": "cosine" }
//   ]
// }
//
// (Atlas UI → Database → your cluster → Search → Create Search Index → JSON Editor)

import "dotenv/config";
import { connectDB } from "../lib/db.js";
import { upsertChunks, KnowledgeChunk } from "../lib/vectorstore.js";
import { faqChunks } from "../data/faq.js";

await connectDB();
console.log(`Embedding ${faqChunks.length} knowledge chunks...`);
await upsertChunks(faqChunks);
console.log(`Done. ${await KnowledgeChunk.countDocuments()} chunks stored in 'knowledge_chunks'.`);
process.exit(0);
