import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
// import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

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
    <div className="grid place-content-center">
      <div className="text-3xl pt-9 text-center">
        <p>Login Here</p>
      </div>
      <div className="border mt-5 bg-white shadow-md p-10 rounded-md lg:w-[500px] md:w-[500px] sm:w-[500px] w-[300px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-red-500 pb-3">{errorMessage}</p>
          <label htmlFor="username" className="text-left" name="username">
            Username:
          </label>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Enter Your Username"
            className="border border-slate-300 w-full mt-3 mb-3 py-2 px-4 rounded-md focus:outline-blue-600"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <Alert variant="danger">
              <p className="text-red-600 pb-2">Username is required</p>
            </Alert>
          )}

          <label htmlFor="password" name="password">
            Password:
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
            })}
            type="text"
            placeholder="Enter Your Password"
            className="border border-slate-300 mt-2 mb-3 w-full py-2 px-4 rounded-md focus:outline-blue-600"
            name="password"
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

          <div className="flex items-center">
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

            <Link
              href="/forgot-password"
              className="pl-9 cursor-pointer hover:text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="pt-5">
            <Link
              href="/register"
              className="cursor-pointer hover:text-blue-500"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
