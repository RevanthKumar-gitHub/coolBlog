import React, { useState } from "react";
import axios from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import {
  setMode,
  setIsAuthenticated,
  setUser,
} from "../../store/slices/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";

const Sidebar = ({ component, setComponent }) => {
  const [show, setShow] = useState(false);
  const { user, mode } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/users/logout");
      if (data.success) {
        toast.success(data.message);
        dispatch(setIsAuthenticated(false));
        dispatch(setUser({}));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const goToHome = () => {
    navigate("/");
  };

  return (
    <div
      className={`${
        show ? "basis-1/4" : "basis-0"
      } dark:bg-gray-900 shadow-lg lg:min-h-screen px-4 py-2 transition-all duration-300 ease-in-out sticky top-0 z-10`}
    >
      <div
        className="text-2xl text-black dark:text-white cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {!show && <RxHamburgerMenu />}
      </div>
      <div className={show ? "" : "hidden"}>
        <div className="text-xl cursor-pointer" onClick={() => setShow(!show)}>
          <FaArrowLeftLong />
        </div>
        <div className="flex flex-col justify-center items-center min-h-screen gap-2">
          <div className="flex flex-col items-center ">
            <img
              src={user.avatar_url}
              className="h-20 rounded-full w-20 object-cover border-black border-2 dark:border-none"
            />
            <div className="text-xl">{user.name}</div>
          </div>
          <ul className="flex items-center flex-col justify-center gap-2">
            <button
              className="bg-blue-600 w-32  rounded-lg py-1"
              onClick={() => {
                setComponent("myProfile");
                setShow(!show);
              }}
            >
              MY PROFILE
            </button>
            <button
              className="bg-blue-600  w-32  rounded-lg py-1"
              onClick={() => {
                setComponent("myBlogs");
                setShow(!show);
              }}
            >
              MY BLOGS
            </button>
            <button
              className="bg-blue-600 w-32  rounded-lg py-1"
              onClick={() => {
                setComponent("createBlog");
                setShow(!show);
              }}
            >
              CREATE BLOG
            </button>

            <button
              className="bg-blue-600 w-32  rounded-lg py-1"
              onClick={goToHome}
            >
              HOME
            </button>
          </ul>
          <div>
            <button
              className="text-xl rounded-full border-2 border-black  px-2 py-1 dark:border-white"
              onClick={() => {
                mode === "dark"
                  ? dispatch(setMode("light"))
                  : dispatch(setMode("dark"));
              }}
            >
              {mode === "dark" ? <CiLight /> : <MdDarkMode />}
            </button>
          </div>
          <button
            className="bg-red-600 w-32  py-1 rounded-lg"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
