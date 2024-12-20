import { test } from "bun:test";
import { Makima } from "../makima";
import { KnowledgeBase } from "./types";

// Define the knowledge base details that will be reused in each test
const kbName = "testKnowledgeBase";
const documentContent = "This is a sample document for testing purposes.";
const documentContent2 = "This is the second document as part of multiple docs";
let documentId: string;

// Create a Makima API client instance for the Knowledge Base API
const apiClient = new Makima("http://localhost:7777").knowledgeBase;

test(
  "Create a new knowledge base",
  async () => {
    console.log("Creating a new knowledge base...");
    const newKnowledgeBase: Omit<KnowledgeBase, "id" | "createdAt"> = {
      name: kbName,
      description: "A knowledge base for testing the SDK.",
      embedding_model: "ollama/llama3",
      database_provider: "pgvector",
    };
    const response = await apiClient.createKnowledgeBase(newKnowledgeBase);
    console.log("Knowledge base created:", response);
  },
  { timeout: 1 * 60 * 1000 }
);

test("Get all knowledge bases", async () => {
  console.log("Fetching all knowledge bases...");
  const response = await apiClient.getKnowledgeBases();
  console.log("Knowledge bases:", response);
});

test("Get knowledge base by name", async () => {
  console.log(`Fetching knowledge base by name: ${kbName}...`);
  const response = await apiClient.getKnowledgeBaseByName(kbName);
  console.log("Knowledge base details:", response);
});

test(
  "Add a document to the knowledge base",
  async () => {
    console.log("Adding a document to the knowledge base...");
    const newDocument = {
      content: documentContent,
      metadata: { author: "SDK Tester", category: "Test" },
    };
    const response = await apiClient.addDocumentToKnowledgeBase(
      kbName,
      newDocument
    );
    console.log("Document added:", response);
    documentId = response.id; // Store document ID for future tests
  },
  { timeout: 1 * 60 * 1000 }
);

test(
  "Add multiple documents to the knowledge base",
  async () => {
    console.log("Adding mulitple documents to the knowledge base...");
    const newDocuments = [
      {
        content: documentContent,
        metadata: { author: "SDK Tester", category: "Test" },
      },
      {
        content: documentContent2,
        metadata: { author: "SDK Tester", category: "Test" },
      },
    ];
    const response = await apiClient.addMultipleDocumentsToKnowledgeBase(
      kbName,
      newDocuments
    );
    console.log("Documents added:", response);
  },
  { timeout: 2 * 60 * 1000 }
);

test("Get documents from the knowledge base", async () => {
  console.log("Fetching documents from the knowledge base...");
  const response = await apiClient.getDocumentsFromKnowledgeBase(kbName);
  console.log("Documents in knowledge base:", response);
});

test(
  "Update the document in the knowledge base",
  async () => {
    console.log("Updating the document in the knowledge base...");
    const updatedContent =
      "This is the updated content of the sample document.";
    const response = await apiClient.updateDocumentInKnowledgeBase(kbName, {
      id: documentId,
      content: updatedContent,
      metadata: { updated: true },
    });
    console.log("Document updated:", response);
  },
  { timeout: 1 * 60 * 1000 }
);

test(
  "Search the knowledge base",
  async () => {
    console.log("Searching the knowledge base...");
    const response = await apiClient.searchKnowledgeBase(
      kbName,
      "updated content",
      5
    );
    console.log("Search results:", response);
  },
  { timeout: 1 * 60 * 1000 }
);

test("Remove the document from the knowledge base", async () => {
  console.log("Removing the document from the knowledge base...");
  const response = await apiClient.removeDocumentFromKnowledgeBase(
    kbName,
    documentId
  );
  console.log("Document removed:", response);
});

test("Update the knowledge base description", async () => {
  console.log("Updating the knowledge base description...");
  const response = await apiClient.updateKnowledgeBase(kbName, {
    description: "An updated description for the knowledge base.",
  });
  console.log("Knowledge base updated:", response);
});

test("Reset the knowledge base", async () => {
  console.log("Reseting the knowledge base...");
  const response = await apiClient.resetKnowledgeBase(kbName);
  console.log("Knowledge base reset:", response);
});

test("Delete the knowledge base", async () => {
  console.log("Deleting the knowledge base...");
  const response = await apiClient.deleteKnowledgeBase(kbName);
  console.log("Knowledge base deleted:", response);
});
