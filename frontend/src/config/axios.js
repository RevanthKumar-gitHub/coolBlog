import axios from "axios";

const instance = axios.create({
  baseURL: "https://cool-blog-server.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default instance;
