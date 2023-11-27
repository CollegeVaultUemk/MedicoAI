"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.route("/register").post(user_1.registerUserCtrl);
router.route("/login").post(user_1.loginUserCtrl);
router.route("/forgot-password").post(user_1.forgotPasswordCtrl);
router.route("/reset-password").put(user_1.resetPasswordCtrl);
router.route("/:id").get(user_1.getUserByIdCtrl);
router.route("/").get(user_1.getAllUsersCtrl);
exports.default = router;
