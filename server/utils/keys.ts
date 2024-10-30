import { ChatOpenAI } from "@langchain/openai";
import env from "./validateEnv";

export const openAIApiKey = env.OPENAI_API_KEY as string;

export const llm = new ChatOpenAI({ openAIApiKey, modelName: "gpt-4o-mini" });
