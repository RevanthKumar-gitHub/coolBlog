import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { setIsAuthenticated } from "../../store/slices/appSlice";

const Login = () => {
  const { mode, isAuthenticated } = useSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", formData);
      setFormData({
        email: "",
        password: "",
        role: "",
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
        <h1 className="text-2xl font-bold ">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col" id="login">
          <label htmlFor="role" className="text-lg">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="outline-none bg-transparent border-black border-2 px-2 py-1 dark:border-white rounded-xl my-1"
          />
          <br />

          <input
            type="submit"
            value="Login"
            className="bg-green-500 py-2 rounded-xl cursor-pointer text-xl"
          />
          <Link className="my-2" to={"/register"}>
            New to CoolBlog? Register here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
