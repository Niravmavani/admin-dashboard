import React, { useEffect, useState } from "react";
import SideNav from "../Side_nav/Side_nav";
import { useRouter } from "next/router";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const EditProductDetails = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonloading, setButtonLoading] = useState(false);

  const { productId } = router.query;

  const [product, setProduct] = useState({
    image: "",
    productName: "",
    type: "",
  });

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  async function fetchProductDetails(id) {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://farmer-api-9a00.onrender.com/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      console.log("response", response);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      setButtonLoading(true);
      const response = await axios.patch(
        `https://farmer-api-9a00.onrender.com/products/${productId}`,
        { productName: product.productName, type: product.type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setButtonLoading(false);

      router.push("/dashboard");
      console.log(response);
      toast.success("Product Updated");
    } catch (error) {
      setButtonLoading(false);

      console.log(error);
      toast.error(error.message);
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
          Edit Product
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
                  <label htmlFor="">Product Image</label>
                  <img
                    src={product.image}
                    width="170px"
                    alt=""
                    name="image"
                    className="h-28 w-28 object-cover pb-3 pt-3"
                  />
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    id="name"
                    value={product.productName}
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-blue-600 mb-3"
                    onChange={handleChange}
                  />
                  <label htmlFor="type">Product Type</label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={product.type}
                    className="w-full border border-slate-300 rounded-md py-1 px-4 sm:py-2 sm:px-4 md:py-2 md:px-4 lg:py-2 lg:px-4 mt-3 focus:outline-blue-600 mb-3"
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

export default EditProductDetails;
