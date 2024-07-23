import axios from "axios";
import Side_nav from "../Side_nav/Side_nav";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";

const AddProduct = () => {
  const router = useRouter();
  const [pname, setPname] = useState("");
  const [ptype, setPtype] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });

  async function productAdd(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/products",
        {
          image:
            "https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          productName: pname,
          type: ptype,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <Side_nav />
      <div
        data-aos="fade-left"
        className="bg-gray-100 h-screen ml-[75px] md:ml-[180px] w-full overflow-x-hidden"
      >
        <div className="sm:ml-6 pl-5 sm:pl-0 md:pl-6 pt-5 sm:text-xl text-sm md:text-2xl lg:text-2xl">
          Add Product
        </div>

        <div className="sm:p-5 p-0 grid justify-center">
          <div className="rounded-md  bg-white w-full">
            <div className="pb-5 sm:pb-8 border rounded-md p-2 sm:p-10 md:p-10 lg:p-10 shadow-lg lg:w-[670px] md:w-[500px] sm:w-[570px] w-[210px]">
              <form onSubmit={productAdd}>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  // onChange={(e) => setPimage(e.target.files[0])}
                />
                <label htmlFor="productname">Product Name</label>
                <input
                  type="text"
                  name="productname"
                  id="productname"
                  placeholder="Enter Product Name"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setPname(e.target.value)}
                />
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  placeholder="Enter Type"
                  className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                  onChange={(e) => setPtype(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700 flex justify-center items-center"
                  disabled={loading}
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

export default AddProduct;
