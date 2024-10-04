const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access. ",
      });
    }
    const user = jwt.verify(token, process.env.Access_Token_Secret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
        message: `${error.message}`
    })
  }
};

module.exports = {
  verifyUser,
};
