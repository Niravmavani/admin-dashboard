import React, { useEffect, useState } from "react";
import axios from "axios";
import Side_nav from "../Side_nav/Side_nav";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import AOS from "aos";
import "aos/dist/aos.css";

const AddFarmer = () => {
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  //   const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });

  async function farmerAdd(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/farmers",
        {
          name: fname,
          phone: phone,
          village: village,
          gender: gender,
          username: username,
          image:
            "https://plus.unsplash.com/premium_photo-1681910744572-9cdafef78a58?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      setLoading(false);
      router.push("/farmer");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.data?.message);
    }
  }
  return (
    <div className="flex">
      <Side_nav />
      <div
        data-aos="fade-left"
        className="bg-gray-100 ml-[75px] md:ml-[180px] w-full overflow-x-hidden"
      >
        <div className="sm:ml-6 pl-5 sm:pl-0 md:pl-6 pt-5 sm:text-xl text-sm md:text-2xl lg:text-2xl">
          Add Farmer
        </div>

        <div className="sm:p-5 p-0 grid justify-center">
          <div className="rounded-md  bg-white  w-full">
            <div className="pb-5 sm:pb-8 border rounded-md p-2 sm:p-10 md:p-10 lg:p-10 shadow-lg lg:w-[670px] md:w-[500px] sm:w-[570px] w-[210px]">
              <form onSubmit={farmerAdd}>
                <label htmlFor="farmername">Farmer Name</label>
                <input
                  type="text"
                  name="farmername"
                  id="farmername"
                  placeholder="Enter Product Name"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setFname(e.target.value)}
                />
                <label htmlFor="number">Phone Number</label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="Enter Phone Number"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="village">Village</label>
                <input
                  type="text"
                  name="village"
                  id="village"
                  placeholder="Enter Village"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setVillage(e.target.value)}
                />
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="Enter Gender"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Username"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="image">Farmer Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  //   onChange={(e) => setImage(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700"
                >
                  {loading ? (
                    <TailSpin height="24" width="24" color="white" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFarmer;
