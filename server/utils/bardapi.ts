import { PromptTemplate } from "@langchain/core/prompts";
import { combineDocs, llm, vectorStore } from "./keys";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";

const formatConvoHistory = (chats: any) => {
  return chats
    .map(
      (chat: { question: string; answer: string }) =>
        `Human: ${chat.question || "No message"}\nAI: ${
          chat.answer || "No response"
        }`
    )
    .join("\n\n");
};

export const GenerateMessage = async (
  question: string | null | undefined,
  prevChats: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[]
) => {
  const retriever = vectorStore.asRetriever();

  let knowledgeContext;
  try {
    knowledgeContext = await retriever
      .pipe(combineDocs)
      .invoke(question as string);
    if (!knowledgeContext) {
      knowledgeContext = "No relevant context found.";
    }
  } catch (error) {
    console.log("Error retrieving documents:", error);
    knowledgeContext = "No relevant context found due to an error.";
  }

  const AiPromptTemplate = `
  You are Serenity, an AI designed specifically for therapy-related support. Using the user's question and relevant information from previous chats, provide precise, clinically-informed responses that remain empathetic and accurate.

  **Response Guidelines**:
  - Use a conversational, friendly tone, as if you are a supportive friend to the user.
  - Structure each response in **clear, separate bullet points**, with each new idea or point on a new line.
  - Remain strictly within the scope of therapy, mental health, and psychological well-being, using your own knowledge base when relevant.

  **Handling Missing Context**:
  - If no relevant context is found in your knowledge base or the previous chats, proceed with the response based solely on the user's question. Avoid any speculative or vague statements.
  
  **Instructions**:
  - Only greet the user if no previous greeting exists in the context.
  - Ensure responses stay clear, supportive, and provide actionable insights where possible.

  **User question**: {question}
  **Context from Knowledge Base**: {knowledge}
  **Context from Previous Chats**: {prevChats}

  **Generated Response**:
`;

  const AiPromptChain = PromptTemplate.fromTemplate(AiPromptTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const chain = RunnableSequence.from([
    {
      knowledge: () => knowledgeContext,
      question: () => question,
      prevChats: () => formatConvoHistory(prevChats),
    },
    AiPromptChain,
  ]);

  const response = await chain.invoke(question as string);

  return response;
};

export default GenerateMessage;
