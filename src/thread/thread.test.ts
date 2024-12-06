import { test } from "bun:test";
import { Makima } from "../makima";
import { ThreadCreateParams, MessageParams, ThreadChatParams } from "./types";

// Define the details that will be reused in each test
let agentName = "TestAgent1";
const threadId = "testThread123";
const messageDetails: MessageParams = {
  role: "human",
  name: "TestUser",
  content: "Hello, this is a test message!",
  authorId: "user123",
};
const chatParams: ThreadChatParams = {
  message: {
    role: "human",
    name: "TestUser",
    content:
      "Can you provide more details on what the basic components of a CPU are?",
  },
};
let createdThreadId: string;

// Create API clients for thread and agent
const makima = new Makima("http://localhost:7777");
const apiClient = makima.thread;
const agentApiClient = makima.agent;

test("Create a new agent", async () => {
  console.log("Creating a new agent...");
  const agentDetails = {
    name: agentName,
    prompt: "This agent will handle the test thread operations.",
    primaryModel: "ollama/llama3",
    description: "A test agent for SDK testing.",
    tools: ["get_date_time"],
  };
  const response = await agentApiClient.create(agentDetails);
  console.log("Agent created:", response);
});

test("Create a new thread", async () => {
  console.log("Creating a new thread...");
  const threadDetails: ThreadCreateParams = {
    id: threadId,
    platform: "testPlatform",
    agentName: agentName,
    description: "A test thread for SDK testing.",
  };
  const response = await apiClient.create(threadDetails);
  createdThreadId = response.id; // Store the thread ID for future tests
  console.log("Thread created:", response);
});

test("Get all threads", async () => {
  console.log("Fetching all threads...");
  const response = await apiClient.getAll();
  console.log("All threads:", response);
});

test("Get thread by ID", async () => {
  console.log(`Fetching thread by ID: ${threadId}...`);
  const response = await apiClient.get(threadId);
  console.log("Thread details:", response);
});

test("Add a message to the thread", async () => {
  console.log("Adding a message to the thread...");
  const response = await apiClient.addMessage(createdThreadId, messageDetails);
  console.log("Message added:", response);
});

test.skip(
  "Perform a chat inference on the thread",
  async () => {
    console.log("Performing chat inference on the thread...");
    const response = await apiClient.chat(createdThreadId, chatParams);
    console.log("Chat inference result:", response);
  },
  { timeout: 2 * 60 * 1000 }
);

test("Update agent for the thread", async () => {
  console.log("Updating agent for the thread...");
  // agent needs to exist to update to a new agent
  console.log("\tCreating a dummy agent for replacement");
  let newAgentName = "NewTestAgent";
  const agentDetails = {
    name: newAgentName,
    prompt: "This dummy agent will handle the test thread operations.",
    primaryModel: "ollama/llama3",
    description: "A test agent for SDK testing.",
    tools: ["get_date_time"],
  };
  await agentApiClient.create(agentDetails);
  console.log("Dummy agent created for replacement");
  // swap old and new agent and delete the unused agent between these 2
  const temp = agentName;
  agentName = newAgentName;
  newAgentName = temp;

  const response = await apiClient.updateAgent(createdThreadId, agentName);
  console.log("Agent updated:", response);

  // deleting the old agent -> unused since we updated the agent for the thread
  await agentApiClient.delete(newAgentName);
  console.log("Deleted dummy agent");
});

test("Delete the thread", async () => {
  console.log("Deleting the thread...");
  const response = await apiClient.delete(createdThreadId);
  console.log("Thread deleted:", response);
});

test("Delete the agent", async () => {
  console.log("Deleting the agent...");
  const response = await agentApiClient.delete(agentName);
  console.log("Agent deleted:", response);
});
