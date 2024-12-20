import { KnowledgeBase } from "../knowledge/types";
import { ToolData } from "../tool/types";

export interface AgentData {
  id: string;
  description?: string | null;
  name: string;
  createdAt: Date | null;
  prompt: string;
  primaryModel: string;
  fallbackModels?: string[] | null;
  format?: string | null;
}

export interface AgentParams extends Omit<AgentData, "id" | "createdAt"> {
  tools?: string[] | null;
}

export interface AgentDetailData extends AgentData {
  tools?: ToolData[] | null;
  knowledgeBases?: KnowledgeBase[] | null;
  helperAgents?: AgentData[] | null;
  usedByAgents?: AgentData[] | null;
}
