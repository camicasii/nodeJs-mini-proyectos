"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const path_1 = require("path");
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const route_1 = require("./router/route");
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const port = process.env.PORT || 2000;
//handlebars config
app.engine('handlebars', express_handlebars_1.default({
    defaultLayout: 'main',
    extname: 'handlebars',
    layoutsDir: path_1.join(__dirname, '/views/layouts'),
    partialsDir: path_1.join(__dirname, '/views')
}));
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(morgan_1.default('dev'));
app.use(express_1.default.static(path_1.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.set("port", port);
//Comprovar token
app.use((req, res, next) => {
    const { token } = req.query;
    if (process.env.TOKEN == token)
        next();
    else
        res.status(401).json({ error: "token no valido" });
});
app.use((req, res, next) => {
    res.locals.token = 12345;
    next();
});
app.get('/', (req, res) => res.render('home', { token: process.env.TOKEN, alert: false }));
app.use(route_1.router);
app.listen(app.get('port'), () => console.log("server on port: ", app.get('port')));
