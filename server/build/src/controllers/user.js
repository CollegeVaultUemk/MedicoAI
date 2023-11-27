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
exports.resetPasswordCtrl = exports.forgotPasswordCtrl = exports.getUserByIdCtrl = exports.getAllUsersCtrl = exports.loginUserCtrl = exports.registerUserCtrl = void 0;
const User_1 = __importDefault(require("../models/User"));
const async_1 = __importDefault(require("../middleware/async"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const validateEnv_1 = __importDefault(require("../../utils/validateEnv"));
const nodemailer_1 = __importDefault(require("../../utils/nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
exports.registerUserCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        throw new errors_1.BadRequestError(`User already exists with email : ${email}`);
    }
    const newUser = yield User_1.default.create(req.body);
    const token = newUser.generateToken();
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: "true",
        message: "User created successfully",
        newUser,
        token,
    });
}));
exports.loginUserCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const loggedInUser = yield User_1.default.findOne({ email });
    if (!loggedInUser) {
        throw new errors_1.UnAuthenticatedError(`No account found with email : ${email}`);
    }
    const isPasswordCorrect = yield loggedInUser.matchPassword(password);
    if (!isPasswordCorrect) {
        throw new errors_1.UnAuthenticatedError("Incorrect password");
    }
    const token = loggedInUser.generateToken();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "User logged in successfully",
        newUser: loggedInUser,
        token,
    });
}));
exports.getAllUsersCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}).select("-password");
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, users });
}));
exports.getUserByIdCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    const user = yield User_1.default.findById(userId)
        .select("-password")
        .populate("AIChat");
    if (!user) {
        throw new errors_1.BadRequestError(`No user found with id: ${userId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, user });
}));
exports.forgotPasswordCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new errors_1.BadRequestError("Please provide email");
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.BadRequestError(`No user found with email : ${email}`);
    }
    const resetToken = user.generateResetPasswordToken();
    const resetUrl = `You can reset your password by clicking on this link. \n\n <a href = "${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}">Click here</a>`;
    const message = {
        from: validateEnv_1.default.EMAIL,
        to: email,
        subject: "Reset Password",
        html: resetUrl,
    };
    yield nodemailer_1.default.sendMail(message);
    yield user.save({ validateBeforeSave: false });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Reset password link sent to your email",
        resetUrl,
    });
}));
exports.resetPasswordCtrl = (0, async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    const hashedToken = crypto_1.default.createHash("sha256").update(token).digest("hex");
    const user = yield User_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new errors_1.BadRequestError("Invalid token");
    }
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Password reset successfully",
    });
}));
