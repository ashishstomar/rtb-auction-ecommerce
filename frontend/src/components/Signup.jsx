import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  console.log(fullName, email, password);

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/user/signup",
        { fullName, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((result) => {
        toast.success("Signup successful. Please Signin to your new account.");
        console.log(result);
        Navigate("/signin");
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data) {
          toast.error(`Signup failed: ${err.response.data.error}`);
        } else {
          toast.error("Signup failed. Please try again.");
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
      />
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-green-600"
        >
          <FaUserPlus className="mr-2" />
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
