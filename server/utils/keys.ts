import { ChatOpenAI } from "@langchain/openai";

export const openAIApiKey = process.env.OPENAI_API_KEY as string;

export const llm = new ChatOpenAI({ openAIApiKey, modelName: "gpt-4o-mini" });
