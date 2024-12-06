import { test } from "bun:test";
import { Makima } from "../makima";
import { ToolParams } from "./types";

// Define the details that will be reused in each test
const toolName = "TestTool";
const toolDetails: ToolParams = {
  name: toolName,
  description: "A test tool for the purpose of API testing.",
  endpoint: "/test/endpoint",
  method: "GET", // Example method
};
let createdToolId: string;

// Create API client for the tool
const apiClient = new Makima("http://localhost:7777").tool;

test("Create a new tool", async () => {
  console.log("Creating a new tool...");
  const response = await apiClient.create(toolDetails);
  createdToolId = response.id; // Store the tool ID for future tests
  console.log("Tool created:", response);
});

test("Get all tools", async () => {
  console.log("Fetching all tools...");
  const response = await apiClient.getAll();
  console.log("All tools:", response);
});

test("Get tool by name", async () => {
  console.log(`Fetching tool by name: ${toolName}...`);
  const response = await apiClient.get(toolName);
  console.log("Tool details:", response);
});

test("Update tool details", async () => {
  console.log("Updating tool details...");
  const updatedToolDetails = {
    description: "Updated test tool description.",
    endpoint: "/updated/endpoint", // Updated endpoint
    method: "POST", // Updated method
  };
  const response = await apiClient.update(toolName, updatedToolDetails);
  console.log("Tool updated:", response);
});

test("Delete the tool", async () => {
  console.log("Deleting the tool...");
  const response = await apiClient.delete(toolName);
  console.log("Tool deleted:", response);
});
