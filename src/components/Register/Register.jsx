import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import Link from "next/link";

const Register = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getAllInfo() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/auth/signup",
        {
          firstName: fname,
          lastName: lname,
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      router.push(`/otp-verification?username=${username}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="grid justify-center mb-9">
      <div className="mt-9">
        <h1 className="text-3xl text-center">Register Here</h1>
      </div>
      <div className="border shadow-md lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px] mt-9 p-10">
        <form onSubmit={handleSubmit(getAllInfo)}>
          <label htmlFor="firstname">Firstname</label>
          <input
            {...register("firstname", { required: true })}
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter Firstname"
            className="w-full mt-2 mb-3 border border-slate-300 rounded-md py-2 px-4 focus:outline-blue-600"
            onChange={(e) => setFname(e.target.value)}
          />
          {errors.firstname && (
            <Alert variant="danger">
              <p className="text-red-600 pb-2">Firstname is required</p>
            </Alert>
          )}
          <label htmlFor="lastname">Lastname</label>
          <input
            {...register("lastname", { required: true })}
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter Lastname"
            className="w-full mt-2 mb-3 border border-slate-300 rounded-md py-2 px-4 focus:outline-blue-600"
            onChange={(e) => setLname(e.target.value)}
          />
          {errors.lastname && (
            <Alert variant="danger">
              <p className="text-red-600 pb-2">Lastname is required</p>
            </Alert>
          )}
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            className="w-full mt-2 mb-3 border border-slate-300 rounded-md py-2 px-4 focus:outline-blue-600"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <Alert variant="danger">
              <p className="text-red-600 pb-2">Username is required</p>
            </Alert>
          )}
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="w-full mt-2 mb-3 border border-slate-300 rounded-md py-2 px-4 focus:outline-blue-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <Alert variant="danger">
              <p className="text-red-600 pb-2">Email is required</p>
            </Alert>
          )}
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="w-full mt-2 mb-4 border border-slate-300 rounded-md py-2 px-4 focus:outline-blue-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <Alert variant="danger">
              {errors.password.type === "required" && (
                <p className="text-red-600 pb-2">Password is required</p>
              )}
              {errors.password.type === "minLength" && (
                <p className="text-red-600 pb-2">Minimum length is 8</p>
              )}
              {errors.password.type === "pattern" && (
                <p className="text-red-600 pb-2">
                  Password must include at least one uppercase letter, one
                  lowercase letter, one digit, and one special character
                  (@$!%?&).
                </p>
              )}
            </Alert>
          )}
          <div className="flex items-center ">
            <button
              type="submit"
              className="bg-blue-500 w-24 py-2 px-3 rounded-md text-white hover:bg-blue-700 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <TailSpin height="25" width="25" color="white" />
              ) : (
                "Submit"
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

export default Register;
