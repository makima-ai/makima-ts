# Makima TypeScript SDK

The Makima TypeScript SDK provides a simple way to interact with the Makima Agent Framework API. This SDK allows you to manage agents, threads, and tools programmatically in your TypeScript or JavaScript projects.

## Installation

Install the Makima SDK using npm:

```shellscript
npm install makima-ts
```

## Basic Usage

Here's a quick example of how to use the Makima SDK:

```typescript
import { Makima } from 'makima-ts';

const makima = new Makima('YOUR_MAKIMA_API_URL');

async function example() {
  // Create a new agent
  const newAgent = await makima.agent.create({
    name: 'my-agent',
    description: 'A helpful AI assistant',
    prompt: 'You are a helpful AI assistant. Provide concise and accurate responses.',
    primaryModel: 'openai/gpt-4o-mini',
    fallbackModels: [],
  });

  // Create a new thread
  const newThread = await makima.thread.create({
    id: 'my-thread',
    platform: 'api',
    agentName: 'my-agent',
  });

  // Chat with the agent
  const chatResponse = await makima.thread.chat('my-thread', {
    message: {
      role: 'human',
      content: 'Hello, how are you?',
      name: 'user',
    },
  });

  console.log('Chat Response:', chatResponse);
}

example().catch(console.error);
```

## Key Features

The Makima SDK provides methods to:

- Manage Agents: Create, update, delete, and retrieve agents
- Handle Threads: Create, delete, and manage conversation threads
- Interact with Tools: Create, update, delete, and manage tools
- Perform Chat Inference: Send messages and receive responses from agents


## API Reference

### Agents

- `makima.agent.create(agentData)`: Create a new agent
- `makima.agent.getAll()`: Retrieve all agents
- `makima.agent.get(agentName)`: Get a specific agent by name
- `makima.agent.update(agentName, updateData)`: Update an agent
- `makima.agent.delete(agentName)`: Delete an agent
- `makima.agent.addTool(agentName, toolName)`: Add a tool to an agent
- `makima.agent.removeTool(agentName, toolName)`: Remove a tool from an agent


### Threads

- `makima.thread.create(threadData)`: Create a new thread
- `makima.thread.getAll()`: Retrieve all threads
- `makima.thread.get(threadId)`: Get a specific thread by ID
- `makima.thread.delete(threadId)`: Delete a thread
- `makima.thread.chat(threadId, messageData)`: Send a message to a thread
- `makima.thread.getMessages(threadId)`: Retrieve messages from a thread


### Tools

- `makima.tool.create(toolData)`: Create a new tool
- `makima.tool.getAll()`: Retrieve all tools
- `makima.tool.get(toolName)`: Get a specific tool by name
- `makima.tool.update(toolName, updateData)`: Update a tool
- `makima.tool.delete(toolName)`: Delete a tool


## Development Status

Please note that this SDK is in early alpha stage and is actively being developed. APIs and features may change, and some functionality might be unstable. We recommend using this in non-production environments until we reach a stable release.

## Contributing

We welcome contributions to the Makima TypeScript SDK! Please see our [Contributing Guide](https://github.com/makima-ai/makima/blob/main/CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
