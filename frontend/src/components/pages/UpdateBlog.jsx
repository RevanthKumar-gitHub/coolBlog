import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setBlogsUpdated } from "../../store/slices/appSlice";
import { useParams } from "react-router-dom";

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: "",
    intro: "",
    category: "",
    para_one_title: "",
    para_one_desc: "",
    para_two_title: "",
    para_two_desc: "",
    main_image: "",
    para_one_image: null,
    para_two_image: null,
    publish: false,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    main_image_preview: "",
    para_one_image_preview: "",
    para_two_image_preview: "",
  });

  const mainImageLoader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogData({ ...blogData, main_image: file });
      setImagePreview({ ...imagePreview, main_image_preview: reader.result });
    };
  };

  const paraOneImageLoader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogData({ ...blogData, para_one_image: file });
      setImagePreview({
        ...imagePreview,
        para_one_image_preview: reader.result,
      });
    };
  };

  const paraTwoImageLoader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogData({ ...blogData, para_two_image: file });
      setImagePreview({
        ...imagePreview,
        para_two_image_preview: reader.result,
      });
    };
  };



  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/blogs/blog/${id}`);
      if (data.success) {
        setBlogData({
          title: data.blog.title,
          intro: data.blog.intro,
          category: data.blog.category,
          para_one_title: data.blog.para_one_title || "",
          para_one_desc: data.blog.para_one_desc || "",
          para_two_title: data.blog.para_two_title || "",
          para_two_desc: data.blog.para_two_desc || "",
          main_image: data.blog.main_image_url,
          para_one_image: data.blog.para_one_image_url || "",
          para_two_image: data.blog.para_two_image_url || "",
          publish: data.blog.publish,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("intro", blogData.intro);
    formData.append("category", blogData.category);
    formData.append("publish", blogData.publish);
    formData.append("main_image", blogData.main_image);
    if (blogData.para_one_image) {
      formData.append("para_one_image", blogData.para_one_image);
    }
    if (blogData.para_one_desc.length > 0) {
      formData.append("para_one_desc", blogData.para_one_desc);
    }
    if (blogData.para_one_title.length > 0) {
      formData.append("para_one_title", blogData.para_one_title);
    }
    if (blogData.para_two_image) {
      formData.append("para_two_image", blogData.para_two_image);
    }
    if (blogData.para_two_desc.length > 0) {
      formData.append("para_two_desc", blogData.para_two_desc);
    }
    if (blogData.para_two_title.length > 0) {
      formData.append("para_two_title", blogData.para_two_title);
    }

    try {
      setLoading(true);
      const { data } = await axios.put(`blogs/updateBlog/${id}`, formData);
      if (data.success) {
        dispatch(setBlogsUpdated());
        toast.success(data.message);

      }
      setBlogData({
        title: "",
        intro: "",
        category: "",
        para_one_title: "",
        para_one_desc: "",
        para_two_title: "",
        para_two_desc: "",
        main_image: "",
        para_one_image: null,
        para_two_image: null,
        publish: false,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <BeatLoader size={30} />;
  }
  return (
    <div className="py-4 dark:bg-gray-800 dark:text-white px-2">
      <h1 className="text-2xl uppercase font-bold">Create Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center px-4 "
      >
        <label htmlFor="title" className="text-xl capitalize py-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={blogData.title}
          onChange={(e) => {
            setBlogData({ ...blogData, title: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1 w-full"
        />
        <br />
        <label htmlFor="intro" className="text-xl capitalize py-1">
          Introduction
        </label>
        <textarea
          id="intro"
          rows={10}
          cols={40}
          value={blogData.intro}
          onChange={(e) => {
            setBlogData({ ...blogData, intro: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1 h-fit"
        />
        <br />
        <label htmlFor="category" className="text-xl capitalize py-1">
          Category
        </label>
        <select
          type="text"
          id="category"
          value={blogData.category}
          onChange={(e) => {
            setBlogData({ ...blogData, category: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1"
        >
          <option value="" className="text-black">
            SELECT CATEGORY
          </option>
          <option value="lifeStyle" className="text-black">
            LIFESTYLE
          </option>
          <option value="technology" className="text-black">
            TECHNOLOGY
          </option>
          <option value="sports" className="text-black">
            SPORTS
          </option>
          <option value="bussiness" className="text-black">
            BUSSINESS
          </option>
          <option value="economy" className="text-black">
            ECONOMY
          </option>
          <option value="travel" className="text-black">
            TRAVEL
          </option>
        </select>
        <br />
        {imagePreview.main_image_preview ? (
          <img
            src={imagePreview.main_image_preview}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : blogData.main_image ? (
          <img
            src={blogData.main_image}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : null}
        <label htmlFor="mainImage" className="text-xl capitalize py-1">
          Main Image
        </label>
        <label
          htmlFor="mainImage"
          className="bg-blue-600 w-40 text-center rounded-full"
        >
          UPLOAD IMAGE
        </label>
        <input
          type="file"
          id="mainImage"
          onChange={mainImageLoader}
          className="hidden"
        />
        <br />
        <label htmlFor="paraOneTitle" className="text-xl capitalize py-1">
          ParaOneTitle
        </label>
        <input
          type="text"
          id="paraOneTitle"
          value={blogData.para_one_title}
          onChange={(e) => {
            setBlogData({ ...blogData, para_one_title: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1"
        />
        <br />
        <label htmlFor="paraOneDesc" className="text-xl capitalize py-1">
          ParaOneDescription
        </label>
        <textarea
          id="paraOneDesc"
          rows={10}
          cols={40}
          value={blogData.para_one_desc}
          onChange={(e) => {
            setBlogData({ ...blogData, para_one_desc: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1 h-fit"
        />
        <br />
        {imagePreview.para_one_image_preview ? (
          <img
            src={imagePreview.para_one_image_preview}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : blogData.para_one_image ? (
          <img
            src={blogData.para_one_image}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : (
          ""
        )}
        <label htmlFor="paraOneImage" className="text-xl capitalize py-1">
          ParaOneImage
        </label>
        <label
          htmlFor="paraOneImage"
          className="bg-blue-600 w-40 text-center rounded-full"
        >
          UPLOAD IMAGE
        </label>
        <input
          type="file"
          id="paraOneImage"
          onChange={paraOneImageLoader}
          className="hidden"
        />
        <br />
        <label htmlFor="paraTwoTitle" className="text-xl capitalize py-1">
          ParaTwoTitle
        </label>
        <input
          type="text"
          id="paraTwoTitle"
          value={blogData.para_two_title}
          onChange={(e) => {
            setBlogData({ ...blogData, para_two_title: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1"
        />
        <br />
        <label htmlFor="paraTwoDesc" className="text-xl capitalize py-1">
          ParaTwoDescription
        </label>
        <textarea
          id="paraTwoDesc"
          rows={10}
          cols={40}
          value={blogData.para_two_desc}
          onChange={(e) => {
            setBlogData({ ...blogData, para_two_desc: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1 h-fit"
        />
        <br />
        {imagePreview.para_two_image_preview ? (
          <img
            src={imagePreview.para_two_image_preview}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : blogData.para_two_image ? (
          <img
            src={blogData.para_two_image}
            className="h-80 rounded-xl overflow-hidden object-cover"
          />
        ) : (
          ""
        )}
        <label htmlFor="paraTwoImage" className="text-xl capitalize py-1">
          ParaTwoImage
        </label>
        <label
          htmlFor="paraTwoImage"
          className="bg-blue-600 w-40 text-center rounded-full"
        >
          UPLOAD IMAGE
        </label>
        <input
          type="file"
          id="paraTwoImage"
          onChange={paraTwoImageLoader}
          className="hidden"
        />
        <br />
        <label htmlFor="publish" className="text-xl capitalize py-1">
          Publish
        </label>
        <select
          type="text"
          id="publish"
          value={blogData.publish}
          onChange={(e) => {
            setBlogData({ ...blogData, publish: e.target.value });
          }}
          className="outline-none border-black  border-b-2 bg-transparent px-2 py-1"
        >
          <option value="true" className="text-black">
            YES
          </option>
          <option value="false" className="text-black">
            NO
          </option>
        </select>
        <br />
        <input
          type="submit"
          value={"UPDATE BLOG"}
          className="bg-green-600 rounded-md py-1"
        />
      </form>
    </div>
  );
};

export default UpdateBlog;
