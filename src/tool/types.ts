/**
 * Interface representing the parameters required to create or update a tool.
 */
interface ToolParams {
    name: string;
    description?: string;
    params?: any;
    endpoint: string;
    method: string;
}

export { ToolParams };
