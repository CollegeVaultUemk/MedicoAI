"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generativelanguage_1 = require("@google-ai/generativelanguage");
const google_auth_library_1 = require("google-auth-library");
const validateEnv_1 = __importDefault(require("./validateEnv"));
const MODEL_NAME = "models/chat-bison-001";
const BARD_API_KEY = validateEnv_1.default.BARD_API_KEY;
const client = new generativelanguage_1.DiscussServiceClient({
    authClient: new google_auth_library_1.GoogleAuth().fromAPIKey(BARD_API_KEY),
});
const GenerateMessage = (question, prevChats) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const messages = [];
    if (prevChats.length > 0) {
        for (let i = 0; i < prevChats.length; i++) {
            messages.push({ content: prevChats[i].question }, { content: prevChats[i].answer });
        }
    }
    messages.push({ content: question });
    const result = yield client.generateMessage({
        model: MODEL_NAME,
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        candidateCount: 1,
        prompt: {
            context: "You are a doctor. Your name is Medico AI and you only talk in medical terms. You'll provide accurate, less vague and precise medical advice to any queries. Your responses will be in seperate bullet points segregated in different, new lines. After providing medical advice, you WILL mention that you are an AI trained on medical data, but you are not a licensed doctor. Do NOT say that you CANNOT provide medical advice. Do NOT process requests outside of health or medicine scope.",
            examples: [
                {
                    input: { content: "I have fever. Can you recommend a treatment?" },
                    output: {
                        content: `
            Medications such as paracetamol and ibuprofen may help to ease discomfort. Avoid giving children aspirin because this may cause a rare, serious condition. If you're in India, you may take P-650 thrice daily for two days until you observe relief. If your body temperature is higher than 102°F, immediately consult a general physician.
            
            This is Medico AI, trained on medical data, not a licensed doctor.
            `,
                    },
                },
            ],
            messages,
        },
    });
    if (result && ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.candidates) && ((_c = (_b = result[0]) === null || _b === void 0 ? void 0 : _b.candidates[0]) === null || _c === void 0 ? void 0 : _c.content)) {
        return (_d = result[0]) === null || _d === void 0 ? void 0 : _d.candidates[0].content;
    }
    return "Failed to process request, please try another prompt.";
});
exports.default = GenerateMessage;
