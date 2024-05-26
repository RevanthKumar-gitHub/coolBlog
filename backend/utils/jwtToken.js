const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const generateToken = (user) => {
  return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const sendToken = (user, message, res, statusCode) => {
  const token = generateToken(user);
  const options = {
    httpOnly: true, 
    secure: true, 
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = { sendToken };
