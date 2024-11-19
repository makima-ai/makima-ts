import { ToolParams } from './types';

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
    async getAll(): Promise<any> {
        const response = await fetch(`${this.baseUrl}/tool/`, {
            method: 'GET',
        });
        return response.json();
    }

    /**
     * Get the details of a tool by its name.
     * @param name The name of the tool.
     * @returns A promise resolving to the tool details.
     */
    async get(name: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/tool/${encodeURIComponent(name)}`,
            {
                method: 'GET',
            },
        );
        return response.json();
    }

    /**
     * Create a new tool with the provided details.
     * @param params The tool details.
     * @returns A promise resolving to the created tool.
     */
    async create(params: ToolParams): Promise<any> {
        const response = await fetch(`${this.baseUrl}/tool/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        });
        return response.json();
    }

    /**
     * Update the details of an existing tool by its name.
     * @param name The name of the tool.
     * @param params The tool details to update.
     * @returns A promise resolving to the updated tool.
     */
    async update(
        name: string,
        params: Partial<ToolParams>,
    ): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/tool/${encodeURIComponent(name)}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            },
        );
        return response.json();
    }

    /**
     * Delete a tool by its name.
     * @param name The name of the tool.
     * @returns A promise resolving to the result of the deletion.
     */
    async delete(name: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/tool/${encodeURIComponent(name)}`,
            {
                method: 'DELETE',
            },
        );
        return response.json();
    }
}

export { ToolAPI };
