import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "../../config/axios";
import { Navigate, useParams } from "react-router-dom";
const SingleBlog = () => {
  const { isAuthenticated } = useSelector((state) => state.app);
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`/blogs/blog/${id}`);
      if (data.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      setBlog({});
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="dark:bg-gray-800 dark:text-white px-4 md:px-8 lg:px-32 py-10">
      {blog && (
        <div className="flex flex-col gap-4 py-4">
          <div className="text-2xl uppercase  bg-blue-600 w-fit px-4 rounded-full">
            {blog.category}
          </div>
          <div className="flex items-center gap-4">
            <img
              src={blog.author_avatar}
              alt=""
              className="h-16 w-16 rounded-full"
            />
            <div className="text-xl font-semibold">{blog.author_name}</div>
          </div>
          <div className="text-2xl capitalize font-semibold ">{blog.title}</div>
          {blog && blog.main_image_url && (
            <img
              src={blog.main_image_url}
              className="h-[60vh] md:h-[65vh] lg:h-[80vh] object-cover rounded-xl"
            />
          )}
          <p className="text-lg py-2">{blog.intro}</p>
          {blog && blog.para_one_title && (
            <div className="text-2xl capitalize font-semibold ">
              {blog.para_one_title}
            </div>
          )}
          {blog && blog.para_one_image_url && (
            <img
              src={blog.para_one_image_url}
              className="h-[80vh] object-cover rounded-xl"
            />
          )}
          {blog && blog.para_one_desc && (
            <p className="text-lg py-2">{blog.para_one_desc}</p>
          )}
          {blog && blog.para_two_title && (
            <div className="text-2xl capitalize font-semibold ">
              {blog.para_two_title}
            </div>
          )}
          {blog && blog.para_two_image_url && (
            <img
              src={blog.para_two_image_url}
              className="h-[80vh] object-cover rounded-xl"
            />
          )}
          {blog && blog.para_two_desc && <div>{blog.para_two_desc}</div>}
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
