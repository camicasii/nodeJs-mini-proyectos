
import express from "express";
import * as dotenv from "dotenv";
dotenv.config()
import { join } from "path";
import hbs from "express-handlebars";
import {router} from "./router/route";
import morgan from "morgan";


const app = express()
const port = process.env.PORT || 2000

//handlebars config
app.engine('handlebars',hbs({
    defaultLayout:'main',
    extname:'handlebars',
    layoutsDir:join(__dirname,'/views/layouts'),
    partialsDir:join(__dirname,'/views')
}))


app.set('views', join(__dirname, 'views'));
app.set('view engine','handlebars')

app.use(morgan('dev'))
app.use(express.static(join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("port",port)
//token para mejorar la seguridad del servicio
app.use((req,res,next)=>{
    const {token}=req.query    
    if(process.env.TOKEN==token)next()
    else res.status(401).json({error:"token no valido"})    
})
app.use((req,res,next)=>{
    res.locals.token=12345
    next()
})
app.get('/',(req,res)=>res.render('home',{token:process.env.TOKEN,alert:false}))
app.use(router)



app.listen(app.get('port'),()=>console.log("server on port: ",app.get('port')))