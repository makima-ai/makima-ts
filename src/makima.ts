import { AgentAPI } from "./agent/api";
import { KnowledgeAPI } from "./knowledge/api";
import { ThreadAPI } from "./thread/api";
import { ToolAPI } from "./tool/api";

/**
 * Makima SDK for interacting with the Makima API.
 */
class Makima {
  baseUrl: string;
  agent: AgentAPI;
  thread: ThreadAPI;
  tool: ToolAPI;
  knowledgeBase: KnowledgeAPI;

  /**
   * Creates an instance of the Makima SDK.
   * @param baseUrl The base URL of the Makima API.
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.agent = new AgentAPI(baseUrl);
    this.thread = new ThreadAPI(baseUrl);
    this.tool = new ToolAPI(baseUrl);
    this.knowledgeBase = new KnowledgeAPI(baseUrl);
  }
}

export { Makima };
