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
exports.generateChatName = void 0;
const prompts_1 = require("@langchain/core/prompts");
const keys_1 = require("./keys");
const output_parsers_1 = require("@langchain/core/output_parsers");
const generateChatName = (user, ai) => __awaiter(void 0, void 0, void 0, function* () {
    const chatNameTemplate = `This is a chat between a human and an ai which is acting as a therapist. Find a suitable name for the chat by analyzing the user input and ai response and generate a suitable chat name. (Just provided the chat name, no need to provide it within double quotes)
  user input : {user}
  ai response : {ai}
  chat name : 
  `;
    const chatNameChain = prompts_1.PromptTemplate.fromTemplate(chatNameTemplate)
        .pipe(keys_1.llm)
        .pipe(new output_parsers_1.StringOutputParser());
    const response = yield chatNameChain.invoke({
        user,
        ai,
    });
    return response;
});
exports.generateChatName = generateChatName;
