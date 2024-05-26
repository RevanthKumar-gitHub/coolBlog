import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const [userData, setUserData] = useState({});
  const fetchUser = async () => {
    try {
      const {data} = await axios.get("/users/profile");
      if(data.success)
      {
        setUserData(data.user);
      }
    } catch (error) {
      setUserData({});
      toast.error(error.response.data.message);
    }
  };
  useEffect(()=>{
    fetchUser();
  },[])
  return <div className="dark:bg-gray-800 dark:text-white flex flex-col md:flex-row items-center min-h-screen justify-center gap-5">
    <div >
      <img src={userData.avatar_url} alt="" className=" h-52 w-52 rounded-xl overflow-hidden object-cover"/>
    </div>
    <ul className="text-xl font-bold">
      <li >Name : <span className="capitalize">{userData.name}</span></li>
      <li>Email : <span>{userData.email}</span></li>
      <li>Phone Number : <span>{userData.phone}</span></li>
      <li>Role : <span>{userData.role}</span></li>
    </ul>
  </div>;
};

export default MyProfile;
