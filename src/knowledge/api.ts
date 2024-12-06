import axios from "axios";
import { KnowledgeBase, KBDocument, SearchResult } from "./types";

/**
 * Class representing the Knowledge API.
 */
class KnowledgeAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all knowledge bases in the system.
   * @returns A promise resolving to the list of knowledge bases.
   */
  async getKnowledgeBases(): Promise<KnowledgeBase[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/knowledge/`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get knowledge bases: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get a knowledge base by its name.
   * @param name The name of the knowledge base.
   * @returns A promise resolving to the knowledge base details.
   */
  async getKnowledgeBaseByName(name: string): Promise<KnowledgeBase> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Create a new knowledge base with the provided details.
   * @param kb The details of the knowledge base.
   * @returns A promise resolving to the created knowledge base ID.
   */
  async createKnowledgeBase(kb: {
    name: string;
    description?: string;
    embedding_model: string;
    database_provider?: string;
  }): Promise<{ id: string }> {
    try {
      const payload = {
        ...kb,
        database_provider: kb.database_provider || "pgvector",
      };
      const response = await axios.post(
        `${this.baseUrl}/knowledge/create`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create knowledge base: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Update a knowledge base by its name.
   * @param name The name of the knowledge base.
   * @param kb The updated details of the knowledge base.
   * @returns A promise resolving to the updated knowledge base details.
   */
  async updateKnowledgeBase(
    name: string,
    kb: Partial<{ embedding_model: string; description?: string }>
  ): Promise<KnowledgeBase> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`,
        kb,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to update knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Delete a knowledge base by its name.
   * @param name The name of the knowledge base.
   * @returns A promise resolving to the result of the deletion.
   */
  async deleteKnowledgeBase(name: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to delete knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Add a document to a knowledge base.
   * @param name The name of the knowledge base.
   * @param document The document details to add.
   * @returns A promise resolving to the ID of the added document.
   */
  async addDocumentToKnowledgeBase(
    name: string,
    document: {
      content: string;
      metadata?: { [key: string]: any };
      model?: string;
    }
  ): Promise<{ id: string }> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/add-document`,
        document,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to add document to knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Update a document in a knowledge base.
   * @param name The name of the knowledge base.
   * @param document The updated document details.
   * @returns A promise resolving to the ID of the updated document.
   */
  async updateDocumentInKnowledgeBase(
    name: string,
    document: {
      id: string;
      content?: string;
      metadata?: { [key: string]: any };
    }
  ): Promise<{ id: string }> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/update-document`,
        document,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to update document in knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Remove a document from a knowledge base.
   * @param name The name of the knowledge base.
   * @param documentId The ID of the document to remove.
   * @returns A promise resolving to the result of the deletion.
   */
  async removeDocumentFromKnowledgeBase(
    name: string,
    documentId: string
  ): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/knowledge/${encodeURIComponent(
          name
        )}/remove-document/${encodeURIComponent(documentId)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to remove document from knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get all documents from a knowledge base.
   * @param name The name of the knowledge base.
   * @returns A promise resolving to the list of documents in the knowledge base.
   */
  async getDocumentsFromKnowledgeBase(name: string): Promise<KBDocument[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/knowledge/${encodeURIComponent(name)}/documents`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get documents from knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Search a knowledge base with a query.
   * @param name The name of the knowledge base.
   * @param query The search query string.
   * @param k The number of top results to retrieve.
   * @param model (Optional) The model to use for the search.
   * @returns A promise resolving to the list of search results.
   */
  async searchKnowledgeBase(
    name: string,
    query: string,
    k: number,
    model?: string
  ): Promise<SearchResult[]> {
    try {
      const params = new URLSearchParams();
      params.append("q", query);
      params.append("k", k.toString());
      if (model) {
        params.append("model", model);
      }
      const response = await axios.get(
        `${this.baseUrl}/knowledge/${encodeURIComponent(
          name
        )}/search?${params.toString()}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to search knowledge base '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }
}

export { KnowledgeAPI };
