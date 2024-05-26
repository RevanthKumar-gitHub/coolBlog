import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { setIsAuthenticated } from "../../store/slices/appSlice";
const Signup = () => {
  const { mode, isAuthenticated } = useSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    avatar: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setData({ ...data, avatar: file });
      setAvatarPreview(reader.result);
    };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar);
    try {
      setLoading(true);
      const { data } = await axios.post("/users/register", formData);
      setData({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        avatar: "",
      });
      toast.success(data.message);
      setLoading(false);
      dispatch(setIsAuthenticated(true));
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  if (loading) {
    return (
      <div className="dark:bg-gray-800 flex justify-center items-center">
        <BeatLoader size={40} />
      </div>
    );
  }
  return (
    <div className={`${mode === "dark" ? "dark" : "light"}`}>
      <div className="dark:bg-gray-800 px-32 justify-center flex dark:text-white py-8 flex-col items-center">
        <h1 className="text-2xl font-bold ">Signup</h1>
        <form onSubmit={handleSubmit} className="flex flex-col" id="signup">
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />
          <label htmlFor="phone" className="text-lg">
            Phone Number
          </label>
          <input
            id="phone"
            type="phone"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />
          <label htmlFor="role" className="text-lg">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1 "
          >
            <option value="" className="text-black">
              SELECT ROLE
            </option>
            <option value="Reader" className="text-black">
              READER
            </option>
            <option value="Author" className="text-black">
              AUTHOR
            </option>
          </select>
          <br />
          <label htmlFor="avatar" className="text-lg">
            Profile Photo
          </label>
          <div className="flex items-center gap-2">
            <div className="flex border-black border-2   justify-center items-center p-2 rounded-full overflow-hidden dark:border-white my-1  h-14 w-14">
              {avatarPreview ? (
                <img src={avatarPreview} className="object-cover h-14 w-14" />
              ) : (
                <FaUser className="text-3xl" />
              )}
            </div>
            <label htmlFor="avatar" className="bg-blue-500 w-40 text-center py-2 rounded-full cursor-pointer">Upload Image</label>
            <input id="avatar" type="file" onChange={avatarHandler} className="hidden" />
          </div>
          <br />
          <input
            type="submit"
            value="Register"
            className="bg-green-500 py-2 rounded-xl cursor-pointer text-xl"
          />
          <Link className="my-2" to={"/login"}>
            Already CoolBlogger? Login here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
