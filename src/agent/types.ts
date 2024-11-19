/**
 * Interface representing the parameters required to create or update an agent.
 */
interface AgentParams {
    name: string;
    description?: string;
    prompt: string;
    primaryModel: string;
    fallbackModels?: string[];
    tools?: string[];
}

export { AgentParams };
