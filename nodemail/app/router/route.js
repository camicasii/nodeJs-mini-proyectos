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
exports.router = void 0;
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const test_SMPT_contection_1 = __importDefault(require("./test_SMPT_contection"));
const router = express_1.Router();
exports.router = router;
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const state = yield test_SMPT_contection_1.default();
    res.status(200).json({ SMPT_IS_CONNECT: state });
}));
router.post('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, subject, message } = req.body;
    console.log("post");
    const contentHTML = `<h1>User Information</h1>
    <ul>
    <li>username:${name}</li>
    <li>email:${email}</li>
    <li>subject:${subject}</li>
    </ul>
    <p>${message}</p>


    `;
    const nodemailOptions = {
        //@ts-ignore        
        host: process.env.SMPT_URI,
        port: process.env.SMPT_PORT,
        secure: false,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASS
        },
        connectionTimeout: 30000
    };
    const transport = nodemailer_1.default.createTransport(nodemailOptions);
    try {
        if (yield transport.verify()) {
            const emailOptions = {
                from: `"${name} " <${email}>`,
                to: "admin@camicasii.xyz",
                subject: subject,
                html: contentHTML
            };
            yield transport.sendMail(emailOptions);
            transport.close();
            res.render('home', { alert: true, is_send: true });
        }
    }
    catch (error) {
        transport.close();
        res.render('home', { alert: true, is_send: false });
    }
    transport.close();
    res.render('home', { is_send: true });
}));
