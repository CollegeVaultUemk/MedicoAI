"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bardSchema = new mongoose_1.Schema({
    chat: [
        {
            chatName: String,
            question: String,
            answer: String,
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Bard", bardSchema);
