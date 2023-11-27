"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: validateEnv_1.default.EMAIL,
        pass: validateEnv_1.default.PASS,
    },
});
exports.default = transporter;
