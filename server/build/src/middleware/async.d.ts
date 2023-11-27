import { Request, Response, NextFunction } from "express";
interface AsyncFunction {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
}
declare const asyncHandler: (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default asyncHandler;
