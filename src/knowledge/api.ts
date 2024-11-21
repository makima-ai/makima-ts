import { KBDocument, KnowledgeBase, SearchResult } from "./types";

export class KnowledgeBaseAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /** Get all knowledge bases. */
  async getAllKnowledgeBases(): Promise<KnowledgeBase[]> {
    const response = await fetch(`${this.baseUrl}/knowledge`, {
      method: "GET",
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Get details of a specific knowledge base by name. */
  async getKnowledgeBase(name: string): Promise<KnowledgeBase> {
    const response = await fetch(`${this.baseUrl}/knowledge/${name}`, {
      method: "GET",
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Create a new knowledge base. */
  async createKnowledgeBase(data: {
    name: string;
    description?: string;
    embedding_model: string;
    database_provider: string;
  }): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/knowledge/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Delete a knowledge base. */
  async deleteKnowledgeBase(name: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/knowledge/${name}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Update details of a knowledge base. */
  async updateKnowledgeBase(
    name: string,
    data: {
      embedding_model?: string;
      description?: string;
    }
  ): Promise<KnowledgeBase> {
    const response = await fetch(`${this.baseUrl}/knowledge/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Perform a similarity search on a knowledge base. */
  async searchKnowledgeBase(
    name: string,
    query: { q: string; k: number; model?: string }
  ): Promise<SearchResult[]> {
    const params = new URLSearchParams({
      q: query.q,
      k: query.k.toString(),
      ...(query.model && { model: query.model }),
    });
    const response = await fetch(
      `${this.baseUrl}/knowledge/${name}/search?${params}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Add a document to a knowledge base. */
  async addDocument(
    name: string,
    data: { content: string; model?: string; metadata?: Record<string, any> }
  ): Promise<{ id: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${name}/add-document`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Update an existing document in a knowledge base. */
  async updateDocument(
    name: string,
    data: {
      id: string; // Document ID is required.
      content?: string; // Content is optional for partial updates.
      metadata?: Record<string, any>; // Metadata is optional.
    }
  ): Promise<{ id: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${name}/update-document`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Remove a document from a knowledge base. */
  async removeDocument(
    name: string,
    documentId: string
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${name}/remove-document/${documentId}`,
      { method: "DELETE" }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }

  /** Get documents from a knowledge base, optionally filtered by query. */
  async getDocuments(
    name: string,
    query?: Record<string, string>
  ): Promise<KBDocument[]> {
    const queryString = query
      ? `?${new URLSearchParams(query).toString()}`
      : "";
    const response = await fetch(
      `${this.baseUrl}/knowledge/${name}/documents${queryString}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  }
}
