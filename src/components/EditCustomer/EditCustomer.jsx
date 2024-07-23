import React, { useEffect, useState } from "react";
import SideNav from "../Side_nav/Side_nav";
import { useRouter } from "next/router";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const EditCustomer = () => {
  const router = useRouter();
  const customerId = router.query.index;

  const [loading, setLoading] = useState(false);
  const [buttonloading, setButtonLoading] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    village: "",
    gender: "",
    username: "",
    image: "",
    email: "",
    remarks: "",
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (customerId) {
      fetchProductDetails(customerId);
    }
  }, [customerId]);

  async function fetchProductDetails(id) {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://farmer-api-9a00.onrender.com/customers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
      setCustomer(response?.data);
    } catch (error) {
      console.log(error?.data?.message);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      setButtonLoading(true);
      const response = await axios.patch(
        `https://farmer-api-9a00.onrender.com/customers/${customerId}`,
        {
          name: customer.name,
          phone: customer.phone,
          village: customer.village,
          gender: customer.gender,
          username: customer.username,
          email: customer.email,
          remarks: customer.remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setButtonLoading(false);

      router.push("/customer");
      console.log(response);
      toast.success(response?.data?.message);
    } catch (error) {
      setButtonLoading(false);
      console.log(error);
      toast.error(error?.message);
    }
  }
  return (
    <div className="flex">
      <SideNav />
      <div
        data-aos="fade-left"
        className="bg-gray-100 ml-[75px]  min-h-screen  md:ml-[180px]  w-full overflow-x-hidden"
      >
        <div className="text-md font-bold text-gray-800 sm:ml-6 pl-5 sm:pl-0 md:pl-6  pt-5  sm:text-xl text-md md:text-2xl lg:text-2xl">
          Edit Farmer
        </div>
        {loading ? (
          <div className="flex justify-center pt-4">
            <TailSpin color="#4486f3" height="70px" width="70px" />
          </div>
        ) : (
          <div className=" sm:p-5 p-0  grid justify-center items-center">
            <div className="rounded-md  bg-white  w-full ">
              <div className="pb-5 sm:pb-8  border rounded-md p-2 sm:p-10 md:p-10 lg:p-10 shadow-lg lg:w-[670px] md:w-[500px] sm:w-[570px] w-[210px] ">
                <form onSubmit={handleFormSubmit}>
                  <label htmlFor="image">Image</label>
                  <img
                    src={customer.image}
                    width="170px"
                    alt=""
                    name="image"
                    className="h-28 w-28 object-cover pb-3 pt-3"
                  />
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={customer.name}
                    placeholder="Enter Product Name"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={customer.phone}
                    placeholder="Enter Phone Number"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="village">Village</label>
                  <input
                    type="text"
                    name="village"
                    id="village"
                    value={customer.village}
                    placeholder="Enter Village"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={customer.gender}
                    placeholder="Enter Gender"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={customer.username}
                    placeholder="Enter Username"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={customer.email}
                    placeholder="Enter Email"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="email">Remarks</label>
                  <input
                    type="text"
                    name="remarks"
                    id="remarks"
                    value={customer.remarks}
                    placeholder="Enter Remarks"
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700"
                  >
                    {buttonloading ? (
                      <TailSpin height="24" width="24" color="white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCustomer;
