"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentApp = void 0;
exports.invokeAgent = invokeAgent;
const langchain_1 = require("@sap-ai-sdk/langchain");
const langgraph_1 = require("@langchain/langgraph");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const messages_1 = require("@langchain/core/messages");
const index_1 = require("../tools/index");
const systemPrompt_1 = require("./systemPrompt");
const destinationName = process.env.AICORE_DESTINATION_NAME ?? 'aicore-destination';
const resourceGroup = process.env.AICORE_RESOURCE_GROUP ?? 'default';
const model = new langchain_1.OrchestrationClient({ llm: { model_name: 'gpt-4o' } }, { maxRetries: 0 }, { resourceGroup }, { destinationName });
const modelWithTools = model.bindTools(index_1.allTools);
function shouldContinue({ messages }) {
    const last = messages.at(-1);
    return last.tool_calls && last.tool_calls.length > 0 ? 'tools' : langgraph_1.END;
}
async function agentNode({ messages }) {
    const systemMessage = new messages_1.SystemMessage(systemPrompt_1.SYSTEM_PROMPT);
    const response = await modelWithTools.invoke([systemMessage, ...messages]);
    return { messages: [response] };
}
const toolNode = new prebuilt_1.ToolNode(index_1.allTools);
const checkpointer = new langgraph_1.MemorySaver();
exports.agentApp = new langgraph_1.StateGraph(langgraph_1.MessagesAnnotation)
    .addNode('agent', agentNode)
    .addNode('tools', toolNode)
    .addConditionalEdges('agent', shouldContinue, ['tools', langgraph_1.END])
    .addEdge('tools', 'agent')
    .addEdge(langgraph_1.START, 'agent')
    .compile({ checkpointer });
async function invokeAgent(message, threadId) {
    const result = await exports.agentApp.invoke({ messages: [new messages_1.HumanMessage(message)] }, { configurable: { thread_id: threadId } });
    const lastMessage = result.messages.at(-1);
    return typeof lastMessage?.content === 'string'
        ? lastMessage.content
        : JSON.stringify(lastMessage?.content ?? '');
}
