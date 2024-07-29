import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Miniloader from "../Loader/miniloader";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://farmer-api-9a00.onrender.com/auth/login",
        {
          username: username,
          password: password,
        }
      );
      console.log(response);
      if (response?.data?.data?.access_token) {
        localStorage.setItem("token", response?.data?.data?.access_token);
        toast.success(response?.data?.message);
      }
      router.push("/product");
    } catch (response) {
      toast.error(response?.data?.message);
      setErrorMessage("Invalid Credentials");
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      <div className="flex flex-col md:flex-row shadow-md">
        <div className="flex flex-wrap content-center justify-center rounded-md bg-white w-full md:w-96 h-auto p-6 md:rounded-l-md md:rounded-r-none">
          <div className="w-72">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              Login Here
            </h1>
            <small className="text-gray-400 md:text-base lg:text-lg">
              Welcome back! Please enter your details
            </small>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-red-500 pb-3">{errorMessage}</p>
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
                  placeholder="Enter your username"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
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
                  htmlFor="password"
                  className="mb-2 block text-xs md:text-sm lg:text-base font-semibold"
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
                  placeholder="*****"
                  className="block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500 text-xs md:text-sm lg:text-base"
                  id="password"
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

              <div className="mb-3 flex flex-wrap content-center">
                <Link
                  href="/forgot-password"
                  className="text-xs md:text-sm lg:text-base font-semibold text-green-700"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="mb-3">
                <button
                  className="mb-1.5 w-full flex justify-center items-center text-white bg-green-500 hover:bg-green-700 px-2 py-1.5 rounded-md text-xs md:text-sm lg:text-base"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Miniloader color={"white"} /> : "Sign in"}
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-xs md:text-sm lg:text-base text-gray-400 font-semibold">
                Don't have an account?
              </span>
              <Link
                href="/register"
                className="text-xs md:text-sm lg:text-base font-semibold text-green-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-wrap content-center justify-center rounded-r-md w-full md:w-96 h-64 md:h-auto">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src="/farmer1.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
