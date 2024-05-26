import React from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const LatestBlog = ({blogs,title}) => {
  
  return (
    <div className="dark:bg-gray-800 dark:text-white lg:px-32 py-4 px-2 md:px-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 py-4  justify-center">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <div
                key={blog.blog_id}
                className=" h-72 m-2 overflow-hidden relative border-2 rounded-xl border-black dark:border-white"
              >
                <Link to={`/blog/${blog.blog_id}`}>
                  <img
                    src={blog.main_image_url}
                    alt=""
                    className="h-full w-full  object-cover "
                  />
                  <div className="px-2 md:px-4 py-4 absolute bottom-0 left-0 w-full flex flex-col gap-1">
                    <div className="text-md md:text-xl w-fit uppercase bg-blue-500 rounded-xl py-1 px-1 text-white font-bold">
                      {blog.category}
                    </div>
                    <div className="text-md capitalize  font-semibold text-white md:text-xl">
                      {blog.title}
                    </div>
                    <div className="flex gap-2 items-center text-white">
                      <img
                        src={blog.author_avatar}
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="text-md md:text-lg">{blog.author_name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <BeatLoader size={30} />
        )}
      </div>
    </div>
  );
};

export default LatestBlog;
