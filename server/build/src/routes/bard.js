"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
const bard_1 = require("../controllers/bard");
router
    .route("/:bardId")
    .get(auth_1.default, bard_1.GetSingleBardChatCtrl)
    .put(auth_1.default, bard_1.ContinueBardChatCtrl);
router.route("/create-chat").post(auth_1.default, bard_1.NewBardChatCtrl);
router.route("/").get(auth_1.default, bard_1.GetAllChatsCtrl);
exports.default = router;
