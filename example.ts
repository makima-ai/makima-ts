// "use strict";

// import { log } from "console";
import { Makima } from './src';

// Initialize the Makima SDK
const makima = new Makima('URL_FOR_MAKIMA_API');


async function main() {
    try {

        // Example: Uncomment below to create a new agent
        const newAgent = await makima.agent.create({
            name: 'test-agent3',
            description: 'A compact AI assistant powered by GPT4O-Mini',
            prompt: 'You are a helpful AI assistant using the GPT4O-Mini model. Provide concise and accurate responses to user queries.',
            primaryModel: 'openai/gpt-4o-mini',
            fallbackModels: [],
            tools: [],
        });
        console.log('Created Agent:', newAgent);

        const agents = await makima.agent.getAll();
        console.log('Available Agents:', agents);
  

        // Testing updates
        
        const updatedAgent = await makima.agent.update('test-agent3', {
            description: 'A compact and precise AI assistant powered by GPT4O-Mini',
            prompt: 'You are a helpful AI assistant using the GPT4O-Mini model. Provide concise and accurate responses to user queries.',
            primaryModel: 'openai/gpt-4o-mini',
            fallbackModels: [],
        });

        const agentByName = await makima.agent.get('test-agent3');
        console.log('Agent by Name:', agentByName);
        

        // List tools
        
        const tools = await makima.tool.getAll();
        console.log('Available Tools:', tools);

        const toolName = tools[0]?.name;
        if (!toolName) {
            throw new Error('No tools available to add.');
        }

        const addedTool = await makima.agent.addTool('test-agent', toolName);
        console.log('Added Tool to Agent:', addedTool);

        const newThread = await makima.thread.create({
            id: 'test2',
            platform: 'api',
            agentName: 'test-agent3',
        });
        console.log('Created Thread:', newThread);

        const threadsList = await makima.thread.getAll();
        console.log('Available Threads:', threadsList);

        const threadById = await makima.thread.get('test2');
        console.log('Thread by ID:', threadById);
        

        // Test chat inference
        
        const chatResponse = await makima.thread.chat('test', {
            message: {
                role: 'human',
                content: 'hey, whats the time',
                name: 'harsh',
            },
        });
        console.log('Chat Response:', chatResponse);

        const messages = await makima.thread.getMessages('test2');
        console.log('Messages:', messages);
        

        // Managing tools
        
        const removedTool = await makima.agent.removeTool('test-agent3', toolName);
        console.log('Removed Tool from Agent:', removedTool);

        const agentTools = await makima.agent.get('test-agent3');
        console.log('Agent Tools:', agentTools.tools);

        const deletedThread = await makima.thread.delete('test2');
        console.log('Deleted Thread:', deletedThread);

        const deletedAgent = await makima.agent.delete('test-agent3');
        console.log('Deleted Agent:', deletedAgent);

        const agentsList = await makima.agent.getAll();
        console.log('Available Agents:', agentsList);

        const newTool = await makima.tool.create({
            name: 'test-tool1',
            description: 'A tool to test the Makima SDK',
            endpoint: 'http://localhost:7777/test',
            method: 'GET',
        });
        console.log('Created Tool:', newTool);

        const updatedTool = await makima.tool.update('test-tool1', {
            description: 'A tool to test the Makima SDK',
            endpoint: 'http://localhost:7777/test',
            method: 'GET',
        });
        console.log('Updated Tool:', updatedTool);

        const toolByName = await makima.tool.get('test-tool1');
        console.log('Tool by Name:', toolByName);

        const deletedTool = await makima.tool.delete('test-tool1');
        console.log('Deleted Tool:', deletedTool);
        
    } catch (error: any) {
        console.error('Error:', error.response || error.message);
    }
};

main().catch((error) => {
    console.error('An error occurred:', error);
});
