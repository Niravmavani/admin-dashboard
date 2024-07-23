import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const Fotp = () => {
  const [otp, setOtp] = useState();
  const router = useRouter();
  const { email } = router.query;

  const lets = () => {
    router.push(`/new-password?otp=${otp}&email=${email}`);
    toast.success("Otp varification successfully");
  };
  return (
    <div className="grid justify-center">
      <div className="text-3xl pt-9 text-center">Otp Verification</div>
      <div className="border mt-5 rounded-md p-10 shadow-lg lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] ">
        <form>
          <label htmlFor="email">Otp</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter otp"
            className="w-full border border-slate-300 rounded-md py-2 px-4 mt-3 focus:outline-blue-600 mb-3"
            required
            onChange={(e) => setOtp(e.target.value)}
          />

          <buttton
            type="submit"
            onClick={lets}
            className="bg-blue-500 py-2 px-3 rounded-md text-white hover:bg-blue-700"
          >
            submit
          </buttton>
        </form>
      </div>
    </div>
  );
};

export default Fotp;