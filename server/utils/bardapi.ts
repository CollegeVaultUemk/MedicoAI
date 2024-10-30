import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./keys";
import { StringOutputParser } from "@langchain/core/output_parsers";

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
  const AiPromptTemplate = `
   You are TherapistAi, an AI trained specifically in therapy-related matters. Using the user's question and relevant context from previous chats, provide precise, clinically-informed responses that maintain accuracy and avoid vagueness.
   Structure each response in distinct bullet points, with each point on a new line to ensure clarity. After delivering your guidance, clearly state that you are an AI trained on therapy and psychological data but not a licensed therapist.

   Remain strictly within the scope of therapy, mental health, and psychological well-being, using previous conversations to provide nuanced, contextually appropriate responses.

   User Instructions: {question}
   Context from Previous Chats: {prevChats}

   Generated Response:
`;

  const AiPromptChain = PromptTemplate.fromTemplate(AiPromptTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const response = await AiPromptChain.invoke({
    question,
    prevChats: formatConvoHistory(prevChats),
  });

  return response;
};

export default GenerateMessage;
