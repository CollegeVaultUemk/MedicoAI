"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlacesPhotoCtrl = exports.getNearbyPlacesCtrl = void 0;
const axios_1 = __importDefault(require("axios"));
const validateEnv_1 = __importDefault(require("../../utils/validateEnv"));
const getNearbyPlacesCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location, radius, type } = req.body;
    const apiKey = validateEnv_1.default.GOOGLE_MAPS_API_KEY;
    try {
        const { data } = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&key=${apiKey}`);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getNearbyPlacesCtrl = getNearbyPlacesCtrl;
const getPlacesPhotoCtrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { photoRef } = req.body;
    const apiKey = validateEnv_1.default.GOOGLE_MAPS_API_KEY;
    try {
        const { data } = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}`, { responseType: "arraybuffer" });
        const bufferData = Buffer.from(data, "binary");
        const base64String = bufferData.toString("base64");
        // const img = await uploadImg(base64String);
        res.status(200).json({ success: true, img: base64String });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
});
exports.getPlacesPhotoCtrl = getPlacesPhotoCtrl;
