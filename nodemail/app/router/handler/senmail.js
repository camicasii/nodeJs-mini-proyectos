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
const nodemailer_1 = __importDefault(require("nodemailer"));
function default_1() {
    return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
        const nodemailOptions = {
            //@ts-ignore
            //host:"smtp.sendgrid.net",
            host: "email.camicasii.xyz",
            port: "587",
            secure: false,
            auth: {
                user: 'admin@camicasii.xyz',
                pass: '123258456798'
            },
            connectionTimeout: 30000
        };
        const transport = nodemailer_1.default.createTransport(nodemailOptions);
        console.log(yield transport.verify());
        transport.close();
        res(true);
    }));
}
exports.default = default_1;
