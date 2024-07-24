import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Otp = () => {
  const router = useRouter();
  const { username } = router.query;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function VerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/auth/verify-otp",
        {
          username: username,
          otp: otp,
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      router.push(`/login`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="grid justify-center">
      <div className="text-3xl pt-9 text-center">Otp Verification</div>
      <div className="border mt-5 rounded-md p-10 shadow-lg lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] ">
        <form onSubmit={VerifyOtp}>
          <label htmlFor="otp" className="">
            Otp
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter otp"
            className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-blue-600 mb-3"
            required
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 w-24 py-2 px-3 rounded-md text-white hover:bg-blue-700 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <TailSpin height="25" width="25" color="white" />
            ) : (
              "verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
