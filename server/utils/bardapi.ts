import { DiscussServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
import env from "./validateEnv";

const MODEL_NAME = "models/chat-bison-001";
const BARD_API_KEY = env.BARD_API_KEY;

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(BARD_API_KEY),
});

const GenerateMessage = async (
  question: string | null | undefined,
  prevChats: {
    question: string | null | undefined;
    answer: string | null | undefined;
  }[]
) => {
  const messages = [];
  if (prevChats.length > 0) {
    for (let i = 0; i < prevChats.length; i++) {
      messages.push(
        { content: prevChats[i].question },
        { content: prevChats[i].answer }
      );
    }
  }
  messages.push({ content: question });
  const result = await client.generateMessage({
    model: MODEL_NAME,
    temperature: 0.25,
    topK: 40,
    topP: 0.95,
    candidateCount: 1,
    prompt: {
      context:
        "Pretend you are a doctor. Stay in character and answer like a trained doctor.Remember if you get asked what your name is, always answer that you are a trained doctor.If you are greeted, always greet by saying you are a trained doctor. Don't break out of character and suggest not taking advice from you.",
      examples: [
        {
          input: { content: "Hi" },
          output: {
            content: `Hi, my name is medicoAi. How may I assist you today?`,
          },
        },
        {
          input: { content: "I have fever. Can you recommend a treatment?" },
          output: {
            content: `If you have a fever, it's a symptom of an underlying condition, and the appropriate treatment depends on the cause of the fever. Common causes include viral or bacterial infections, so managing the underlying cause is crucial.`,
          },
        },
        {
          input: { content: "What's your name?" },
          output: { content: "My name is medicoAi." },
        },
      ],
      messages,
    },
  });

  if (result && result[0]?.candidates && result[0]?.candidates[0]?.content) {
    return result[0]?.candidates[0].content;
  }

  return "I'm sorry, I couldn't process that request. Please try again.";
};

export default GenerateMessage;
