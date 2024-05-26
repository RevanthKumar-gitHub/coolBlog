import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import toast from "react-hot-toast";
import {} from "react-spinners";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/blogs/myBlogs");
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      setBlogs([]);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/blogs/deleteBlog/${id}`);
      if (data.success) {
        toast.success(data.message);
        setBlogs((prev) => prev.filter((blog) => blog.blog_id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="dark:text-white dark:bg-gray-800 px-8 py-4 md:px-2">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4 ">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => {
            return (
              <div
                key={blog.blog_id}
                className="flex flex-col justify-between w-full gap-1 border-black border-2 rounded-xl overflow-hidden dark:border-white"
              >
                <div className="flex relative basis-3/4">
                  <img
                    src={blog.main_image_url}
                    className=" object-cover  h-64 w-full "
                  />
                  <div className="absolute bottom-0 left-0 px-4 py-2 text-white">
                    <div className="text-xl uppercase  bg-blue-600 px-2 rounded-lg w-fit">
                      {blog.category}
                    </div>
                    <div className="text-xl capitalize">{blog.title}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center basis-1/4 gap-1">
                  <Link
                    to={`/blog/update/${blog.blog_id}`}
                    className="bg-green-600 w-full text-center  "
                  >
                    UPDATE BLOG
                  </Link>
                  <button
                    className="bg-red-600 w-full text-center "
                    onClick={() => handleDelete(blog.blog_id)}
                  >
                    DELETE BLOG
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-screen text-center text-xl overflow-hidden px-4 text-green-500 ">
            No blogs Found! Create Blogs to Explore
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
