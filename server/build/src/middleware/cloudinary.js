"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImg = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "dhivf8dyb",
    api_key: "177877774542481",
    api_secret: "X40FLcBUHlOpgikH9Mv6l3JGTyY",
});
const uploadImg = (file) => cloudinary_1.v2.uploader.upload(`data:image/jpeg;base64,${file}`, { public_id: "hospital-img" }, function (error, result) {
    if (error) {
        console.error(error);
    }
    else {
        return result;
    }
});
exports.uploadImg = uploadImg;
