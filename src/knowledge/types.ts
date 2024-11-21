export interface KnowledgeBase {
  name: string;
  description?: string;
  embedding_model: string;
  database_provider: string;
  createdAt?: string;
}

/** Interface representing a document in a knowledge base. */
export interface KBDocument {
  id: string;
  content: string;
  model?: string;
  metadata?: Record<string, any>;
  createdAt?: string;
}

/** Interface for a search result. */
export interface SearchResult {
  id: string;
  content: string;
  model: string;
  metadata?: Record<string, any>;
  similarity: number;
}
