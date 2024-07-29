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
  expenseData,
  expenseDelete,
  editExpense,
} from "../../services/expense";
import Bigloader from "../Loader/bigloader";
import Miniloader from "../Loader/miniloader";

const Expense = () => {
  const [expense, setExpense] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState();
  const [loading, setLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResult, setSearchResult] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();

  const toEdit = (id) => {
    router.push(`/expense/edit/${id}`);
  };
  async function fetchExpense() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await expenseData(
        token,
        currentPage,
        itemsPerPage,
        searchResult
      );

      setLoading(false);
      console.log("response", response);
      setExpense(response?.data?.items);
      setCurrentPage(response?.data?.currentPageNumber - 1);

      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching Expense:", error);
    }
  }
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    fetchExpense();
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
      const response = await expenseDelete(token, expenseToDelete);
      if (response) {
        fetchExpense();
      }
      setDeleteLoading(false);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log("Error deleting expense:", error);
      setDeleteLoading(false);
    } finally {
      setShowModal(false);
      setDeleteLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setExpenseToDelete(id);
    setShowModal(true);
  };

  const expenseDetail = (item) => {
    setShowDataModal(true);
    setSelectedExpense(item);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const updateStatus = async (expense) => {
    const token = localStorage.getItem("token");
    setSwitchLoading(expense._id);
    try {
      const payload = {
        status: !expense.status,
      };
      const response = await editExpense(token, expense._id, payload);
      if (response) {
        setExpense((prevExpense) =>
          prevExpense.map((e) =>
            e._id === expense._id ? { ...e, status: payload.status } : e
          )
        );
      }
    } catch (error) {
      toast.error("Error updating product status:");
    }
    setSwitchLoading(null);
  };

  const searchExpense = async (value) => {
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
            Expense List
          </div>
          <div className="">
            <Link
              href="/expense/add"
              className="add  md:mr-5 transition duration-600 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black hover:outline hover:outline-green-600 bg-gradient-to-br from-green-600 to-green-800 text-white text-sm md:text-lg py-2 px-4 rounded-lg shadow-md "
            >
              Add Expense
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
                  placeholder="Search Expense"
                  onChange={(e) => searchExpense(e.target.value)}
                  className="border rounded-md p-2 pl-10 w-full outline-green-600"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center pt-4">
                <Bigloader color={"#228B22"} />
              </div>
            ) : expense?.length !== 0 ? (
              <table className="w-full rtl:text-right whitespace-nowrap">
                <thead className="bg-gray-200 text-gray-600 uppercase ">
                  <tr className="border-b border-t text-sm sm:text-sm md:text-md lg:text-md">
                    <th className="py-2 px-3 ">image</th>
                    <th className="py-2 px-3 ">code</th>
                    <th className="py-2 px-3 ">Name</th>

                    <th className="py-2 px-3">Phone</th>

                    <th className="py-2 px-3 ">Remarks</th>
                    <th className="py-2 px-3 ">Status</th>
                    <th className="py-2 px-3 text-end">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {expense.map((expense) => (
                    <tr
                      key={expense._id}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-1 flex justify-start transition-all duration-300 ease-in-out transform hover:scale-105">
                        <img
                          src={expense.image}
                          alt={expense.image}
                          className="h-16 w-16 object-cover rounded-lg shadow-md "
                        />
                      </td>
                      <td className="py-2 px-1 text-center">{expense.code}</td>
                      <td className="py-2 px-1 text-center">{expense.name}</td>
                      <td className="py-2 px-1 text-center">{expense.phone}</td>

                      <td className="py-2 px-1 text-center">
                        {expense.remarks}
                      </td>

                      <td className="py-2 px-1 text-center w-[100px]">
                        <div className="flex space-x-2 justify-center items-center">
                          <ReactSwitch
                            checked={expense.status}
                            onChange={() => updateStatus(expense)}
                            offColor="#888"
                            onColor="#228B22"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={48}
                            className="react-switch"
                          />
                          {switchLoading === expense._id && (
                            <Miniloader color={"green"} />
                          )}
                        </div>
                      </td>

                      <td className="py-2 px-1">
                        <div className="flex justify-end gap-4 sm:gap-4 md:gap-7 lg:gap-7">
                          <BiShowAlt
                            className="h-6 w-6 text-purple-500"
                            cursor="pointer"
                            onClick={() => expenseDetail(expense)}
                          />
                          <FaRegEdit
                            className="h-5 w-6 text-green-500"
                            onClick={() => toEdit(expense._id)}
                            cursor="pointer"
                          />
                          <MdDelete
                            className="h-5 w-6 text-red-500"
                            onClick={() => confirmDelete(expense._id)}
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
            {expense?.length !== 0 && (
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
            <p>Are you sure you want to delete this expense?</p>
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
              src={selectedExpense?.image}
              alt=""
              className="rounded-xl h-40 w-40 object-cover"
            />
            <p className="text-lg pt-3 font-bold font-serif">
              Code : {selectedExpense?.code}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Name : {selectedExpense?.name}
            </p>
            <p className="text-lg pt-3 font-bold font-serif">
              Phone : {selectedExpense?.phone}
            </p>

            <p className="text-lg pt-3 font-bold font-serif">
              Remarks : {selectedExpense?.remarks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
