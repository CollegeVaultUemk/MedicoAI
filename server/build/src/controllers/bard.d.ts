import { Request, Response } from "express";
import { ObjectId } from "mongoose";
interface AuthRequest extends Request {
    user?: {
        _id: ObjectId;
    };
}
export declare const NewBardChatCtrl: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ContinueBardChatCtrl: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetSingleBardChatCtrl: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetAllChatsCtrl: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
