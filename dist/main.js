"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateToken_1 = require("./utility/validateToken");
const onboarding_1 = require("./controller/onboarding");
const router = express_1.default.Router();
router.post('/login', onboarding_1.userLogin);
router.get('/user/list', validateToken_1.validateToken, onboarding_1.userList);
exports.default = router;
//# sourceMappingURL=main.js.map