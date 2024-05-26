const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const db = require("../db");
//AUTHENTICATION
const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(400);
    throw new Error("User is not authenticated!");
  }
  const decodedUser = await jwt.verify(token, process.env.JWT_SECRETKEY);
  const { rows } = await db.query("SELECT * FROM users WHERE user_id= $1", [
    decodedUser.user_id,
  ]);
  const user = {
    user_id: rows[0].user_id,
    name: rows[0].name,
    email: rows[0].email,
    phone: rows[0].phone,
    avatar_url: rows[0].avatar_url,
    role: rows[0].role,
    created_at: rows[0].created_at,
  };
  req.user = user;
  next();
});

// AUTHORIZATION
const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      res.json({
        success: false,
        title: "Forbidden error",
        message: `User with ${req.user.role} role is allowed to access this resource`,
      });
    }
    else
      next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
