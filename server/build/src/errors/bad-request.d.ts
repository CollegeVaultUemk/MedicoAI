import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";
declare class BadRequestError extends CustomAPIError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default BadRequestError;
