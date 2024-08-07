import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { IoClose, IoSearchSharp } from "react-icons/io5";
import SideNav from "../SideNav/Side_nav";
import AOS from "aos";
import ReactSwitch from "react-switch";

import "aos/dist/aos.css";
import ReactPaginate from "react-paginate";
import {
  customerData,
  customerDelete,
  editCustomer,
} from "../../services/customer";
import Bigloader from "../Loader/bigloader";
import Miniloader from "../Loader/miniloader";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [loading, setLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();

  const toEdit = (id) => {
    router.push(`/customer/edit/${id}`);
  };
  async function fetchCustomer() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await customerData(
        token,
        currentPage,
        itemsPerPage,
        searchResult
      );

      setLoading(false);
      console.log("response", response);
      setCustomer(response?.data?.items);
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

    fetchCustomer();
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

    try {
      setDeleteLoading(true);
      const response = await customerDelete(token, customerToDelete);
      if (response) {
        fetchCustomer();
      }
      setDeleteLoading(false);
      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("Error deleting product:", error);
      toast.error(error?.message);
      setDeleteLoading(false);
    } finally {
      setShowModal(false);
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setCustomerToDelete(id);
    setShowModal(true);
  };

  const customerDetail = (item) => {
    setShowDataModal(true);
    setSelectedCustomer(item);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const updateStatus = async (customer) => {
    const token = localStorage.getItem("token");
    setSwitchLoading(customer._id);
    try {
      const payload = {
        status: !customer.status,
      };
      const response = await editCustomer(token, customer._id, payload);
      if (response) {
        setCustomer((prevCustomers) =>
          prevCustomers.map((c) =>
            c._id === customer._id ? { ...c, status: payload.status } : c
          )
        );
      }
    } catch (error) {
      toast.error("Error updating product status:");
    }
    setSwitchLoading(null);
  };

  const searchCustomer = async (value) => {
    setSearchResult(value);
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
            Customer List
          </div>
          <div className="">
            <Link
              href="/customer/add"
              className="add  md:mr-5 transition duration-600 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black hover:outline hover:outline-green-600 bg-gradient-to-br from-green-600 to-green-800 text-white text-sm md:text-lg py-2 px-4 rounded-lg shadow-md "
            >
              Add Customer
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
                  placeholder="Search Customer"
                  onChange={(e) => searchCustomer(e.target.value)}
                  className="border rounded-md p-2 pl-10 w-full outline-green-600"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center pt-4">
                <Bigloader color={"#228B22"} />
              </div>
            ) : customer?.length !== 0 ? (
              <table className="w-full rtl:text-right whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-600 uppercase ">
                  <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                    <th className="py-2 px-3 ">image</th>
                    <th className="py-2 px-3 ">Name</th>
                    <th className="py-2 px-3 ">Email</th>
                    <th className="py-2 px-3">Phone</th>
                    <th className="py-2 px-3">Village</th>
                    <th className="py-2 px-3 ">Username</th>
                    <th className="py-2 px-3 ">Gender</th>
                    <th className="py-2 px-3 ">Remarks</th>
                    <th className="py-2 px-3 ">Status</th>
                    <th className="py-2 px-3 text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customer.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-1 flex justify-start transition-all duration-300 ease-in-out transform hover:scale-105">
                        <img
                          src={customer.image}
                          alt={customer.image}
                          className="h-16 w-16 object-cover rounded-lg shadow-md "
                        />
                      </td>
                      <td className="py-2 px-1 text-center">{customer.name}</td>
                      <td className="py-2 px-1 text-center">
                        {customer.email}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {customer.phone}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {customer.village}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {customer.username}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {customer.gender}
                      </td>
                      <td className="py-2 px-1 text-center">
                        {customer.remarks}
                      </td>
                      <td className="py-2 px-1 text-center w-[100px]">
                        <div className="flex space-x-2 justify-center items-center">
                          <ReactSwitch
                            checked={customer.status}
                            onChange={() => updateStatus(customer)}
                            offColor="#888"
                            onColor="#228B22"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={48}
                            className="react-switch"
                          />
                          {switchLoading === customer._id && (
                            <Miniloader color={"green"} />
                          )}
                        </div>
                      </td>

                      <td className="py-2 px-1">
                        <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                          <BiShowAlt
                            className="h-6 w-6 text-purple-500"
                            cursor="pointer"
                            onClick={() => customerDetail(customer)}
                          />
                          <FaRegEdit
                            className="h-5 w-6 text-green-500"
                            onClick={() => toEdit(customer._id)}
                            cursor="pointer"
                          />
                          <MdDelete
                            className="h-5 w-6 text-red-500"
                            onClick={() => confirmDelete(customer._id)}
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
            {customer?.length !== 0 && (
              <div className="pagination mt-3 flex justify-center md:justify-end items-center">
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

      {showModal && (
        <div className="md:ml-[199px] ml-[75px] fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div
            data-aos="zoom-in-up"
            className="deletebox bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this customer?</p>
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
                {deleteloading ? <Miniloader color={"white"} /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
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
              src={selectedCustomer?.image}
              alt=""
              className="rounded-xl h-40 w-40 object-cover"
            />
            <p className="text-lg pt-3 font-bold font-serif">
              Name : {selectedCustomer?.name}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Phone : {selectedCustomer?.phone}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Village : {selectedCustomer?.village}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Gender : {selectedCustomer?.gender}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Username : {selectedCustomer?.username}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Email : {selectedCustomer?.email}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Remarks : {selectedCustomer?.remarks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
