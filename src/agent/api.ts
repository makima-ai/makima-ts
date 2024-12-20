import axios, { AxiosError } from "axios";
import { AgentData, AgentDetailData, AgentParams } from "./types";
import { ToolData } from "../tool/types";
import { UserMessage } from "../thread/types";

/**
 * Class representing the Agent API.
 */
class AgentAPI {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all agents in the system.
   * @returns A promise resolving to the list of agents.
   */
  async getAll(): Promise<AgentData[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/agent/`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get all agents: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Get the details of an agent by its name.
   * @param name The name of the agent.
   * @returns A promise resolving to the agent details.
   */
  async get(name: string): Promise<AgentData & { tools: ToolData[] }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/agent/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to get agent '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Create a new agent with the provided details.
   * @param params The agent details.
   * @returns A promise resolving to the created agent.
   */
  async create(params: AgentParams): Promise<AgentData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/create`,
        params,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to create agent: ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Update the details of an existing agent by its name.
   * @param name The name of the agent.
   * @param params The agent details to update.
   * @returns A promise resolving to the updated agent.
   */
  async update(name: string, params: Partial<AgentParams>): Promise<AgentData> {
    try {
      const response = await axios.put(
        `${this.baseUrl}/agent/${encodeURIComponent(name)}`,
        params,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to update agent '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Delete an agent by its name.
   * @param name The name of the agent.
   * @returns A promise resolving to the result of the deletion.
   */
  async delete(name: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(
        `${this.baseUrl}/agent/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to delete agent '${name}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Add a helper agent to an agent by the agent name and helper agent name.
   * @param agentName The name of the agent.
   * @param helperAgentName The name of the helper agent.
   * @returns A promise resolving to the result of the operation.
   */
  async addHelperAgent(
    agentName: string,
    helperAgentName: string
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/${encodeURIComponent(
          agentName
        )}/add-helper/${encodeURIComponent(helperAgentName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to add helper agent '${helperAgentName}' to agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Remove a helper agent to an agent by the agent name and helper agent name.
   * @param agentName The name of the agent.
   * @param helperAgentName The name of the helper agent.
   * @returns A promise resolving to the result of the operation.
   */
  async removeHelperAgent(
    agentName: string,
    helperAgentName: string
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/${encodeURIComponent(
          agentName
        )}/remove-helper/${encodeURIComponent(helperAgentName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to remove helper agent '${helperAgentName}' from agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Add a tool to an agent by the agent name and tool name.
   * @param agentName The name of the agent.
   * @param toolName The name of the tool.
   * @returns A promise resolving to the result of the operation.
   */
  async addTool(agentName: string, toolName: string): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/${encodeURIComponent(
          agentName
        )}/add-tool/${encodeURIComponent(toolName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to add tool '${toolName}' to agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Remove a tool from an agent by the agent name and tool name.
   * @param agentName The name of the agent.
   * @param toolName The name of the tool.
   * @returns A promise resolving to the result of the operation.
   */
  async removeTool(
    agentName: string,
    toolName: string
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/${encodeURIComponent(
          agentName
        )}/remove-tool/${encodeURIComponent(toolName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to remove tool '${toolName}' from agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Add a knowledge base to an agent by the agent name and knowledge name.
   * @param agentName The name of the agent.
   * @param knowledgeBaseName The name of the knowledge base.
   * @returns A promise resolving to the result of the operation.
   */
  async addKnowledgeBase(
    agentName: string,
    knowledgeBaseName: string
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${encodeURIComponent(
          agentName
        )}/add-knowledge-base/${encodeURIComponent(knowledgeBaseName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to add knowledge base '${knowledgeBaseName}' to agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Remove a knowledge base from an agent by the agent name and knowledge name.
   * @param agentName The name of the agent.
   * @param knowledgeBaseName The name of the knowledge base.
   * @returns A promise resolving to the result of the operation.
   */
  async removeKnowledgeBase(
    agentName: string,
    knowledgeBaseName: string
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/${encodeURIComponent(
          agentName
        )}/remove-knowledge-base/${encodeURIComponent(knowledgeBaseName)}`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to remove knowledge base '${knowledgeBaseName}' from agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }

  /**
   * Send a single chat message to the agent based on agent name and a message sent in a specific format
   * @param agentName The name of the agent.
   * @param message The body of the message in specified format
   * @returns A promise resolving to the result of the operation.
   */
  async tempChat(
    agentName: string,
    message: UserMessage
  ): Promise<AgentDetailData> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/agent/${encodeURIComponent(agentName)}/chat`,
        message
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Failed to have a temporary chat with agent '${agentName}': ${
            error.response?.data.message || error.message
          }`
        );
      }
      throw new Error("An unexpected error occurred.");
    }
  }
}

export { AgentAPI };
