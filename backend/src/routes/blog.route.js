const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");
const { verifyUser } = require("../middlewares/auth");
const { postBlog, getBlogs, getSingleBlog,deleteBlog} = require("../controllers/blogpost.contoller");

router
  .route("/postblog")
  .post(verifyUser, upload.single("coverImage"), postBlog);

router.route("/getblogs").get(verifyUser, getBlogs);
router.route('/:id').get(verifyUser,getSingleBlog)
router.route('/:id').delete(verifyUser,deleteBlog)


module.exports = router;
