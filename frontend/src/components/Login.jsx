import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        loginData,
        { withCredentials: true } // Include cookies
      );

    //   console.log("Response:", response);

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true")
        toast.success("Login Successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error("Invalid credentials. Try again!");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error("Login Failed! Check email/password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
