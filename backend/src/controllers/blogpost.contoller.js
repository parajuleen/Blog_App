const { Blog } = require("../models/blogpost.model");
const { uploadOnCloudinary } = require("../utility/cloudnary");

const postBlog = async (req, res) => {
  const { title, description } = req.body;
  const coverImagelocalPath = req.file.path;
  const userId = req.user._id;

  if (!(title && description)) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  if (!coverImagelocalPath) {
    return res.status(400).json({ error: "Please upload a cover image." });
  }

  const coverImage = await uploadOnCloudinary(coverImagelocalPath);
  if (!coverImage) {
    return res
      .status(400)
      .json({ error: "Failed to upload image on cloudinary." });
  }

  const blog = await Blog.create({
    title: title,
    description: description,
    coverImage: coverImage.secure_url,
    author: userId,
  });

  if (!blog) {
    return res.status(400).json({ error: "Failed to create blog post." });
  }

  return res.status(200).json({
    message: "Blog post created successfully",
    blog: blog,
  });
};

const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          createdAt: 1,
          coverImage: 1,
          "author._id": 1,
          "author.name": 1,
          "author.profileImage": 1,
        },
      },
    ]);

    return res.status(200).json({
      blog,
    });
  } catch (error) {
    console.log(`Error occured on fetching posts`, error);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id).populate({
      path: "author",
      select: "name profileImage",
    });

    if (!blog) {
      return res.status(404).json({
        msg: "Blog not found",
      });
    }

    return res.status(200).json({
      msg: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log(`Error occured on fetching posts`, error);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if(!blog){
        return res.status(404).json({
            msg: "Blog not found",
            });
    }
  
    if (blog) {
      if (blog.author.toString() === userId.toString()) {
            await Blog.findByIdAndDelete(blogId)

        return res.status(200).json({
          msg: "Blog successfully deleted",
        });
      }
      else{
          return res.status(401).json({
              msg: "Unauthorized request"
              });
      }
  
    }
  } catch (error) {
    console.log(`Error occured on deleting posts`, error);
    return res.status(500).json({
        msg: "Server error",
      });
    
  }
};

module.exports = {
  postBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
};
