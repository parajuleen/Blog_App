const { User } = require("../models/user.model");
const { uploadOnCloudinary } = require("../utility/cloudnary");
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name || email || password)) {
      return res.status(400).send("Please fill all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists");
    } 
  

    const localFilepath = req.file?.path; //public\\uploads\\tesla.png//

    if (!localFilepath) {
      return res
        .status(400)
        .json({ message: "Please upload a profile picture" });
    }

    const uploadedFile = await uploadOnCloudinary(localFilepath); // returns objects after uploading in cloudinary


    const user = await User.create({
      name,
      email,
      password,
      profileImage: uploadedFile.secure_url,
    });

    const Token=await user.generateAccessToken()
    const otp=await user.generateOtp()

    const createdUser = await User.findById(user._id).select(
      "-password -otp");

    if (!createdUser) {
      return res.status(400).send("User not created");
    }


    return res.status(200)
    .cookie("token", Token, {
      httpOnly: true,
      sameSite: "Lax", // or 'Strict' if you want more security
      secure: false, // since you are on localhost
      path: "/", // set the path to root or a specific path if needed
    })
    .json({
      user: createdUser,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const verifyEmail=async(req,res)=>{
  try {
    const {otp}=req.body
    const token=req.cookies.token

    if(!token || !otp){
      return res.status(401).json({message:"Invalid request"})
    }

    const decodedtoken= jwt.verify(token,process.env.Access_Token_Secret)

    const user= await User.findById({
      _id:decodedtoken._id
    })
    if(!user){
      return res.status(400).send("User not found")
    }
    
    const result=user.verifyOtp(otp)
    if(result){
      user.isVerified=true
      user.otp=null,
      user.otpExpire=null,
      user.save()
    }

    return res.status(200).send('User verification success')
    
    
  } catch (error) {
    console.log("Something went wrong", error);
    
  }

}





const logInuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res.status(400).send("Email and password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Please enter valid credentials",
      });
    }

    

    const validatePass = await user.checkPassword(password);

    if (!validatePass) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const accessToken = await user.generateAccessToken();

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Lax", // or 'Strict' if you want more security
        secure: false, // since you are on localhost
        path: "/", // set the path to root or a specific path if needed
      })
      .json({
        message: "User logged in successfully",
        user: {
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.log(`Error occured on login`, error);
  }
};

const editProfile = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById({
    _id: userId,
  });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: `Profile edited successfully for ${user.name}`,
  });
};

const logoutUser = async (req, res) => {
  // console.log(req.user)
  // const userId = req.user._id;
  // const user = await User.findById(userId);

  // if (!user) {
  //   return res.status(400).json({
  //     message: "User not found",
  //   });
  // }

  return res.status(200)
  .clearCookie("accessToken",{
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
    path: "/",
  })
  .json({
    message: "User logged out successfully",
  })
  
}

const getUserProfile= async(req,res)=>{

  const name=req.params.name
  const userId= req.user._id 

  const user=  await User.findOne({name}) || await User.findById(userId) 

 

  if(!user){
    return res.status(400).json({
      message: "User not found",
      })
  }



  

const objectId=new mongoose.Types.ObjectId( user._id || userId)


  const userInfo= await User.aggregate(
    [
      {
        $lookup: {
          'from': 'blogs', 
          'localField': '_id', 
          'foreignField': 'author', 
          'as': 'blog_info'
        }
      },
      {
        $match: {
          '_id':objectId
        }
      },
      
      {
        $project: {
          'name': 1, 
          'email': 1, 
          'profileImage': 1, 
          'blog_info': 1
        }
      }
    ])

    return res.status(200).send(
      userInfo,
    )


}





module.exports = {
  registerUsers,
  logInuser,
  editProfile,
  logoutUser,
  getUserProfile,
  verifyEmail
};
