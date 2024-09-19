const jwt=require('jsonwebtoken')

const verifyUser= async(req,res,next)=>{

    const token= req.cookies.accessToken

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access.Please log in "
        })
    }
    const user= jwt.verify(token,process.env.Access_Token_Secret)
    req.user=user
    next()
}

module.exports={
    verifyUser
}