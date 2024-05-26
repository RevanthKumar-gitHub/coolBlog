const {
  register,
  login,
  logout,
  getMyProfile,
  getAllAuthors,
} = require("../controllers/users");
const { isAuthenticated } = require("../middleWares/auth");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getMyProfile);
router.get("/authors", getAllAuthors);

module.exports = router;
