import express from "express";
import authMiddleware from "../middleware/auth";
const router = express.Router();
import {
  ContinueBardChatCtrl,
  GetAllChatsCtrl,
  GetSingleBardChatCtrl,
  MentalHealthAnalysis,
  NewBardChatCtrl,
} from "../controllers/bard";

router
  .route("/:bardId")
  .get(authMiddleware, GetSingleBardChatCtrl)
  .put(authMiddleware, ContinueBardChatCtrl);
router.route("/create-chat").post(authMiddleware, NewBardChatCtrl);
router.route("/").get(authMiddleware, GetAllChatsCtrl);
router.route("/analysis").post(authMiddleware, MentalHealthAnalysis);
export default router;
