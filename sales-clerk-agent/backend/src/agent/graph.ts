import { OrchestrationClient } from '@sap-ai-sdk/langchain';
import {
    StateGraph,
    MessagesAnnotation,
    MemorySaver,
    START,
    END
} from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages';
import { allTools } from '../tools/index';
import { SYSTEM_PROMPT } from './systemPrompt';

const destinationName = process.env.AICORE_DESTINATION_NAME ?? 'aicore-destination';
const resourceGroup = process.env.AICORE_RESOURCE_GROUP ?? 'default';

const model = new OrchestrationClient(
    { llm: { model_name: 'gpt-4o' } },
    { maxRetries: 0 },
    { resourceGroup },
    { destinationName }
);

const modelWithTools = model.bindTools(allTools);

function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
    const last = messages.at(-1) as AIMessage;
    return last.tool_calls && last.tool_calls.length > 0 ? 'tools' : END;
}

async function agentNode({ messages }: typeof MessagesAnnotation.State) {
    const systemMessage = new SystemMessage(SYSTEM_PROMPT);
    const response = await modelWithTools.invoke([systemMessage, ...messages]);
    return { messages: [response] };
}

const toolNode = new ToolNode(allTools);

const checkpointer = new MemorySaver();

export const agentApp = new StateGraph(MessagesAnnotation)
    .addNode('agent', agentNode)
    .addNode('tools', toolNode)
    .addConditionalEdges('agent', shouldContinue, ['tools', END])
    .addEdge('tools', 'agent')
    .addEdge(START, 'agent')
    .compile({ checkpointer });

export async function invokeAgent(message: string, threadId: string): Promise<string> {
    const result = await agentApp.invoke(
        { messages: [new HumanMessage(message)] },
        { configurable: { thread_id: threadId } }
    );
    const lastMessage = result.messages.at(-1);
    return typeof lastMessage?.content === 'string'
        ? lastMessage.content
        : JSON.stringify(lastMessage?.content ?? '');
}
