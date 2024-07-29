import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPaginate from "react-paginate";
import { productData, productDelete } from "@/services/product";
import ReactSwitch from "react-switch";
import { editProduct } from "@/services/product";
import Bigloader from "../Loader/bigloader";
import Miniloader from "../Loader/miniloader";
// import moment from "moment";

const Product_page = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();

  const toEdit = (id) => {
    router.push(`/product/edit/${id}`);
  };

  async function fetchProducts() {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await productData(
        token,
        currentPage,
        itemsPerPage,
        searchResult
      );
      setProducts(response?.data?.items);
      setTotalPages(response?.data?.totalPages);
      setCurrentPage(response?.data?.currentPageNumber - 1);
      // console.log(response?.data?.items);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
    setLoading(false);
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    fetchProducts();
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchResult);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchResult]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    setDeleteLoading(true);
    try {
      const response = await productDelete(token, productToDelete);
      if (response) {
        fetchProducts();
      }
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("Error deleting product:", error);
    } finally {
      setShowModal(false);
    }
    setDeleteLoading(false);
  };

  const searchProduct = async (value) => {
    setSearchResult(value);
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

  const updateStatus = async (product) => {
    const token = localStorage.getItem("token");
    setSwitchLoading(product._id);
    try {
      const payload = {
        status: !product.status,
      };
      const response = await editProduct(payload, token, product._id);
      if (response) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === product._id ? { ...p, status: payload.status } : p
          )
        );
      }
    } catch (error) {
      toast.error("Error updating product status:");
    }
    setSwitchLoading(null);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div
        className="md:ml-[199px] ml-20  p-5  w-full overflow-x-hidden"
        data-aos="fade-left"
      >
        <div className="flex items-center justify-between productHeader">
          <div className="list sm:text-xl text-md md:text-2xl lg:text-2xl font-bold text-gray-800">
            Product List
          </div>
          <div className="">
            <Link
              href="/product/add"
              className="add  md:mr-5 transition duration-600 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black hover:outline hover:outline-green-600 bg-gradient-to-br from-green-600 to-green-800 text-white text-sm md:text-lg py-2 px-4 rounded-lg shadow-md "
            >
              Add Product
            </Link>
          </div>
        </div>
        <div className=" flex justify-center mt-4">
          <div className="rounded-md m-5 bg-white shadow-lg sm:p-5 p-3 w-full overflow-x-auto">
            <div className="flex justify-end mb-5">
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearchSharp className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search Product"
                  onChange={(e) => searchProduct(e.target.value)}
                  className="border rounded-md p-2 pl-10 w-full outline-green-600"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center pt-4">
                <Bigloader />
              </div>
            ) : products.length !== 0 ? (
              <table className="w-full rtl:text-right whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-600 uppercase ">
                  <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                    <th className="py-2 px-3 text-start w-[170px]">Image</th>
                    <th className="py-2">Code</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Status</th>

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
                          className="h-16 w-16 object-cover rounded-lg shadow-md "
                        />
                      </td>
                      <td className="py-2 px-1 text-center">{product.code}</td>
                      <td className="py-2 px-1 text-center">
                        {product.productName}
                      </td>
                      <td className="py-2 px-1 text-center">{product.type}</td>
                      <td className="py-2 px-1 text-center w-[100px]">
                        <div className="flex space-x-2 justify-center items-center">
                          <ReactSwitch
                            checked={product.status}
                            onChange={() => updateStatus(product)}
                            offColor="#888"
                            onColor="#228B22"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={48}
                            className="react-switch"
                          />
                          {switchLoading === product._id && (
                            <Miniloader color={"green"} />
                          )}
                        </div>
                      </td>
                      {/* <td>
                          {moment(product.createdAt).format("DD / MM / YYYY")}
                        </td> */}
                      <td className="py-2 px-1 ">
                        <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                          <BiShowAlt
                            className="h-6 w-6 text-purple-500"
                            cursor="pointer"
                            onClick={() => productDetail(product)}
                          />
                          <FaRegEdit
                            className="h-5 w-6 text-green-500"
                            onClick={() => toEdit(product._id)}
                            cursor="pointer"
                          />
                          <MdDelete
                            className="h-6 w-6 text-red-500"
                            cursor="pointer"
                            onClick={() => confirmDelete(product._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full flex h-[50vh] pt-8 justify-center text-lg">
                No Data found.
              </div>
            )}
            {products?.length !== 0 && (
              <div className="pagination mt-3  flex justify-end  items-center">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={totalPages}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={
                    "flex justify-center items-center space-x-2"
                  }
                  activeClassName={
                    "bg-gradient-to-br from-green-600 to-green-800 text-white border border-green-500 rounded px-3 sm:px-4 py-1 sm:py-2 hover:text-white cursor-pointer"
                  }
                  previousClassName={
                    "bg-white border border-gray-300 rounded px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 cursor-pointer"
                  }
                  nextClassName={
                    "bg-white border border-gray-300 rounded px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100 cursor-pointer"
                  }
                  disabledClassName={"cursor-not-allowed"}
                  pageClassName={
                    "px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer relative w-10 h-10"
                  }
                  pageLinkClassName={
                    "flex items-center justify-center absolute inset-0 cursor-pointer"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%]">
            <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
            <p className="mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleDelete}
              >
                {deleteloading ? <Miniloader /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Product Details */}
      {showDataModal && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50  ">
          <div
            data-aos="flip-left"
            className="box break-words sm:w-auto bg-white p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold mb-4 font-serif">Details</h2>
              <IoClose
                onClick={() => setShowDataModal(false)}
                className="rounded-md h-5 w-5 cursor-pointer"
              />
            </div>
            <img
              src={selectedProduct?.image}
              alt=""
              className="rounded-xl h-40 w-40 object-cover"
            />
            <p className="text-lg pt-3 font-bold font-serif">
              Code : {selectedProduct?.code}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Name : {selectedProduct?.name}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Phone : {selectedProduct?.type}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_page;
