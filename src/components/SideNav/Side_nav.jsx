import Link from "next/link";
import { useState } from "react";
import { FaBox, FaTractor, FaUsers } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { TbLogout2 } from "react-icons/tb";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div
      className={`z-10 fixed top-0 left-0 h-screen bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg border p-4 ${
        open ? "w-[160px]" : "w-[75px]"
      } md:w-[200px] transition-all duration-300`}
    >
      <button
        type="button"
        className="inline-flex items-center p-2 justify-center text-sm rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 md:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className={`${open ? "block" : "hidden"} md:block mt-4 md:mt-0`}>
        <h1 className="text-sm sm:text-sm md:text-lg lg:text-lg font-bold mb-6">
          Welcome, Admin
        </h1>
        <ul className="space-y-3">
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/product" ? "bg-green-500 text-white" : ""
            }`}
          >
            <FaBox />
            <Link href="/product">Product</Link>
          </li>
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/farmer" ? "bg-green-500 text-white" : ""
            }`}
          >
            <FaTractor />
            <Link href="/farmer">Farmer</Link>
          </li>
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/customer" ? "bg-green-500 text-white" : ""
            }`}
          >
            <FaUsers />
            <Link href="/customer">Customer</Link>
          </li>
          <li
            className={`font-semibold text-sm sm:text-sm md:text-lg lg:text-lg rounded px-4 py-2 flex items-center space-x-2 cursor-pointer transition duration-200 hover:bg-green-500 hover:text-white ${
              router.pathname === "/expense" ? "bg-green-500 text-white" : ""
            }`}
          >
            <GiExpense />
            <Link href="/expense">Expense</Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="flex items-center justify-center">
          <TbLogout2
            onClick={logOut}
            className="h-6 w-6 cursor-pointer md:hidden"
          />
          <button
            type="submit"
            onClick={logOut}
            className="hidden md:inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
