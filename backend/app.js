const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { errorHandler, notFound } = require("./middleWares/errorHandler");
const userRoutes = require("./routes/usersRoutes");
const blogRoutes = require("./routes/blogRoutes");
const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use(errorHandler);
app.use(notFound);

module.exports = app;
