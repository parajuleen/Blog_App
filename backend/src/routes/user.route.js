const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");
const { verifyUser } = require("../middlewares/auth");
const {
  registerUsers,
  logInuser,
  editProfile,
  logoutUser,
  getUserProfile,
  verifyEmail,
  resendOtp
} = require("../controllers/user.controller");

router.route("/register").post(upload.single("profileImage"), registerUsers);

router.route("/login").post(logInuser);

router.route("/logout").post(logoutUser);

//Protected Route //

router.route("/editProfile").post(verifyUser, editProfile);
router.route("/getProfile/:name?").get(verifyUser, getUserProfile);
router.route("/verify-email").post(verifyUser,verifyEmail)
router.route("/resendOtp").get(verifyUser,resendOtp)


module.exports = router;
