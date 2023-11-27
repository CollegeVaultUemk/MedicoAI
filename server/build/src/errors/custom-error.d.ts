declare abstract class CustomAPIError extends Error {
    abstract statusCode: number;
    constructor(message: string);
}
export default CustomAPIError;
