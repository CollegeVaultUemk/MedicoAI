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
exports.GetAllChatsCtrl = exports.GetSingleBardChatCtrl = exports.ContinueBardChatCtrl = exports.NewBardChatCtrl = void 0;
const Bard_1 = __importDefault(require("../models/Bard"));
const User_1 = __importDefault(require("../models/User"));
const bardapi_1 = __importDefault(require("../../utils/bardapi"));
const http_status_codes_1 = require("http-status-codes");
const generateChatname_1 = require("../../utils/generateChatname");
const NewBardChatCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { question } = req.body;
    if (!question) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ success: false, message: "No question provided" });
    }
    const answer = yield (0, bardapi_1.default)(question, []);
    const chatName = yield (0, generateChatname_1.generateChatName)(question, answer);
    try {
        const newChat = yield Bard_1.default.create({
            chat: [{ chatName, question, answer }],
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        yield User_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
            $push: { AIChat: newChat._id },
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: newChat });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Something went wrong" });
    }
});
exports.NewBardChatCtrl = NewBardChatCtrl;
const ContinueBardChatCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bardId } = req.params;
    const { question } = req.body;
    const foundChats = yield Bard_1.default.findById(bardId);
    if (!foundChats) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ success: false, message: "No chat found with this id" });
    }
    if (!question) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ success: false, message: "No question provided" });
    }
    const answer = yield (0, bardapi_1.default)(question, foundChats.chat);
    const chatName = foundChats.chat[0].chatName;
    try {
        foundChats.chat.push({ chatName, question, answer });
        yield foundChats.save();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: foundChats });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Something went wrong" });
    }
});
exports.ContinueBardChatCtrl = ContinueBardChatCtrl;
const GetSingleBardChatCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bardId } = req.params;
        const foundChat = yield Bard_1.default.findById(bardId);
        if (!foundChat) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ success: false, message: "No chat found with this id" });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, data: foundChat });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: "Something went wrong" });
    }
});
exports.GetSingleBardChatCtrl = GetSingleBardChatCtrl;
const GetAllChatsCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const userChats = yield Bard_1.default.find({ user: userId }).sort("-createdAt");
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            chats: userChats,
        });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.GetAllChatsCtrl = GetAllChatsCtrl;
