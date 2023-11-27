"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const map_1 = __importDefault(require("./routes/map"));
const bard_1 = __importDefault(require("./routes/bard"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const app = (0, express_1.default)();
//----External Middleware Configuration----//
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
//-----------------------------------------//
//----Routes----//
app.use("/api/v1/users", user_1.default);
app.use("/api/v1/maps", map_1.default);
app.use("/api/v1/bard", bard_1.default);
app.use(notFound_1.default);
app.use(error_handler_1.default);
//---------------//
//----Test Route----//
/*
app.get("/", (req, res)=>{
    res.send("Hello mom")
})
*/
//------------------//
exports.default = app;
