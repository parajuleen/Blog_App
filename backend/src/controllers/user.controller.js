const { User } = require("../models/user.model");
const { uploadOnCloudinary } = require("../utility/cloudnary");
const mongoose = require("mongoose");

const registerUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name || email || password)) {
      return res.status(400).send("Please fill all the fields");
    }

    const userExists = await User.findOne({
      $or: [{ email }, { name }],
    });
    if (userExists) {
      return res.status(409).send("Name or email already exists.");
    }

    const localFilepath = req.file?.path; //public\\uploads\\tesla.png//

    if (!localFilepath) {
      return res
        .status(400)
        .json({ message: "Please upload a profile picture." });
    }

    const uploadedFile = await uploadOnCloudinary(localFilepath); // returns objects after uploading in cloudinary

    const user = await User.create({
      name,
      email,
      password,
      profileImage: uploadedFile.secure_url,
    });
    const temptoken = await user.generateTemptoken();
    await user.generateOtp();

    const createdUser = await User.findById(user._id).select("-password -otp");

    if (!createdUser) {
      return res.status(400).send("User not created");
    }

    return res
      .status(200)
      .cookie("temptoken", temptoken, {
        httpOnly: true,
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
        maxAge:1800*1000
      })
      .json({
        user: createdUser,
      });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.cookies.temptoken;
    if (!token) {
      return res.status(400).json({ message: "Invalid request" });
    }  

    if (!otp) {
      return res.status(401).json({ message: "Otp is required" });
    }

    const user = await User.findOne({
      temptoken: token,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const result = await user.verifyOtp(otp);
    if (result == "Expired otp") {
      return res.status(400).json({
        message: "Otp has expired",
      });
    }
    if (result == "Invalid otp") {
      return res.status(400).json({
        message: "Invalid otp",
      });
    }
    if (result == "Verified otp") {
      user.isVerified = true;
      user.otp = undefined;
      user.temptoken = undefined;
      user.otpExpire = undefined;
      await user.save();


      return res
        .status(200)
        .clearCookie("temptoken", {
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
          path: "/",
        })
        .json({
          message: "Email verified successfully",
        });
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const resendOtp = async (req, res) => {
  try {
    const token = req.cookies.temptoken;
    if (!token) {
      return res.status(401).json({ message: "Invalid request" });
    }

    const user = await User.findOne({
      temptoken: token,
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const result = await user.generateOtp();
    if (result.messageId) {
      return res.status(200).json({
        message: `Code resent to ${result.receiver}`,
      });
    } else {
      return res.status(500).json({
        message: "Failed to resend code",
      });
    }
  } catch (error) {
    console.log("error on resending otp", error);
  }
};

const logInuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res.status(400).json({
        message:"Email and password required"
      });
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

    if (!user.isVerified) {
      const temptoken = await user.generateTemptoken();
      await user.generateOtp()
      return res
        .status(403)
        .cookie("temptoken", temptoken, {
          httpOnly: true,
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
          path: "/",
          maxAge:1800*1000
        })
        .json({
          message: "Please verify your email.Verification code has been sent to registered email",
        });
    }

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

  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    })
    .json({
      message: "User logged out successfully",
    });
};

const getUserProfile = async (req, res) => {
  const name = req.params.name;
  const userId = req.user._id;

  const user = (await User.findOne({ name })) || (await User.findById(userId));

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const objectId = new mongoose.Types.ObjectId(user._id || userId);

  const userInfo = await User.aggregate([
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "author",
        as: "blog_info",
      },
    },
    {
      $match: {
        _id: objectId,
      },
    },

    {
      $project: {
        name: 1,
        email: 1,
        profileImage: 1,
        blog_info: 1,
      },
    },
  ]);

  return res.status(200).send(userInfo);
};

module.exports = {
  registerUsers,
  logInuser,
  editProfile,
  logoutUser,
  getUserProfile,
  verifyEmail,
  resendOtp,
};
