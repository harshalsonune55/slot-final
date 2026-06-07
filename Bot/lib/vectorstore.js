import mongoose from "mongoose";
import { embed, EMBEDDING_DIMENSIONS } from "./embeddings.js";

// Static knowledge chunks (FAQ / how-it-works / policies) embedded once via
// scripts/ingest.js and searched with an Atlas Vector Search index.
//
// NOTE: the Atlas Vector Search index itself ("knowledge_vector_index" by
// default — see VECTOR_INDEX_NAME) must be created manually in the Atlas UI
// or via `mongosh`/Atlas CLI; it cannot be created through the driver. See
// Bot/scripts/ingest.js for the index definition to paste in.
const knowledgeChunkSchema = new mongoose.Schema({
  text:       { type: String, required: true },
  source:     { type: String, default: "faq" },
  embedding:  { type: [Number], required: true },
}, { timestamps: true });

export const KnowledgeChunk = mongoose.models.KnowledgeChunk
  || mongoose.model("KnowledgeChunk", knowledgeChunkSchema, "knowledge_chunks");

const VECTOR_INDEX_NAME = process.env.VECTOR_INDEX_NAME || "knowledge_vector_index";

export async function upsertChunks(chunks) {
  await KnowledgeChunk.deleteMany({});
  for (const chunk of chunks) {
    const embedding = await embed(chunk.text);
    await KnowledgeChunk.create({ text: chunk.text, source: chunk.source, embedding });
  }
}

export async function searchKnowledge(query, k = 4) {
  const queryEmbedding = await embed(query);

  return KnowledgeChunk.aggregate([
    {
      $vectorSearch: {
        index: VECTOR_INDEX_NAME,
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: Math.max(k * 10, 50),
        limit: k,
      },
    },
    { $project: { text: 1, source: 1, score: { $meta: "vectorSearchScore" } } },
  ]);
}

export { EMBEDDING_DIMENSIONS };
