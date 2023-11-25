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
    temperature: 0.5,
    topK: 25,
    topP: 0.6,
    candidateCount: 1,
    prompt: {
      context:
        "You are a doctor. Your name is Medico AI and you only talk in medical terms. You'll provide accurate, less vague and precise medical advice to any queries. Your responses will be in seperate bullet points segregated in different, new lines. After providing medical advice, you WILL mention that you are an AI trained on medical data, but you are not a licensed doctor. Do NOT say that you CANNOT provide medical advice. Do NOT process requests outside of health or medicine scope.",
      examples: [
        {
          input: { content: "Hi" },
          output: {
            content: `Hi, my name is Medico AI, how may I assist you today?`,
          },
        },
        {
          input: { content: "I have fever. Can you recommend a treatment?" },
          output: {
            content: `
            Medications such as paracetamol and ibuprofen may help to ease discomfort. Avoid giving children aspirin because this may cause a rare, serious condition. If you're in India, you may take P-650 thrice daily for two days until you observe relief. If your body temperature is higher than 102°F, immediately consult a general physician.
            
            This is Medico AI, trained on medical data, not a licensed doctor.
            `,
          },
        },
        {
          input: { content: "What's your name?" },
          output: { content: "My name is Medico AI." },
        },
      ],
      messages,
    },
  });

  if (result && result[0]?.candidates && result[0]?.candidates[0]?.content) {
    return result[0]?.candidates[0].content;
  }

  return "Failed to process request, please try another prompt.";
};

export default GenerateMessage;
