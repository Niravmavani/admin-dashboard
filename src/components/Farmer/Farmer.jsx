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
import SideNav from "../SideNav/Side_nav";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactPaginate from "react-paginate";
import { farmerData, farmerDelete } from "@/services/farmer";

const Product_page = () => {
  const [farmer, setFarmer] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [farmerToDelete, setFarmerToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const router = useRouter();

  const toEdit = (id) => {
    router.push(`/farmer/edit/${id}`);
  };

  async function fetchFarmers() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await farmerData(token, currentPage, itemsPerPage);
      setLoading(false);
      console.log("response", response);
      setFarmer(response?.data?.items);
      setCurrentPage(response?.data?.currentPageNumber - 1);

      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error);
    }
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    fetchFarmers();
  }, [currentPage]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      setDeleteLoading(true);
      const response = await farmerDelete(token, farmerToDelete);
      if (response) {
        fetchFarmers();
      }
      setDeleteLoading(false);
      toast.success("Farmer Deleted Successfully");
    } catch (error) {
      console.log("Error deleting product:", error);
      setDeleteLoading(false);
    } finally {
      setShowModal(false);
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setFarmerToDelete(id);
    setShowModal(true);
  };

  const productDetail = (item) => {
    setShowDataModal(true);
    setSelectedFarmer(item);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideNav />
      <div
        className="md:ml-[199px] ml-20  p-5  w-full overflow-x-hidden "
        data-aos="fade-left"
      >
        <div className="flex items-center justify-between productHeader">
          <div className="list sm:text-xl text-md md:text-2xl lg:text-2xl font-bold text-gray-800">
            Farmer List
          </div>
          <div className="">
            <Link
              href="/farmer/add"
              className="add  md:mr-5 transition duration-600 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black hover:outline hover:outline-purple-600 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-sm md:text-lg py-2 px-4 rounded-lg shadow-md "
            >
              Add Farmer
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
            ) : farmer?.length !== 0 ? (
              <table className="w-full rtl:text-right whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-600 uppercase ">
                  <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                    <th className="py-2 px-3 text-start">image</th>
                    <th className="py-2 px-3 ">Name</th>
                    <th className="py-2 px-3">Phone</th>
                    <th className="py-2 px-3">Village</th>
                    <th className="py-2 px-3 ">Gender</th>
                    <th className="py-2 px-3 ">Username</th>
                    <th className="py-2 px-3 ">Email</th>
                    <th className="py-2 px-3 text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {farmer.map((farmer) => (
                    <tr
                      key={farmer._id}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-1 flex justify-start transition-all duration-300 ease-in-out transform hover:scale-105">
                        <img
                          src={farmer.image}
                          alt={farmer.image}
                          className="h-16 w-16 object-cover rounded-lg shadow-md "
                        />
                      </td>
                      <td className="py-2 px-1 text-center">{farmer.name}</td>
                      <td className="py-2 px-1 text-center">{farmer.phone}</td>
                      <td className="py-2 px-1 text-center">
                        {farmer.village}
                      </td>
                      <td className="py-2 px-1 text-center">{farmer.gender}</td>
                      <td className="py-2 px-1 text-center">
                        {farmer.username}
                      </td>

                      <td className="py-2 px-1 text-center">{farmer.email}</td>
                      <td className="py-2 px-1 ">
                        <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                          <BiShowAlt
                            className="h-6 w-6 text-purple-500"
                            cursor="pointer"
                            onClick={() => productDetail(farmer)}
                          />
                          <FaRegEdit
                            className="h-5 w-6 text-blue-500"
                            onClick={() => toEdit(farmer._id)}
                            cursor="pointer"
                          />
                          <MdDelete
                            className="h-5 w-6 text-red-500"
                            onClick={() => confirmDelete(farmer._id)}
                            cursor="pointer"
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
            {farmer?.length !== 0 && (
              <div className="pagination mt-3 flex justify-center md:justify-end items-center ">
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
                    "flex justify-center items-center space-x-2"
                  }
                  activeClassName={
                    "bg-blue-500 text-white border border-blue-500 rounded px-3 sm:px-4 py-1 sm:py-2"
                  }
                  previousClassName={
                    "bg-white border border-gray-300 rounded pagi px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100"
                  }
                  nextClassName={
                    "bg-white border border-gray-300 rounded px-3 sm:px-4 py-1 sm:py-2 hover:bg-gray-100"
                  }
                  disabledClassName={"cursor-not-allowed"}
                  pageClassName={
                    "px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded hover:bg-gray-100"
                  }
                  pageLinkClassName={"flex items-center justify-center"}
                />
              </div>
            )}
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
            <p>Are you sure you want to delete this farmer?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                type="submit"
                className="bg-red-600 w-24 py-2 px-3 rounded-md text-white hover:bg-red-700 flex justify-center items-center"
                disabled={loading}
              >
                {deleteloading ? (
                  <TailSpin height="25" width="25" color="white" />
                ) : (
                  "Submit"
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
              <h2 className="text-lg font-semibold mb-4 font-serif">Details</h2>
              <IoClose
                onClick={() => setShowDataModal(false)}
                className="rounded-md h-5 w-5 cursor-pointer"
              />
            </div>
            <img
              src={selectedFarmer?.image}
              alt=""
              className="rounded-xl h-40 w-40 object-cover"
            />
            <p className="text-lg pt-3 font-bold font-serif">
              Name : {selectedFarmer?.name}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Phone : {selectedFarmer?.phone}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Village : {selectedFarmer?.village}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Gender : {selectedFarmer?.gender}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Username : {selectedFarmer?.username}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Email : {selectedFarmer?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product_page;
