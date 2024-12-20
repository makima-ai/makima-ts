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

interface ToolData {
  id: string;
  params: unknown;
  description: string | null;
  name: string;
  createdAt: Date | null;
  endpoint: string;
  method: string;
}
export { ToolParams, ToolData };
