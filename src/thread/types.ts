/**
 * Interface representing the parameters required to create a thread.
 */
interface ThreadCreateParams {
    id: string;
    platform: string;
    description?: string;
    authors?: string[];
    agentName: string;
}

/**
 * Interface representing the parameters required to add a message to a thread.
 */
interface MessageParams {
    callId?: string;
    role: 'human';
    name: string;
    content: string;
    authorId: string;
}

/**
 * Interface representing a chat message.
 */
interface ChatMessage {
    role: 'human';
    name: string;
    content: any; // Content can be a string or an array as per schema
    attachments?: any[];
}

/**
 * Interface representing the parameters required to perform a chat inference on a thread.
 */
interface ThreadChatParams {
    agentName?: string;
    message: ChatMessage;
}

export {
    ThreadCreateParams,
    MessageParams,
    ChatMessage,
    ThreadChatParams,
};
