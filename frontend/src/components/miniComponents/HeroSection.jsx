import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const HeroSection = () => {
  const { blogs } = useSelector((state) => state.app);
  return (
    <section className="dark:bg-gray-800 dark:text-white min-h-fit  overflow-hidden px-4 lg:px-32 py-8 flex gap-4 justify-center">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 2).map((blog) => {
          return (
            <Link
              to={`/blog/${blog.blog_id}`}
              key={blog.blog_id}
              className="relative overflow-hidden  text-white  hover:scale-105 transition-all duration-300 ease-out cursor-pointer basis-2/4"
            >
              <div className="">
                <img
                  src={blog.main_image_url}
                  alt="main_image_url"
                  className="h-96 w-full object-cover overflow-hidden rounded-xl"
                />
              </div>
              <div className="absolute bottom-0 left-0 flex flex-col  w-fit md:px-4 px-2 bg-opacity-20 rounded-xl">
                <div className="py-2">
                  <span className=" uppercase text-xl md:text-2xl font-bold">
                    {blog.title}
                  </span>
                </div>
                <div className="flex items-center justify-start py-4 gap-2 ">
                  <img
                    src={blog.author_avatar}
                    alt="user_avatar"
                    className="h-8 md:h-10 rounded-full overflow-hidden object-cover w-8 md:w-10"
                  />
                  <div className="text-lg md:text-xl capitalize">
                    {blog.author_name}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <BeatLoader size={30} />
      )}
    </section>
  );
};

export default HeroSection;
