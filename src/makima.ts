import { AgentAPI } from './agent/api';
import { ThreadAPI } from './thread/api';
import { ToolAPI } from './tool/api';

/**
 * Makima SDK for interacting with the Makima API.
 */
class Makima {
    baseUrl: string;
    agent: AgentAPI;
    thread: ThreadAPI;
    tool: ToolAPI;

    /**
     * Creates an instance of the Makima SDK.
     * @param baseUrl The base URL of the Makima API.
     */
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.agent = new AgentAPI(baseUrl);
        this.thread = new ThreadAPI(baseUrl);
        this.tool = new ToolAPI(baseUrl);
    }
}

export { Makima };
