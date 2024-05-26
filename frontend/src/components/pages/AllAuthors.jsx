import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../../config/axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
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
      <h3 className="text-2xl font-bold">All Authors</h3>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  py-4 gap-4">
        {authors && authors.length > 0 ? (
          authors.map((author) => {
            return (
              <div key={author.user_id} className=" cursor-pointer ">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <img
                    src={author.avatar_url}
                    alt=""
                    className=" h-56 w-full object-cover rounded-2xl border-black dark:border-white overflow-hidden border-4"
                  />
                  <div className="text-xl">{author.name}</div>
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

export default AllAuthors;
