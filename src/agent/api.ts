import { AgentParams } from './types';


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
    async getAll(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/agent/`, {
            method: 'GET',
        });
        return response.json();
    }

    /**
     * Get the details of an agent by its name.
     * @param name The name of the agent.
     * @returns A promise resolving to the agent details.
     */
    async get(name: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/agent/${encodeURIComponent(name)}`,
            {
                method: 'GET',
            },
        );
        return response.json();
    }

    /**
     * Create a new agent with the provided details.
     * @param params The agent details.
     * @returns A promise resolving to the created agent.
     */
    async create(params: AgentParams): Promise<any> {
        const response = await fetch(`${this.baseUrl}/agent/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        });
        return response.json();
    }

    /**
     * Update the details of an existing agent by its name.
     * @param name The name of the agent.
     * @param params The agent details to update.
     * @returns A promise resolving to the updated agent.
     */
    async update(
        name: string,
        params: Partial<AgentParams>,
    ): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/agent/${encodeURIComponent(name)}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            },
        );
        return response.json();
    }

    /**
     * Delete an agent by its name.
     * @param name The name of the agent.
     * @returns A promise resolving to the result of the deletion.
     */
    async delete(name: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/agent/${encodeURIComponent(name)}`,
            {
                method: 'DELETE',
            },
        );
        return response.json();
    }

    /**
     * Add a tool to an agent by the agent name and tool name.
     * @param agentName The name of the agent.
     * @param toolName The name of the tool.
     * @returns A promise resolving to the result of the operation.
     */
    async addTool(agentName: string, toolName: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/agent/${encodeURIComponent(
                agentName,
            )}/add-tool/${encodeURIComponent(toolName)}`,
            {
                method: 'POST',
            },
        );
        return response.json();
    }

    /**
     * Remove a tool from an agent by the agent name and tool name.
     * @param agentName The name of the agent.
     * @param toolName The name of the tool.
     * @returns A promise resolving to the result of the operation.
     */
    async removeTool(agentName: string, toolName: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/agent/${encodeURIComponent(
                agentName,
            )}/remove-tool/${encodeURIComponent(toolName)}`,
            {
                method: 'POST',
            },
        );
        return response.json();
    }
}

export { AgentAPI };
