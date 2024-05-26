const expressAsyncHandler = require("express-async-handler");
const db = require("../db");
const bcrypt = require("bcryptjs");
const { sendToken } = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

const register = expressAsyncHandler(async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400);
    throw new Error("User Avatar is needed!");
  }
  const { avatar } = req.files;
  const allowedTypes = ["image/jpeg", "image/png", "image/wbep"];

  if (!allowedTypes.includes(avatar.mimetype)) {
    res.status(400);
    throw new Error("Avatar type must be in jpeg,png,wbep");
  }

  const { name, email, password, phone, role } = req.body;

  if (!name || !email || !password || !phone || !role || !avatar) {
    res.status(400);
    throw new Error("Fill Mandatory Fields!");
  }

  const emailExists = await db.query("SELECT * FROM users WHERE email= $1", [
    email,
  ]);
  if (emailExists.rows.length > 0) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );

  try {
    const { rows } = await db.query(
      "INSERT INTO users( name, email, password, phone,avatar_url,role) VALUES($1,$2,$3,$4,$5,$6) RETURNING user_id,name,email,phone,role,avatar_url,created_at",
      [name, email, hashedPassword, phone, cloudinaryResponse.secure_url, role]
    );
    const user = rows[0];
    if (user) {
      sendToken(user, "user registered successfully", res, 201);
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

const login = expressAsyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password | !role) {
    res.status(400);
    throw new Error("Fill Mandatory Fields!");
  }
  const { rows } = await db.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  let user = rows[0];
  if (!user) {
    res.status(400);
    throw new Error("Invalid details!");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid Details!");
  }
  if (user.role !== role) {
    res.status(400);
    throw new Error("Invalid Role!");
  }
  user = {
    user_id: rows[0].user_id,
    name: rows[0].name,
    email: rows[0].email,
    phone: rows[0].phone,
    avatar_url: rows[0].avatar_url,
    role: rows[0].role,
    created_at: rows[0].created_at,
  };
  sendToken(user, "user logged In!", res, 200);
});

const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
    })
    .json({
      success: true,
      message: "User logged out!",
    });
};

const getMyProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

const getAllAuthors = expressAsyncHandler(async (req, res) => {
  const role = "Author";
  const { rows } = await db.query(
    "SELECT user_id,name,email,phone,role,avatar_url,created_at FROM users WHERE role = $1",
    [role]
  );

  res.status(200).json({
    success: true,
    authors: rows,
  });
});
module.exports = { register, login, logout, getMyProfile, getAllAuthors };
