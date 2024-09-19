
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {sendOtp}=require('../utility/nodemailer')

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            lowercase:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
        },
        otp:{
            type:String,
        },
        otpExpire:{
            type:Date,
        },
        isVerified:{
            type:Boolean,
            default:false
        }
        
    },
    {
        timestamps:true,
    }
)

userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        next()
    }
    else{
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
        next()
    }
})

userSchema.methods.generateOtp=async function(){
    const otp=Math.floor(1000+Math.random()*9000).toString()
    this.otp=otp
    this.otpExpire=new Date(Date.now()+180000)
    await this.save()
   return  await sendOtp(this.email,otp)
}


userSchema.methods.verifyOtp=async function(userotp){
    const otp=this.otp
    const otpExpiry=this.otpExpire
    if(!otp || Date.now() > otpExpiry){
        return "expired otp"
    }
    else if(otp=== userotp){
        return true
    }
    else{
        return false
    }

}



userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id:this.id,
            name:this.name,
            email:this.email
        },
        process.env.Access_Token_Secret,
        {
            expiresIn:process.env.Acces_Token_Expiry
        }
    )
}


userSchema.methods.checkPassword= async function(password){
    return await bcrypt.compare(password,this.password)
}





const User= mongoose.model("User",userSchema)

module.exports={
    User,
}