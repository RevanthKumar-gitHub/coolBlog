import React, { useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import AllAuthors from "./components/pages/AllAuthors";
import Blogs from "./components/pages/Blogs";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import SingleBlog from "./components/pages/SingleBlog";
import UpdateBlog from "./components/pages/UpdateBlog";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import toast, { Toaster } from "react-hot-toast";
import PageNotFound from "./components/pages/PageNotFound";

import { useDispatch, useSelector } from "react-redux";
import axios from "./config/axios";
import { setBlogs, setIsAuthenticated, setUser } from "./store/slices/appSlice";

const App = () => {
  const { mode } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { isAuthenticated, blogsUpdated } = useSelector((state) => state.app);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/users/profile");
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      dispatch(setUser({}));
      dispatch(setIsAuthenticated(false));
      toast.error(error.response.data.message);
    }
  };
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("blogs/allBlogs");
      if (data.success) {
        dispatch(setBlogs(data.blogs));
      }
    } catch (error) {
      dispatch(setBlogs([]));
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchBlogs();
  }, [isAuthenticated, blogsUpdated]);
  return (
    <div className={mode === "dark" ? "dark" : "light"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/authors" element={<AllAuthors />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
