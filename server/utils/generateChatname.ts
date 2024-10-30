import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "./keys";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const generateChatName = async (user: string, ai: string) => {
  const chatNameTemplate = `This is a chat between a human and an ai which is acting as a therapist. Find a suitable name for the chat by analyzing the user input and ai response and generate a suitable chat name. (Just provided the chat name, no need to provide it within double quotes)
  user input : {user}
  ai response : {ai}
  chat name : 
  `;

  const chatNameChain = PromptTemplate.fromTemplate(chatNameTemplate)
    .pipe(llm)
    .pipe(new StringOutputParser());

  const response = await chatNameChain.invoke({
    user,
    ai,
  });

  return response;
};
