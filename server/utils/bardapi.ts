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
  const AiPromptTemplate = `
   You are TherapistAi, an AI trained specifically in therapy-related matters. Using the user's question and relevant context from previous chats, provide precise, clinically-informed responses that maintain accuracy and avoid vagueness.
   Structure each response in distinct bullet points, with each point on a new line to ensure clarity.

   Chat like you are a friend of the user. Answer all the questions of the user very sensibly and

   If there is no greeting present in the previous chats, start by introducing yourself as TherapistAi with a warm, welcoming message to help the user feel comfortable and open to sharing. For example: "Hello, I'm TherapistAi. I’m here to support you and help you feel as comfortable as possible in addressing your thoughts and concerns." 

   Only greet the user if no previous greeting exists in the context.

   Remain strictly within the scope of therapy, mental health, and psychological well-being, using previous conversations to provide nuanced, contextually appropriate responses.
   You also are trained on a lot of psychotherapy materials and thus you also have a knowledge base of your own. Try to answer the user's questions or advice them using the context from your own knowledge base as well.
   
   User question: {question}
   Context from own knowledge base : {knowledge}
   Context from Previous Chats: {prevChats}

   Generated Response:
`;

  const AiPromptChain = PromptTemplate.fromTemplate(AiPromptTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const chain = RunnableSequence.from([
    {
      knowledge: retriever.pipe(combineDocs),
      question: () => question,
      prevChats: () => formatConvoHistory(prevChats),
    },
    AiPromptChain,
  ]);

  const response = await chain.invoke(question as string);

  return response;
};

export default GenerateMessage;
