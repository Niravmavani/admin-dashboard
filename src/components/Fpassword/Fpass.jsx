import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Fpass = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function verifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/auth/forgot-password",
        {
          email: email,
        }
      );
      console.log(response);
      router.push(`/password-otp?email=${email}`);
      setLoading(false);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="grid justify-center">
      <div className="text-3xl pt-9 text-center">Forgot Paasword</div>
      <div className="border mt-5 rounded-md  p-10 shadow-lg lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] ">
        <form onSubmit={verifyOtp}>
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-blue-600 mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center ">
            <button
              type="submit"
              className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700"
            >
              {loading ? (
                <TailSpin height="24" width="24" color="white" />
              ) : (
                "Verify"
              )}
            </button>
            <div className="flex items-center pl-9 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="20px"
                width="20px"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <Link href="/login" className="pl-1 text-lg hover:text-blue-500">
                back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Fpass;
