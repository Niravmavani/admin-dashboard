import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPaginate from "react-paginate";

const Product_page = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  const toEdit = (id) => {
    router.push(`/editproductdetails/${id}`);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://farmer-api-9a00.onrender.com/products?page=${
            currentPage + 1
          }&limit=${itemsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLoading(false);
        console.log("response", response);
        setProducts(response?.data?.items);
        setTotalPages(response?.data?.totalPages);
        setCurrentPage(response?.data?.currentPageNumber - 1);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [currentPage]);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `https://farmer-api-9a00.onrender.com/products/${productToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDelete)
      );
      setDeleteLoading(false);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log("Error deleting product:", error);
      setDeleteLoading(false);
    } finally {
      setShowModal(false);
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowModal(true);
  };

  const productDetail = (item) => {
    setShowDataModal(true);
    setSelectedProduct(item);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div
        className="md:ml-[199px] ml-20  p-5  w-full overflow-x-hidden"
        data-aos="fade-left"
      >
        <div className="flex items-center justify-between">
          <div className="list md:pl-5 sm:text-xl text-md md:text-2xl lg:text-2xl font-bold text-gray-800">
            Product List
          </div>
          <div className="">
            <Link
              href="/addproduct"
              className="add  md:mr-5 transition duration-600 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black hover:outline hover:outline-purple-600 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm md:text-lg py-2 px-4 rounded-lg shadow-md "
            >
              Add Product
            </Link>
          </div>
        </div>
        <div className=" flex justify-center mt-4">
          <div className="rounded-md m-5 bg-white shadow-lg sm:p-5 p-3 w-full overflow-x-auto">
            {loading ? (
              <div className="flex justify-center pt-4">
                <TailSpin
                  color="#4486f3"
                  radius={"8px"}
                  height="70px"
                  width="70px"
                />
              </div>
            ) : (
              <table className="w-full rtl:text-right whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-600 uppercase ">
                  <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                    <th className="py-2 px-3 text-start w-[170px]">Image</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Type</th>
                    <th className="py-2 px-3 text-end w-[200px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products?.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-1 flex justify-start transition-all duration-300 ease-in-out transform hover:scale-105">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="h-16 w-16 object-cover rounded-full shadow-md "
                        />
                      </td>
                      <td className="py-2 px-1 text-center">
                        {product.productName}
                      </td>
                      <td className="py-2 px-1 text-center">{product.type}</td>
                      <td className="py-2 px-1 ">
                        <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                          <BiShowAlt
                            className="h-6 w-6 text-purple-500"
                            cursor="pointer"
                            onClick={() => productDetail(product)}
                          />
                          <FaRegEdit
                            className="h-5 w-6 text-blue-500"
                            onClick={() => toEdit(product._id)}
                            cursor="pointer"
                          />
                          <MdDelete
                            className="h-5 w-6 text-red-500"
                            onClick={() => confirmDelete(product._id)}
                            cursor="pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="pagination mt-3 flex justify-end items-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={
                  "flex flex-wrap justify-center items-center space-x-2 text-gray-700"
                }
                activeClassName={
                  "bg-blue-500 text-white border border-blue-500 rounded px-4 py-2 hover:bg-gray-100 hover:text-black"
                }
                previousClassName={
                  "bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                }
                nextClassName={
                  "bg-white border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                }
                disabledClassName={" cursor-not-allowed"}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            data-aos="zoom-in-up"
            className="deletebox bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className=" bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className=" bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                {deleteloading ? (
                  <TailSpin height="24" width="24" color="white" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showDataModal && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50  ">
          <div
            data-aos="flip-left"
            className="box sm:w-auto bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 font-serif">Detail</h2>
              <IoClose
                onClick={() => setShowDataModal(false)}
                className="rounded-md h-5 w-5 cursor-pointer"
              />
            </div>
            <img
              src={selectedProduct?.image}
              alt=""
              className="rounded-xl h-60 w-60 object-cover"
            />
            <p className="text-lg pt-3 font-bold font-serif">
              Name : {selectedProduct?.productName}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Type : {selectedProduct?.type}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_page;
