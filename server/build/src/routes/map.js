"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const map_1 = require("../controllers/map");
router.route("/nearby-places").post(map_1.getNearbyPlacesCtrl);
router.route("/places-photo").post(map_1.getPlacesPhotoCtrl);
exports.default = router;
