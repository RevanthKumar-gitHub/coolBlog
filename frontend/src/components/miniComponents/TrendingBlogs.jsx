import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const TrendingBlogs = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const { blogs, mode } = useSelector((state) => state.app);
  return (
    <div className="dark:bg-gray-800 dark:text-white lg:px-32 md:px-8 py-2 px-4">
      <h3 className="text-2xl font-bold">Trending</h3>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((blog) => {
            return (
              <div
                key={blog.blog_id}
                className="h-52 m-2 overflow-hidden relative py-2"
              >
                <Link to={`/blog/${blog.blog_id}`}>
                  <img
                    src={blog.main_image_url}
                    alt=""
                    className="h-full w-full overflow-hidden rounded-xl object-cover "
                  />
                  <div className="px-4 py-4 absolute bottom-0 left-0 w-full flex flex-col gap-1">
                    <div className="text-lg md:text-xl w-fit uppercase bg-blue-500 rounded-xl py-1 px-2 text-white font-bold">
                      {blog.category}
                    </div>
                    <div className=" capitalize  font-semibold text-white text-lg  md:text-xl">
                      {blog.title}
                    </div>
                    <div className="flex gap-2 items-center text-white">
                      <img src={blog.author_avatar} className="h-8 w-8 rounded-full"/>        
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
      </Carousel>
    </div>
  );
};
export default TrendingBlogs;
