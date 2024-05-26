import React, { useState } from "react";
import axios from "../../config/axios";
import { useSelector } from "react-redux";
import Sidebar from "../layouts/Sidebar";
import { Navigate } from "react-router-dom";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.app);
  const [component, setComponent] = useState("myBlogs");
  if (!isAuthenticated || user.role === "Reader") {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="dark:bg-gray-800 dark:text-white flex flex-col lg:flex-row lg:min-h-screen overflow-hidden">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="basis:3/4 bg-blue py-4 px-4 min-h-screen w-full">
        {component === "myProfile" ? (
          <MyProfile />
        ) : component === "myBlogs" ? (
          <MyBlogs />
        ) : (
          <CreateBlog />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
