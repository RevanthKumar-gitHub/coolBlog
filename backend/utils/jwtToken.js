const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const sendToken = (user, message, res, statusCode) => {
  const token = generateToken(user);
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = { sendToken };
