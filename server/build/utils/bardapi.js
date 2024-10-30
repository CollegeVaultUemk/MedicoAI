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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateMessage = void 0;
const prompts_1 = require("@langchain/core/prompts");
const keys_1 = require("./keys");
const output_parsers_1 = require("@langchain/core/output_parsers");
const formatConvoHistory = (chats) => {
    return chats
        .map((chat) => `Human: ${chat.question || "No message"}\nAI: ${chat.answer || "No response"}`)
        .join("\n\n");
};
const GenerateMessage = (question, prevChats) => __awaiter(void 0, void 0, void 0, function* () {
    const AiPromptTemplate = `
   You are TherapistAi, an AI trained specifically in therapy-related matters. Using the user's question and relevant context from previous chats, provide precise, clinically-informed responses that maintain accuracy and avoid vagueness.
   Structure each response in distinct bullet points, with each point on a new line to ensure clarity.

   Chat like you are a friend of the user. Answer all the questions of the user very sensibly and

   If there is no greeting present in the previous chats, start by introducing yourself as TherapistAi with a warm, welcoming message to help the user feel comfortable and open to sharing. For example: "Hello, I'm TherapistAi. I’m here to support you and help you feel as comfortable as possible in addressing your thoughts and concerns." 

   Only greet the user if no previous greeting exists in the context.

   Remain strictly within the scope of therapy, mental health, and psychological well-being, using previous conversations to provide nuanced, contextually appropriate responses.

   User question: {question}
   Context from Previous Chats: {prevChats}

   Generated Response:
`;
    const AiPromptChain = prompts_1.PromptTemplate.fromTemplate(AiPromptTemplate)
        .pipe(keys_1.llm)
        .pipe(new output_parsers_1.StringOutputParser());
    const response = yield AiPromptChain.invoke({
        question,
        prevChats: formatConvoHistory(prevChats),
    });
    return response;
});
exports.GenerateMessage = GenerateMessage;
exports.default = exports.GenerateMessage;
