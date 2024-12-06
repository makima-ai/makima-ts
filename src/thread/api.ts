import axios from "axios";
import { ThreadCreateParams, MessageParams, ThreadChatParams } from "./types";

/**
 * Class representing the Thread API.
 */
class ThreadAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all threads in the system.
   * @returns A promise resolving to the list of threads.
   */
  async getAll(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/thread/`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get all threads: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get the details of a thread by its ID.
   * @param id The ID of the thread.
   * @returns A promise resolving to the thread details.
   */
  async get(id: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Delete a thread by its ID.
   * @param id The ID of the thread.
   * @returns A promise resolving to the result of the deletion.
   */
  async delete(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to delete thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get all messages of a thread by its Thread ID.
   * @param id The ID of the thread.
   * @returns A promise resolving to the list of messages.
   */
  async getMessages(id: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}/messages`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get messages for thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Create a new thread with the provided details.
   * @param params The thread details.
   * @returns A promise resolving to the created thread.
   */
  async create(params: ThreadCreateParams): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/thread/create`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create thread: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Adds a message to a thread.
   * @param id The ID of the thread.
   * @param params The message details.
   * @returns A promise resolving to the added message.
   */
  async addMessage(id: string, params: MessageParams): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}/message`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to add message to thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Performs inference on a thread with the provided message.
   * @param id The ID of the thread.
   * @param params The chat parameters.
   * @returns A promise resolving to the inference result.
   */
  async chat(id: string, params: ThreadChatParams): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}/chat`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to chat in thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Updates the default agent of a thread by its ID.
   * @param id The ID of the thread.
   * @param agentName The name of the new agent.
   * @returns A promise resolving to the updated thread.
   */
  async updateAgent(id: string, agentName: string): Promise<any> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/thread/${encodeURIComponent(id)}/agent`,
        { agentName },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to update agent for thread '${id}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }
}

export { ThreadAPI };
