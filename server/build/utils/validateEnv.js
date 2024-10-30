"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGO_URI: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
    JWT_SECRET: (0, validators_1.str)(),
    EMAIL: (0, validators_1.str)(),
    PASS: (0, validators_1.str)(),
    GOOGLE_MAPS_API_KEY: (0, validators_1.str)(),
    BARD_API_KEY: (0, validators_1.str)(),
    OPENAI_API_KEY: (0, validators_1.str)(),
});
