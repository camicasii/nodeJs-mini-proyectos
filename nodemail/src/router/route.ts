import { Router } from "express";
import nodemailer,{TransportOptions,SendMailOptions} from "nodemailer";
import test from "./test_SMPT_contection";
const router=Router()

router.get('/test',async(req,res)=>{    
 const state=await test()
    res.status(200).json({SMPT_IS_CONNECT:state})    
})

router.post('/send',async(req,res)=>{
    const { name,
    email ,
    subject,
    message}=req.body;
            console.log("post");
            
    const contentHTML=`<h1>User Information</h1>
    <ul>
    <li>username:${name}</li>
    <li>email:${email}</li>
    <li>subject:${subject}</li>
    </ul>
    <p>${message}</p>


    `
    const nodemailOptions:TransportOptions={
        //@ts-ignore        
        host:process.env.SMPT_URI,
    port:process.env.SMPT_PORT,
    secure:false,
    auth:{
        user:process.env.SMPT_USER,
        pass:process.env.SMPT_PASS
    },        
        connectionTimeout:30000
    }

const transport= nodemailer.createTransport(nodemailOptions) 

try {
    if(await transport.verify()){
    const emailOptions:SendMailOptions={
        from:`"${name} " <${email}>`,
        to:"admin@camicasii.xyz",
        subject:subject,        
        html:contentHTML
    }    

    await transport.sendMail(emailOptions)
    transport.close()
    res.render('home',{alert:true,is_send:true})
 
}
} catch (error) {
    transport.close()
    res.render('home',{alert:true,is_send:false})
}
transport.close()
res.render('home',{is_send:true})    
})

export {router};