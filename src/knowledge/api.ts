import { KnowledgeBase, KBDocument, SearchResult } from "./types";

export class KnowledgeAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Get all knowledge bases
  async getKnowledgeBases(): Promise<KnowledgeBase[]> {
    const response = await fetch(`${this.baseUrl}/knowledge/`);
    if (!response.ok) {
      throw new Error(`Failed to get knowledge bases: ${response.statusText}`);
    }
    return response.json();
  }

  // Get knowledge base by name
  async getKnowledgeBaseByName(name: string): Promise<KnowledgeBase> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to get knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Create a new knowledge base
  async createKnowledgeBase(kb: {
    name: string;
    description?: string;
    embedding_model: string;
    database_provider?: string;
  }): Promise<{ id: string }> {
    const payload = {
      ...kb,
      database_provider: kb.database_provider || "pgvector",
    };

    const response = await fetch(`${this.baseUrl}/knowledge/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(
        `Failed to create knowledge base: ${response.statusText}`
      );
    }
    return response.json();
  }

  // Update knowledge base
  async updateKnowledgeBase(
    name: string,
    kb: Partial<{
      embedding_model: string;
      description?: string;
    }>
  ): Promise<KnowledgeBase> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kb),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Delete knowledge base
  async deleteKnowledgeBase(name: string): Promise<{ message: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to delete knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Add document to knowledge base
  async addDocumentToKnowledgeBase(
    name: string,
    document: {
      content: string;
      metadata?: { [key: string]: any };
      model?: string;
    }
  ): Promise<{ id: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/add-document`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to add document to knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Update document in knowledge base
  async updateDocumentInKnowledgeBase(
    name: string,
    document: {
      id: string;
      content?: string;
      metadata?: { [key: string]: any };
    }
  ): Promise<{ id: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/update-document`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update document in knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Remove document from knowledge base
  async removeDocumentFromKnowledgeBase(
    name: string,
    documentId: string
  ): Promise<{ message: string }> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(
        name
      )}/remove-document/${encodeURIComponent(documentId)}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to remove document from knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Get documents from knowledge base
  async getDocumentsFromKnowledgeBase(name: string): Promise<KBDocument[]> {
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/documents`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to get documents from knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }

  // Search knowledge base
  async searchKnowledgeBase(
    name: string,
    query: string,
    k: number,
    model?: string
  ): Promise<SearchResult[]> {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("k", k.toString());
    if (model) {
      params.append("model", model);
    }
    const response = await fetch(
      `${this.baseUrl}/knowledge/${encodeURIComponent(
        name
      )}/search?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to search knowledge base '${name}': ${response.statusText}`
      );
    }
    return response.json();
  }
}
