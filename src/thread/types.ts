/**
 * Interface representing the parameters required to create a thread.
 */
export interface ThreadCreateParams {
  id: string;
  platform: string;
  description?: string;
  authors?: string[];
  agentName: string;
}

/**
 * Interface representing the parameters required to add a message to a thread.
 */
export interface MessageParams {
  callId?: string;
  role: "human";
  name: string;
  content: string;
  authorId: string;
}

/**
 * Interface representing a chat message.
 */
export interface ChatMessage {
  role: "human";
  name: string;
  content: any; // Content can be a string or an array as per schema
  attachments?: any[];
}

/**
 * Interface representing the parameters required to perform a chat inference on a thread.
 */
export interface ThreadChatParams {
  agentName?: string;
  message: ChatMessage;
}

/**
 * Interface representing thread data.
 */
export interface ThreadData {
  id: string;
  platform: string | null;
  description: string | null;
  authors: string[];
  default_agent_id: string | null;
  default_agent?: {
    id: string;
    name: string;
  } | null;
  scaling_algorithm?: "window" | "threshold" | "block";
  scaling_config?: ScalingConfig;
}

/**
 * Types for scaling configurations.
 */
type ScalingConfig =
  | WindowScalingConfig
  | ThresholdScalingConfig
  | BlockScalingConfig;

type WindowScalingConfig = {
  type: "window";
  windowSize: number;
};

type ThresholdScalingConfig = {
  type: "threshold";
  totalWindow: number;
  summarizationThreshold: number;
};

type BlockScalingConfig = {
  type: "block";
  blockSize: number;
  maxBlocks?: number;
  blockSummarizationThreshold?: number;
};

/**
 * Base type for messages.
 */
type BaseMessage = {
  db_id?: string;
  context_id?: string;
};

/**
 * Types of messages.
 */
export type UserMessage = BaseMessage & {
  role: "human";
  name: string;
  content: MessageContent;
  attachments?: Attachment[];
  authorId: string;
};

type AiMessage = BaseMessage & {
  role: "ai";
  name: string;
  content: string;
};

type SystemMessage = BaseMessage & {
  role: "system";
  content: string;
};

type ToolCalls = BaseMessage & {
  role: "tool_calls";
  content?: string;
  calls: {
    tool_name: string;
    params: object;
    id: string;
  }[];
};

type ToolResponse = BaseMessage & {
  id: string;
  role: "tool_response";
  content: string;
};

/**
 * Types for message content.
 */
type MessageContent = string | (ImageContent | AudioContent)[];

type ImageContent = {
  url: string; // Either a URL of the image or the base64 encoded image data.
  type: "image";
  detail?: "auto" | "low" | "high";
};

type AudioContent = {
  url: string; // Base64 encoded audio data.
  type: "audio";
  format: "wav" | "mp3";
};

/**
 * Type for attachments.
 */
type Attachment = {
  type: string;
  data: string | Buffer;
};

/**
 * Type representing a message.
 */
export type Message =
  | UserMessage
  | AiMessage
  | ToolCalls
  | ToolResponse
  | SystemMessage;

/**
 * Type representing output messages.
 */
export type OutputMessage = AiMessage | ToolCalls;
