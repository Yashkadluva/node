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
exports.userList = exports.userLogin = void 0;
const validateKeys_1 = require("../utility/validateKeys");
const jwtUtils_1 = require("../utility/jwtUtils");
const userSchema_1 = __importDefault(require("../schema/userSchema"));
const buffer_1 = require("buffer");
const encodeString = (data) => { if (data) {
    return (0, buffer_1.btoa)(data);
} };
const decodeString = (data) => { if (data) {
    return (0, buffer_1.atob)(data);
} };
const getCaseIgnore = (value) => { return { $regex: new RegExp('^' + value + '$', "i") }; };
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, validateKeys_1.validateKey)(req.body, ["password", "email"]);
    if (error) {
        return res.status(400).send(error);
    }
    ;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent');
    const pass = encodeString(req.body.password);
    const userEamilData = yield userSchema_1.default.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (!userEamilData) {
        return res.status(404).send({ message: "Either email or password is incorrect" });
    }
    ;
    return res.status(200).send({ "token": (0, jwtUtils_1.generateToken)({ userId: userEamilData.id, email: userEamilData.email }), success: true });
});
exports.userLogin = userLogin;
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEamilData = yield userSchema_1.default.findById(req.user.userId);
    return res.status(200).send({ "data": req.user, success: true, user: userEamilData });
});
exports.userList = userList;
//# sourceMappingURL=onboarding.js.map