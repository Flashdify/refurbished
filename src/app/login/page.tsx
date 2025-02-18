"use client";
import Link from "next/link";
import React, { useState } from "react";
import Nav from "../components/Header";
import Footer from "../components/Footer";
import { MdVisibility, MdOutlineEmail, MdVisibilityOff } from "react-icons/md";
import Validation from "./loginValidation";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleVisibility = () => setShowPassword((prevState) => !prevState);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = Validation(formData);
    setError(validationError);

    if (Object.keys(validationError).length > 0) {
      return;
    }

    // Check if the user is the admin
    if (formData.email === "abc@gmail.com" && formData.password === "abc@123") {
      router.push("../admin"); // Redirect to admin page
      return;
    }
    if (formData.email === "dummy@gmail.com" && formData.password === "dummy@123") {
      router.push("../admin/pharmacist"); // Redirect to pharmacist page
      return;
    }


    // Make the API call if it's not the admin
    try {
      const res = await axios.post(
        "https://pharmaconnect-backend.onrender.com/auth/login",
        formData
      );

      console.log("Backend Response:", res.data);

      if (res.data.success) {
        router.push("../home");
      } else {
        setError({
          general: res.data.message || "Invalid credentials",
        });
      }
    } catch (err) {
      console.error("Error during login:", err);

      if (err.response && err.response.data) {
        const backendError = {};

        if (err.response.data.message) {
          backendError.general = err.response.data.message;
        } else {
          backendError.general = "An unexpected error occurred.";
        }

        setError(backendError);
      } else {
        setError({
          general: err.message || "An error occurred during login.",
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Nav />
      <div className="flex flex-1 justify-center items-center my-12 mt-32">
        <div className="relative w-full max-w-4xl p-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-3xl shadow-xl">
          <div className="flex w-full bg-white rounded-3xl overflow-hidden">
            <div className="w-1/2 bg-gray-200 p-6 flex justify-center items-center">
              <img
                src="/vis/logo.jpg"
                alt="Logo"
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="w-1/2 p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Log In
              </h2>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Email or phone number"
                    name="email"
                    onChange={handleInput}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                  <MdOutlineEmail className="absolute top-1/3 right-3 text-gray-400" />
                  <span className="text-xs text-red-500 italic">
                    {error.email ? error.email : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                  <button
                    className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    aria-controls="password"
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={20} aria-hidden="true" />
                    ) : (
                      <MdVisibility size={20} aria-hidden="true" />
                    )}
                  </button>
                  <span className="text-xs text-red-500 italic">
                    {error.password ? error.password : ""}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Log In
              </button>
              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="border-t my-6"></div>
              <Link href="/signup">
                <button className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg hover:bg-teal-600 transition duration-300 shadow-md">
                  Create a New Account
                </button>
              </Link>
              {error.general && (
                <p className="mt-4 text-center text-red-500 text-sm italic">
                  {error.general}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
