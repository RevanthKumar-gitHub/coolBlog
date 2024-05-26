import React from "react";
import { useSelector } from "react-redux";
import LatestBlog from "../miniComponents/LatestBlog";
const Blogs = () => {
  const { blogs } = useSelector((state) => state.app);
  return (
    <div className="dark:bg-gary-800 dark:text-white">
      <LatestBlog blogs={blogs} title={"Blogs"} />
    </div>
  );
};

export default Blogs;
