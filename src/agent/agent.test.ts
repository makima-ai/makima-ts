import { test } from "bun:test";
import { Makima } from "../makima";
import { AgentParams } from "./types";
import { UserMessage } from "../thread/types";

// Define the agent details that will be reused in each test
const agentName = "TestAgent1";
const helperAgent = "HelperAgent";
const agentDetails: AgentParams = {
  name: agentName,
  prompt: "This agent will provide the current date and time.",
  primaryModel: "ollama/llama3", // Placeholder model
  description: "A generic agent for testing purposes.",
  tools: ["get_date_time"], // Only available tool
};
// Create a Makima API client instance
const apiClient = new Makima("http://localhost:7777").agent;

test("Create a new agent", async () => {
  console.log("Creating a new agent...");
  const response = await apiClient.create(agentDetails);
  console.log("Agent created:", response);
});

test("Get all agents", async () => {
  console.log("Fetching all agents...");
  const response = await apiClient.getAll();
  console.log("All agents:", response);
});

test("Get agent by name", async () => {
  console.log(`Fetching agent by name: ${agentName}...`);
  const response = await apiClient.get(agentName);
  console.log("Agent details:", response);
});

test("Update agent details", async () => {
  console.log("Updating agent details...");
  const updatedAgentDetails = {
    prompt: "Providing updated date and time information.",
  };
  const response = await apiClient.update(agentName, updatedAgentDetails);
  console.log("Agent updated:", response);
});

test("Add 'get_date_time' tool to agent", async () => {
  console.log("Adding 'get_date_time' tool to agent...");
  const response = await apiClient.addTool(agentName, "get_date_time");
  console.log("'get_date_time' tool added:", response);
});

test("Remove 'get_date_time' tool from agent", async () => {
  console.log("Removing 'get_date_time' tool from agent...");
  const response = await apiClient.removeTool(agentName, "get_date_time");
  console.log("'get_date_time' tool removed:", response);
});

test("Add helper agent 'HelperAgent' to Existing agent", async () => {
  const helperAgentDetails = { ...agentDetails, name: helperAgent };
  console.log("Creating a helper agent");
  await apiClient.create(helperAgentDetails);
  const response = await apiClient.addHelperAgent(agentName, helperAgent);
  console.log("Helper agent added to original agent: ", response);
});

test("Remove helper agent 'HelperAgent' from Existing agent", async () => {
  const response = await apiClient.removeHelperAgent(agentName, helperAgent);
  console.log("Helper agent removed from original agent: ", response);
});

test(
  "Temp chat with agent",
  async () => {
    const userMessage: UserMessage = {
      role: "human",
      name: "arnav",
      content: "Describe the fuctioning of a CPU",
      authorId: "arnav",
    };
    const response = await apiClient.tempChat(agentName, userMessage);
    console.log("Sucessfully had a temp chat with agent", response);
  },
  { timeout: 2 * 60 * 1000 }
);

test("Delete the agent", async () => {
  console.log("Deleting the agent and helper agent...");
  const response = await apiClient.delete(agentName);
  const helperResponse = await apiClient.delete(helperAgent);
  console.log("Agent deleted:", response, helperResponse);
});
