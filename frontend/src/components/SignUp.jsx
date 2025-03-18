import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const signupData = {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;  
      const response = await axios.post(`${BASE_URL}/auth/signup`, signupData);
      toast.success("Signup Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      toast.error("Signup Failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              {...register("userName", { required: "Username is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: "First Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: "Last Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>

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
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Must be at least 6 characters" } })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
