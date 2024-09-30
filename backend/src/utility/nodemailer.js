const nodemailer=require('nodemailer')

const sendOtp= async (email,otp)=>{
    
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:`${process.env.email}`,
                pass:`${process.env.password}`,
            }
        })

        const mailOptions={
            from:`${process.env.email}`,
            to:email,
            subject:'OTP for user verification',
            text:`Your OTP is ${otp}`
           
        }
        try{
         const info= await transporter.sendMail(mailOptions)
        


         return {
            messageId:info.messageId,
            receiver:info.envelope.to
         }

    } catch (error) {
        console.log('Error occured in sending otp',error)
        
    }
}



module.exports={
    sendOtp
}

