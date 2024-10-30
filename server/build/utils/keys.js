"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llm = exports.openAIApiKey = void 0;
const openai_1 = require("@langchain/openai");
const validateEnv_1 = __importDefault(require("./validateEnv"));
exports.openAIApiKey = validateEnv_1.default.OPENAI_API_KEY;
exports.llm = new openai_1.ChatOpenAI({ openAIApiKey: exports.openAIApiKey, modelName: "gpt-4o-mini" });
