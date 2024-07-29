import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import Link from "next/link";
import Miniloader from "../Loader/miniloader";

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
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex flex-col md:flex-row shadow-md">
        <div className="flex flex-wrap content-center justify-center rounded-md bg-white w-full md:w-96 h-auto p-6 md:rounded-l-md md:rounded-r-none">
          <div className="w-72">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Register Here
            </h1>
            <small className="text-gray-400 md:text-base lg:text-lg">
              Please enter your details
            </small>

            <form className="mt-4" onSubmit={handleSubmit(getAllInfo)}>
              <div className="mb-3">
                <label
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
                  htmlFor="firstname"
                >
                  Firstname:
                </label>
                <input
                  {...register("firstname", { required: true })}
                  type="text"
                  placeholder="Enter your Firstname"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
                  name="firstname"
                  id="firstname"
                  onChange={(e) => setFname(e.target.value)}
                />
                {errors.firstname && (
                  <Alert variant="danger">
                    <p className="text-red-600 pb-2">Firstname is required</p>
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
                  htmlFor="Lastname"
                >
                  Lastname:
                </label>
                <input
                  {...register("lastname", { required: true })}
                  type="text"
                  placeholder="Enter your Lastname"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
                  name="lastname"
                  id="lastname"
                  onChange={(e) => setLname(e.target.value)}
                />
                {errors.lastname && (
                  <Alert variant="danger">
                    <p className="text-red-600 pb-2">Lastname is required</p>
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
                  htmlFor="username"
                >
                  Username:
                </label>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Enter your Username"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <Alert variant="danger">
                    <p className="text-red-600 pb-2">Username is required</p>
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your Email"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <Alert variant="danger">
                    <p className="text-red-600 pb-2">Email is required</p>
                  </Alert>
                )}
              </div>
              <div className="mb-3">
                <label
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
                  htmlFor="password"
                >
                  Password:
                </label>
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
                  placeholder="Enter your Password"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
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
              </div>

              <div className="mb-3">
                <button
                  className="mb-1.5 w-full flex justify-center items-center text-white bg-green-500 hover:bg-green-700 px-2 py-1.5 rounded-md text-xs md:text-sm lg:text-base"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Miniloader color={"white"} /> : "Sign up"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs md:text-sm lg:text-base text-gray-400 font-semibold">
                Already have an account?
              </span>
              <Link
                href="/login"
                className="text-xs md:text-sm lg:text-base font-semibold text-green-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-wrap content-center justify-center rounded-r-md w-full md:w-96 h-64 md:h-auto">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="/farmer2.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
