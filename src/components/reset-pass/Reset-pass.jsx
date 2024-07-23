import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Rpass = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email, otp } = router.query;

  async function verifyPass(e) {
    e.preventDefault();
    try {
      if (password == cpassword) {
        setLoading(true);
        const response = await axios.post(
          "https://farmer-api-9a00.onrender.com/auth/reset-password",
          {
            email: email,
            otp: otp,
            newPassword: password,
          }
        );
        console.log(response);
        router.push("/login");
        toast.success(response?.data?.message);
        setLoading(false);
      } else {
        seterror("Password and Confirm Password must be same");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="grid justify-center">
      <div className="text-3xl pt-9 text-center">New Password</div>
      <div className="border mt-5 rounded-md p-10 shadow-lg lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] ">
        <form onSubmit={verifyPass}>
          <label htmlFor="pass">Password</label>
          <input
            type="text"
            name="pass"
            id="pass"
            placeholder="Enter new password"
            className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-blue-600 mb-3"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="cpass">Confrim Password</label>
          <input
            type="text"
            name="cpass"
            id="cpass"
            placeholder="Enter confrim password"
            className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-blue-600 mb-3"
            required
            onChange={(e) => setCpassword(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button
            type="submit"
            className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700"
          >
            {loading ? (
              <TailSpin height="24" width="24" color="white" />
            ) : (
              "verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Rpass;
