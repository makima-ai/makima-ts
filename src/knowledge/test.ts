// test-sdk.ts

import { Makima } from "../makima";
import { KnowledgeBase } from "./types";

(async () => {
  const apiClient = new Makima("http://localhost:7777").knowledgeBase;
  const kbName = "testKnowledgeBase";
  const documentContent = "This is a sample document for testing purposes.";
  let documentId: string;

  try {
    // 1. Create a new knowledge base
    console.log("Creating a new knowledge base...");
    const newKnowledgeBase: KnowledgeBase = {
      name: kbName,
      description: "A knowledge base for testing the SDK.",
      embedding_model: "ollama/llama3",
      database_provider: "pgvector",
    };
    const createKbResponse = await apiClient.createKnowledgeBase(
      newKnowledgeBase
    );
    console.log("Knowledge base created:", createKbResponse);

    // 2. Get all knowledge bases
    console.log("Fetching all knowledge bases...");
    const knowledgeBases = await apiClient.getKnowledgeBases();
    console.log("Knowledge bases:", knowledgeBases);

    // 3. Get knowledge base by name
    console.log(`Fetching knowledge base by name: ${kbName}...`);
    const kb = await apiClient.getKnowledgeBaseByName(kbName);
    console.log("Knowledge base details:", kb);

    // 4. Add a document to the knowledge base
    console.log("Adding a document to the knowledge base...");
    const newDocument = {
      content: documentContent,
      metadata: { author: "SDK Tester", category: "Test" },
    };
    const addDocResponse = await apiClient.addDocumentToKnowledgeBase(
      kbName,
      newDocument
    );
    console.log("Document added:", addDocResponse);
    documentId = addDocResponse.id;

    // 5. Get documents from the knowledge base
    console.log("Fetching documents from the knowledge base...");
    const documents = await apiClient.getDocumentsFromKnowledgeBase(kbName);
    console.log("Documents in knowledge base:", documents);

    // 6. Update the document in the knowledge base
    console.log("Updating the document in the knowledge base...");
    const updatedContent =
      "This is the updated content of the sample document.";
    const updateDocResponse = await apiClient.updateDocumentInKnowledgeBase(
      kbName,
      {
        id: documentId,
        content: updatedContent,
        metadata: { updated: true },
      }
    );
    console.log("Document updated:", updateDocResponse);

    // 7. Search the knowledge base
    console.log("Searching the knowledge base...");
    const searchResults = await apiClient.searchKnowledgeBase(
      kbName,
      "updated content",
      5
    );
    console.log("Search results:", searchResults);

    // 8. Remove the document from the knowledge base
    console.log("Removing the document from the knowledge base...");
    const removeDocResponse = await apiClient.removeDocumentFromKnowledgeBase(
      kbName,
      documentId
    );
    console.log("Document removed:", removeDocResponse);

    // 9. Update the knowledge base
    console.log("Updating the knowledge base description...");
    const updateKbResponse = await apiClient.updateKnowledgeBase(kbName, {
      description: "An updated description for the knowledge base.",
    });
    console.log("Knowledge base updated:", updateKbResponse);

    // 10. Delete the knowledge base
    console.log("Deleting the knowledge base...");
    const deleteKbResponse = await apiClient.deleteKnowledgeBase(kbName);
    console.log("Knowledge base deleted:", deleteKbResponse);
  } catch (error) {
    console.error("An error occurred during the test:", error);
  }
})();
