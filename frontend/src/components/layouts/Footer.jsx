import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const { mode } = useSelector((state) => state.app);
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  return (
    <div className="shadow">
      <section
        className={`${
          isDashboard.pathname === "/dashboard"
            ? "hidden"
            : mode === "dark"
            ? "dark"
            : "light"
        } `}
      >
        <div className="flex flex-col md:flex-row dark:bg-black dark:text-white justify-center px-4 lg:px-32 py-4 gap-2">
          <div className="basis-1/4 flex flex-col gap-2">
            <div className="text-2xl font-bold">About</div>
            <p className="dark:text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              nisi a obcaecati libero consequatur ad iure, quas nulla commodi
              ipsam?
            </p>
            <div className="dark:text-gray-300">Email : reva1812@gmail.com</div>
            <div className="dark:text-gray-300">Phone : 9876543210</div>
          </div>
          <div className="basis-1/4 flex flex-col gap-2">
            <div className="text-2xl font-bold">Quick Links</div>
            <ul className="flex flex-col gap-2 dark:text-gray-300">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/blogs"}>Blogs</Link>
              </li>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className="basis-1/4 flex flex-col gap-2">
            <div className="text-2xl font-bold">Categories</div>
            <ul className="flex flex-col gap-2 dark:text-gray-300">
              <li>LifeStyle</li>
              <li>Technology</li>
              <li>Sports</li>
              <li>Travel</li>
              <li>Bussiness</li>
              <li>Economy</li>
            </ul>
          </div>
          <div className="basis-1/4 flex items-center flex-col bg-blue-100 dark:bg-gray-800 rounded-md py-4 gap-2 px-4 justify-center">
            <div className="text-lg lg:text-2xl font-bold">Weekly News-Letter</div>
            <div className="lg:text-sm  text-xs dark:text-gray-300">
              Get blog articles and offer via email
            </div>
            <form className="flex gap-2 flex-col">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-200 px-2 rounded-xl py-1 outline-none text-black"
              />
              <button
                type="submit"
                className="bg-blue-600 px-2 py-1 rounded-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="dark:bg-black py-2">
          <div className="h-[0.2px] bg-black mx-4 dark:bg-white"></div>
          <div className="dark:text-white px-8 lg:px-32 my-2 py-2 flex items-center justify-between ">
            <div className="text-xl">
              Cool <span className="text-2xl font-bold">Blog</span>
            </div>
            <ul className="flex gap-2 text-xl dark:text-gray-400">
              <li>
                <a href="#">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="#">
                  <FaFacebook />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
