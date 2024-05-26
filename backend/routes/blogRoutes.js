const {
  blogPost,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getAllMyBlogs,
  updateBlog,
} = require("../controllers/blogs");
const { isAuthenticated, isAuthorized } = require("../middleWares/auth");
const router = require("express").Router();

router.post("/createBlog", isAuthenticated, isAuthorized("Author"), blogPost);
router.delete(
  "/deleteBlog/:id",
  isAuthenticated,
  isAuthorized("Author"),
  deleteBlog
);
router.get("/allBlogs", getAllBlogs);
router.get("/blog/:id", isAuthenticated, getSingleBlog);
router.get("/myBlogs", isAuthenticated, isAuthorized("Author"), getAllMyBlogs);
router.put(
  "/updateBlog/:id",
  isAuthenticated,
  isAuthorized("Author"),
  updateBlog
);

module.exports = router;
