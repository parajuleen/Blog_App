const nodemailer=require('nodemailer')

const sendOtp= async (email,otp)=>{
    try {
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

         const info= await transporter.sendMail(mailOptions)
         return info.response        
    } catch (error) {
        console.log('Error occured in sending otp',error)
        
    }
}



module.exports={
    sendOtp
}

