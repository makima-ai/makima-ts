import {
    ThreadCreateParams,
    MessageParams,
    ThreadChatParams,
} from './types';



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
        const response = await fetch(`${this.baseUrl}/thread/`, {
            method: 'GET',
        });
        return response.json();
    }

    /**
     * Get the details of a thread by its ID.
     * @param id The ID of the thread.
     * @returns A promise resolving to the thread details.
     */
    async get(id: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}`,
            {
                method: 'GET',
            },
        );
        return response.json();
    }

    /**
     * Delete a thread by its ID.
     * @param id The ID of the thread.
     * @returns A promise resolving to the result of the deletion.
     */
    async delete(id: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}`,
            {
                method: 'DELETE',
            },
        );
        return response.json();
    }

    /**
     * Get all messages of a thread by its Thread ID.
     * @param id The ID of the thread.
     * @returns A promise resolving to the list of messages.
     */
    async getMessages(id: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}/messages`,
            {
                method: 'GET',
            },
        );
        return response.json();
    }

    /**
     * Create a new thread with the provided details.
     * @param params The thread details.
     * @returns A promise resolving to the created thread.
     */
    async create(params: ThreadCreateParams): Promise<any> {
        const response = await fetch(`${this.baseUrl}/thread/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        });
        return response.json();
    }

    /**
     * Adds a message to a thread.
     * @param id The ID of the thread.
     * @param params The message details.
     * @returns A promise resolving to the added message.
     */
    async addMessage(
        id: string,
        params: MessageParams,
    ): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}/message`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            },
        );
        return response.json();
    }

    /**
     * Performs inference on a thread with the provided message.
     * @param id The ID of the thread.
     * @param params The chat parameters.
     * @returns A promise resolving to the inference result.
     */
    async chat(id: string, params: ThreadChatParams): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}/chat`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            },
        );
        return response.json();
    }

    /**
     * Updates the default agent of a thread by its ID.
     * @param id The ID of the thread.
     * @param agentName The name of the new agent.
     * @returns A promise resolving to the updated thread.
     */
    async updateAgent(id: string, agentName: string): Promise<any> {
        const response = await fetch(
            `${this.baseUrl}/thread/${encodeURIComponent(id)}/agent`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agentName }),
            },
        );
        return response.json();
    }
}

export { ThreadAPI };
