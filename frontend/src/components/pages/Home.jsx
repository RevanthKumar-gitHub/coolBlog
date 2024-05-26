import React from "react";
import { useSelector } from "react-redux";
import Herosection from "../miniComponents/HeroSection";
import TrendingBlogs from "../miniComponents/TrendingBlogs";
import LatestBlog from "../miniComponents/LatestBlog";
import PopularAuthors from "../miniComponents/PopularAuthors";

const Home = () => {
  const { mode, blogs } = useSelector((state) => state.app);

  return (
    <article className={`${mode === "dark" ? "dark" : "light"} `}>
      <Herosection />
      <TrendingBlogs />
      <LatestBlog blogs={blogs.slice(0, 4)} title={"Latest Blogs"} />
      <PopularAuthors />
    </article>
  );
};

export default Home;
