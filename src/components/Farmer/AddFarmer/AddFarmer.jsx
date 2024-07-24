import React, { useEffect, useState } from "react";
import axios from "axios";
import Side_nav from "../../SideNav/Side_nav";
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
  const [imgFile, setImgFile] = useState(null);
  const [Pimage, setPimage] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgloading, setimgLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });

  const upload = async (e) => {
    setimgLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      if (e.target.files[0]) {
        const response = await axios.post(
          "https://farmer-api-9a00.onrender.com/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (e.target.files.length > 0) {
          const fileType = e.target.files[0].type;
          const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

          if (!validImageTypes.includes(fileType)) {
            
            toast.error("Only JPG, JPEG, and PNG formats are allowed.");
            return;
          }

          setImgFile(e.target.files[0]);
          setImgPreview(URL.createObjectURL(e.target.files[0]));
          
        } else {
         
          setImgPreview(null);
        }
        setPimage(response?.data?.url);
      }
    } catch (error) {
      console.log(error);
    }
    setimgLoading(false);
  };

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
          image:Pimage,
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
                <label htmlFor="image">Image</label>
                <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                  <div className="relative">
                    {imgloading && (
                      <TailSpin height="25" width="25" color="black" />
                    )}
                    {imgPreview ? (
                      <>
                        <img
                          className="mt-3 h-40 w-40 rounded-full object-cover"
                          src={imgPreview}
                          alt="Current logo preview"
                        />
                        <div
                          onClick={() => {
                            setImgFile(null);
                            setImgPreview(null);
                          }}
                          className="absolute left-40 top-0 w-fit cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height={10}
                            width={10}
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 490 490"
                            xmlSpace="preserve"
                          >
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 flex w-full items-center justify-center">
                        <label
                          htmlFor="base-img"
                          className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>

                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              or drag and drop Image
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG
                            </p>
                          </div>
                          <input
                            id="base-img"
                            type={"file"}
                            className="hidden"
                            accept="image/*"
                            onChange={upload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
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
                  className="bg-blue-500 w-24 py-2 px-3 rounded-md text-white hover:bg-blue-700 flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <TailSpin height="25" width="25" color="white" />
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
