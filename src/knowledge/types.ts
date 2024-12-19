export interface KnowledgeBase {
  id: string;
  description?: string | null;
  name: string;
  embedding_model: string;
  models?: string[] | null;
  database_provider: string;
  createdAt: Date;
}

export interface KBDocument {
  id: string;
  content: string;
  model: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface SearchResult extends Omit<KBDocument, "createdAt"> {
  similarity: number;
}
