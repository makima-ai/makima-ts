import axios from "axios";
import { ToolData, ToolParams } from "./types";

/**
 * Class representing the Tool API.
 */
class ToolAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all tools in the system.
   * @returns A promise resolving to the list of tools.
   */
  async getAll(): Promise<ToolData[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/tool/`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get all tools: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get the details of a tool by its name.
   * @param name The name of the tool.
   * @returns A promise resolving to the tool details.
   */
  async get(name: string): Promise<ToolData> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/tool/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get tool '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Create a new tool with the provided details.
   * @param params The tool details.
   * @returns A promise resolving to the created tool.
   */
  async create(params: ToolParams): Promise<ToolData> {
    try {
      const response = await axios.post(`${this.baseUrl}/tool/create`, params, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create tool: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Update the details of an existing tool by its name.
   * @param name The name of the tool.
   * @param params The tool details to update.
   * @returns A promise resolving to the updated tool.
   */
  async update(name: string, params: Partial<ToolParams>): Promise<ToolData> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/tool/${encodeURIComponent(name)}`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to update tool '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Delete a tool by its name.
   * @param name The name of the tool.
   * @returns A promise resolving to the result of the deletion.
   */
  async delete(name: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/tool/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to delete tool '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }
}

export { ToolAPI };
