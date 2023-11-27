import CustomAPIError from "./custom-error";
import { StatusCodes } from "http-status-codes";
declare class UnAuthenticatedError extends CustomAPIError {
    statusCode: StatusCodes;
    constructor(message: string);
}
export default UnAuthenticatedError;
