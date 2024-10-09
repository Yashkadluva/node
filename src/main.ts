import express from "express";
import { validateToken } from "./utility/validateToken";
import { userLogin, userList } from "./controller/onboarding";
const router = express.Router();

router.post('/login', userLogin);
router.get('/user/list', validateToken, userList);
export default router;