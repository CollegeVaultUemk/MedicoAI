/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Bard from "../models/Bard";
import User from "../models/User";
import Report from "../models/Report";
import GenerateMessage from "../../utils/bardapi";
import { StatusCodes } from "http-status-codes";
import { generateChatName } from "../../utils/generateChatname";
import GenerateMHA from "../../utils/generateMHA";

interface AuthRequest extends Request {
  user?: { _id: ObjectId; AIChat: ObjectId[] };
}

export const NewBardChatCtrl = async (req: AuthRequest, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "No question provided" });
  }
  const answer = await GenerateMessage(question, []);
  const chatName = await generateChatName(question, answer);
  try {
    const newChat = await Bard.create({
      chat: [{ chatName, question, answer }],
      user: req.user?._id,
    });
    await User.findByIdAndUpdate(req.user?._id, {
      $push: { AIChat: newChat._id },
    });
    return res.status(StatusCodes.OK).json({ success: true, data: newChat });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const ContinueBardChatCtrl = async (req: AuthRequest, res: Response) => {
  const { bardId } = req.params;
  const { question } = req.body;
  const foundChats = await Bard.findById(bardId);
  if (!foundChats) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: "No chat found with this id" });
  }
  if (!question) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "No question provided" });
  }
  const answer = await GenerateMessage(question, foundChats.chat);
  const chatName = foundChats.chat[0].chatName;
  try {
    foundChats.chat.push({ chatName, question, answer });
    await foundChats.save();
    return res.status(StatusCodes.OK).json({ success: true, data: foundChats });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const GetSingleBardChatCtrl = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { bardId } = req.params;
    const foundChat = await Bard.findById(bardId);
    if (!foundChat) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "No chat found with this id" });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: foundChat });
  } catch (error: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const GetAllChatsCtrl = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const userChats = await Bard.find({ user: userId }).sort("-createdAt");
    return res.status(StatusCodes.OK).json({
      success: true,
      chats: userChats,
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const MentalHealthAnalysis = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    if (user && user.AIChat) {
      const AllUserChats = (
        await Promise.all(
          user?.AIChat.map(async (chatId: ObjectId) => {
            const foundChat = await Bard.findById(chatId);
            return foundChat?.chat;
          })
        )
      ).flat();
      const chatsUpdateDates = await Promise.all(
        user?.AIChat.map(async (chatId: ObjectId) => {
          const foundChat = await Bard.findById(chatId);
          return foundChat?.updatedAt;
        })
      );
      if (AllUserChats.length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: "false",
          message:
            "You have no chats with Serenity ! Chat Now in order to generate a report !",
        });
      }
      const cleanedChats = AllUserChats.map((chat) => {
        return {
          question: chat?.question,
          answer: chat?.answer,
        };
      });
      let MHAReport: {} | null;
      const prevAnalysisExists = await Report.findOne({ user: user?._id });
      const mostRecentChatDate = chatsUpdateDates
        .filter((date): date is Date => date !== undefined)
        .reduce((latestDate, date) => {
          return new Date(date) > new Date(latestDate) ? date : latestDate;
        }, new Date(0));
      if (
        prevAnalysisExists &&
        prevAnalysisExists.updatedAt > mostRecentChatDate
      ) {
        MHAReport = prevAnalysisExists;
        return res.status(StatusCodes.OK).json({
          success: true,
          report: MHAReport,
        });
      } else {
        try {
          const normalMHAReport = await GenerateMHA(cleanedChats);
          MHAReport = prevAnalysisExists
            ? await Report.findByIdAndUpdate(prevAnalysisExists._id, {
                ...normalMHAReport,
              })
            : await Report.create({ ...normalMHAReport, user: user._id });
        } catch (error) {
          console.log("error generating report", error);
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error,
          });
        }
        return res.status(StatusCodes.OK).json({
          success: true,
          report: MHAReport,
        });
      }
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: true,
      message: "no user found",
    });
  } catch (error) {
    console.log("Error in mental health analysis : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
};

export const getUsersMHAReport = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const MHAReportUser = await Report.findOne({
      user: user?._id,
    });
    if (!MHAReportUser) {
      return res.status(StatusCodes.OK).json({
        success: "false",
        message: "You have not generated any report !",
      });
    }
    return res.status(StatusCodes.OK).json({
      success: "true",
      report: MHAReportUser,
    });
  } catch (error) {
    console.log("Error in retrieving MHA : ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
};
