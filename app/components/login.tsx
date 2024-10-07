"use client"; // This marks the component as a Client Component

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // use 'next/navigation' in the app directory
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PuffLoader } from 'react-spinners';
import Image from 'next/image';
import logoLogin from "../image/logoLogin.png";
import logo from "../image/logo.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // using useRouter from next/navigation

  useEffect(() => {
    setLoading(false);
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "Password must contain letters and at least one number"),
  });

  const signUp = () => {
    router.push("/register");
  };

  const AdminIndex = () => {
    router.push("/admin_index");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        console.log("Login attempted with:", values);
        setLoading(false);
        router.push("/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your email and password.");
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PuffLoader color="#36454F" size={100} speedMultiplier={1} />
        </div>
      ) : (
        <div className="flex min-h-screen justify-center items-center bg-bgLogin p-4">
          <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl">
            <div className="flex items-center justify-center w-full md:w-1/2 mb-8 md:mb-0">
              <Image
                src={logoLogin}
                alt="Logo"
                className="h-40 md:h-30 lg:h-48"
              />
            </div>
            <div className="flex items-center justify-center w-full md:w-1/2">
              <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6">
                <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm h-10 pl-2 focus:border-blue-500 focus:outline-none" 
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                    )}
                    </div>
                    <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="mt-1 block w-full border-2 border-gray-200 rounded-md shadow-sm h-10 pl-2 focus:border-blue-500 focus:outline-none" 
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
                    )}
                    </div>
                  <button
                    onClick={AdminIndex}
                    className="w-full bg-baseColor text-white py-2 rounded-md mb-2"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Log In
                  </button>
                  <button
                    onClick={signUp}
                    className="w-full bg-baseColor text-white py-2 rounded-md"
                    type="button"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <span className="text-sm">Forgot password?</span>
                  <Link href="/resetpass">
                    <span className="ml-1 font-bold text-baseColor text-sm">Click here</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
