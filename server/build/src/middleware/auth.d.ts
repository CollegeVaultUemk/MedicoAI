import { Response, Request, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: object;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
