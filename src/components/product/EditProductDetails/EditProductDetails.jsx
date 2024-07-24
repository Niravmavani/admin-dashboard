import React, { useEffect, useState } from "react";
import SideNav from "../../SideNav/Side_nav";
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
  const [Pimage, setPimage] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgloading, setimgLoading] = useState(false);
  const { productId } = router.query;

  const [product, setProduct] = useState({
    image: "",
    productName: "",
    type: "",
  });

  const upload = async (e) => {
    setimgLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
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
      setProduct(response?.data);
      setImgPreview(response?.data?.image);
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
        { productName: product.productName, type: product.type, image: Pimage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setButtonLoading(false);

      router.push("/product");
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
                    className="bg-blue-500 w-24 py-2 px-3 rounded-md text-white hover:bg-blue-700 flex justify-center items-center"
                    disabled={loading}
                  >
                    {buttonloading ? (
                      <TailSpin height="25" width="25" color="white" />
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
