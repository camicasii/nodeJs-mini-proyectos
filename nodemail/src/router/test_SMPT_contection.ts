import nodemailer from "nodemailer";

 export default async function():Promise<boolean>{    
    
const transport= nodemailer.createTransport({
    //@ts-ignore
    host:process.env.SMPT_URI,
    port:process.env.SMPT_PORT,
    secure:false,
    auth:{
        user:process.env.SMPT_USER,
        pass:process.env.SMPT_PASS
    }
})
const  state:Promise<boolean>=new Promise((resolve,reject)=>{
    transport.verify((error,succees)=>{
        console.log("paso");    
        if(error){
            console.log(error);                    
            resolve(false)
        }else{
            
            console.log("connect");            
            resolve(true)
            
        }
    })
})


return state



}