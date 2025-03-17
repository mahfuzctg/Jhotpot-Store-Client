/* eslint-disable jsx-a11y/anchor-is-valid */ 
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import logo from "@/src/assets/logo.jpg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/src/lib/redux/hooks";
import { verifyToken } from "@/src/utils/verifyToken";
import toast from "react-hot-toast";

import { loginUser, registerUser } from "@/src/utils/loginService";
import { setUser, TUser } from "@/src/lib/redux/features/auth/auth.slice";
import loginValidationSchema from "@/src/schema/login.schema";

export type TLogin = {
  email: string;
  password: string;
  defaultValue?: string;  
};

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<string>("User");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isLogInSuccess, setIsLogInSuccess] = useState(false);
  
  // Demo credentials for testing
  const [demoUser, setDemoUser] = useState<{ email?: string; password?: string }>({});
  
  // Set demo credentials
  const handleCredentialClick = (role: "User" | "Admin") => {
    if (role === "User") {
      setDemoUser({ email: "customer@gmail.com", password: "password@A1" });
    } else {
      setDemoUser({ email: "admin@gmail.com", password: "password@A1" });
    }
  };

  useEffect(() => {
    if (isLogInSuccess) {
      if (selectedRole === "User") {
        const target = redirect || "/";
        router.push(target);
      } else {
        const target = "/vendor-dashboard";
        router.push(target);
      }
    }
  }, [isLogInSuccess, redirect, router]);
 
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");

    try {
      const res = await loginUser(data);

      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));

        setIsLogInSuccess(true);
        toast.success("Logged in successfully", { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");

    const signUpData = { ...data, role: selectedRole };

    try {
      const res = await registerUser(signUpData);
      console.log(res);
      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.token) as TUser;
        dispatch(setUser({ user: user, token: res.token }));

        setIsLogInSuccess(true);
        toast.success("Account created successfully!", { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 xl:py-0">
      <div className="relative border-2 border-primary text-gray-700 rounded-2xl shadow-lg overflow-hidden w-[90%] md:w-[800px] md:max-w-full lg:min-h-[570px] min-h-[620px] md:min-h-[580px]">
        {/* Form Containers */}
        
        {/* Sign In Part */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isActive
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          } w-full lg:w-1/2`}
        >
          <div className="flex flex-col items-center justify-center h-full roun px-10 text-gray-700">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                height={50}
                width={50}
                className="flex py-1 rounded-full"
              />
            </Link>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between py-2 px-4 bg-gray-200 rounded-lg shadow-sm">
                  <div className="flex w-1/2 justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{demoUser.email}</span>
                  </div>
                  <div className="flex w-1/2 justify-between">
                    <span className="font-medium">Password:</span>
                    <span>{demoUser.password}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleCredentialClick("User")}
                className="px-4 py-2 bg-primary-500 text-white rounded-md"
              >
                Use Demo User
              </button>
              <button
                onClick={() => handleCredentialClick("Admin")}
                className="px-4 py-2 bg-purple-600 text-white rounded-md"
              >
                Use Demo Admin
              </button>
            </div>

            <SHForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
            >
              <div className="py-2">
                <SHInput
                  name="email"
                  label="Email"
                  type="email"
                  pathname="/login"
                  variant="bordered"
                  defaultValue={demoUser.email}
                />
              </div>
              <div className="">
                <SHInput
                  name="password"
                  label="Password"
                  type="password"
                  variant="bordered"
                  defaultValue={demoUser.password}
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href={"/forgot-password"}>
                  <button type="reset" className="-mr-3 w-max p-2 mb-4">
                    <span className="text-sm tracking-wide text-gray-700">
                      Forgot password ?
                    </span>
                  </button>
                </Link>
              </div>

              <div className="flex justify-center items-center mb-10">
                <button
                  type="submit"
                  className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-gray-700 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                >
                  Sign In
                </button>
              </div>
            </SHForm>
          </div>
        </div>
      </div>
    </div>
  );
}
