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
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("../config/database"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const port = validateEnv_1.default.PORT;
const appStart = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)(validateEnv_1.default.MONGO_URI);
        app_1.default.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
appStart();
