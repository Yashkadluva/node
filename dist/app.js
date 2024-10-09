"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./main"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
app.use(body_parser_1.default.json({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/", main_1.default);
(0, db_1.default)();
// npm install buffer dotenv mongoose jsonwebtoken body-parser cors
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port} 123`);
});
//# sourceMappingURL=app.js.map