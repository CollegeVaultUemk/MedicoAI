"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomAPIError.prototype);
    }
}
exports.default = CustomAPIError;
