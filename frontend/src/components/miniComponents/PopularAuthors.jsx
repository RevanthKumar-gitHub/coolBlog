import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../config/axios";
import { BeatLoader } from "react-spinners";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const fetchAuthors = async () => {
    try {
      const { data } = await axios.get("users/authors");
      if (data.success) {
        setAuthors(data.authors);
      }
    } catch (error) {
      setAuthors([]);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchAuthors();
  }, []);
  return (
    <div className="dark:bg-gray-800 dark:text-white lg:px-32 py-8 px-4 md:px-8">
      <h3 className="text-2xl font-bold">Popular Authors</h3>
      <div className=" flex  justify-around py-4">
        {authors && authors.length > 0 ? (
          authors.slice(0, 3).map((author) => {
            return (
              <div key={author.user_id} className=" cursor-pointer h-32 w-36 md:h-52 md:w-48">
                <div className="flex flex-col gap-3 justify-center items-center ">
                  <img src={author.avatar_url} alt="" className=" h-24 w-24 md:h-48 md:w-48 object-cover rounded-full border-black dark:border-white overflow-hidden border-4" />
                  <div className="text-lg capitalize md:text-xl text-center">{author.name}</div>
                </div>
              </div>
            );
          })
        ) : (
          <BeatLoader size={30} />
        )}
      </div>
    </div>
  );
};

export default PopularAuthors;
