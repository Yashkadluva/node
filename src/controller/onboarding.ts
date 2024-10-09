import { validateKey } from "../utility/validateKeys";
import { generateToken } from "../utility/jwtUtils";
import userSchema from "../schema/userSchema";
import { atob, btoa } from "buffer";

const encodeString = (data: any) => { if (data) { return btoa(data) } };

const decodeString = (data: any) => { if (data) { return atob(data) } };

const getCaseIgnore = (value: String) => { return { $regex: new RegExp('^' + value + '$', "i") } };

export const userLogin = async (req: any, res: any) => {
    const error = validateKey(req.body, ["password", "email"]);
    if (error) { return res.status(400).send(error); };
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.get('User-Agent');
    const pass = encodeString(req.body.password);
    const userEamilData: any = await userSchema.findOne({ email: getCaseIgnore(req.body.email), password: pass, status: "ACTIVE" });
    if (!userEamilData) { return res.status(404).send({ message: "Either email or password is incorrect" }) };
    return res.status(200).send({ "token": generateToken({ userId: userEamilData.id, email: userEamilData.email }), success: true });
};

export const userList = async (req: any, res: any) => {
    const userEamilData: any = await userSchema.findById(req.user.userId);
    return res.status(200).send({ "data": req.user, success: true, user: userEamilData });
};