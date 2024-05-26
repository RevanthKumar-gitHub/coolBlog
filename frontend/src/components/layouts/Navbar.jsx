import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import {
  setIsAuthenticated,
  setMode,
  setUser,
} from "../../store/slices/appSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "../../config/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  const { mode, isAuthenticated, user } = useSelector((state) => state.app);
  const dispatch = useDispatch();

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
  return (
    <div className="sticky top-0 z-10">
      <section
        className={`${
          isDashboard.pathname === "/dashboard"
            ? "hidden"
            : mode === "dark"
            ? "dark "
            : "light shadow-black"
        } shadow-sm`}
      >
        <nav className="px-4 overflow-hidden bg-white dark:bg-darkBlue dark:text-white flex  items-center py-3 lg:px-32 sm:px-4  gap-2">
          <div className="text-lg md:text-xl basis-2/4 md:basis-1/4">
            Cool <span className="text-xl md:text-2xl font-bold">Blog</span>
          </div>
          <div className="flex items-center basis-2/4 md:basis-3/4 ">
            <ul
              className={`hidden md:flex basis-3/4  gap-3  items-center justify-center `}
            >
              <li>
                <Link to={"/"}>HOME</Link>
              </li>
              <li>
                <Link to={"/blogs"}>BLOGS</Link>
              </li>
              <li>
                <Link to={"/about"}>ABOUT</Link>
              </li>
              <li>
                <Link to={"/authors"}>ALL AUTHORS</Link>
              </li>
            </ul>
            <div className="flex items-center justify-end basis-2/4 gap-2 ">
              <button
                className="text-md md:text-xl rounded-full border-2 border-black  px-2 py-1 dark:border-white"
                onClick={() => {
                  mode === "dark"
                    ? dispatch(setMode("light"))
                    : dispatch(setMode("dark"));
                }}
              >
                {mode === "dark" ? <CiLight /> : <MdDarkMode />}
              </button>
              {isAuthenticated && user?.role === "Author" ? (
                <Link
                  to={"/dashboard"}
                  className="text-sm md:text-md bg-blue-600 rounded-xl px-3 py-1 "
                >
                  Dashboard
                </Link>
              ) : null}
              {isAuthenticated ? (
                <button
                  className="text-sm md:text-md bg-red-500 rounded-xl px-3 py-1 "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="text-md bg-green-500 rounded-xl px-3 py-1 "
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <RxHamburgerMenu
            className="text-2xl cursor-pointer  md:hidden"
            onClick={() => setShow(!show)}
          />
        </nav>
        <ul
          className={`${
            show ? "flex" : "hidden"
          }  md:hidden basis-3/4 bg-gray-400 gap-3 items-center justify-center dark:bg-gray-900 dark:text-white py-2  transition-all duration-300 ease-in-out`}
        >
          <li>
            <Link to={"/"} onClick={()=>setShow(!show)}>HOME</Link>
          </li>
          <li>
            <Link to={"/blogs"} onClick={()=>setShow(!show)}>BLOGS</Link>
          </li>
          <li>
            <Link to={"/about"} onClick={()=>setShow(!show)}>ABOUT</Link>
          </li>
          <li>
            <Link to={"/authors"} onClick={()=>setShow(!show)}>ALL AUTHORS</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
