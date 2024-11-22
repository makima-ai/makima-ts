export interface KnowledgeBase {
  name: string;
  description?: string;
  embedding_model: string;
  database_provider: string;
  createdAt?: Date;
}

export interface KBDocument {
  id: string;
  content: string;
  model: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
}

export interface SearchResult {
  id: string;
  content: string;
  model: string;
  metadata?: Record<string, any>;
  similarity: number;
}
