// SignUpPage.tsx

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import { zodResolver } from "@hookform/resolvers/zod";

import logo from "@/assets/logo.png"; // Assuming you have a logo image file
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import registerValidationSchema from "@/src/schema/register.schema";

const SignUpPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelection = (role: string) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  const handleSignUp = (data: any) => {
    console.log("Sign up with", data);
    // handle the sign-up logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <Link href={"/"}>
            <Image src={logo} alt="logo" height={100} width={100} />
          </Link>
          <h1 className="text-2xl font-semibold mt-4 mb-2">Create Account</h1>

          <div className="relative flex justify-center items-center gap-1 my-3">
            {/* Dropdown Trigger */}
            <button
              onClick={toggleDropdown}
              className="flex items-center text-primary text-xl cursor-pointer"
            >
              <IoIosArrowDropdownCircle />
            </button>

            {/* Selected Role */}
            <h1 className="text-center text-primary font-bold">
              Register as {selectedRole}
            </h1>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-[calc(100%+0.5rem)] left-0  border border-primary bg-white text-gray-700 shadow-lg rounded-md w-40 z-50"
              >
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                  onClick={() => handleSelection("User")}
                >
                  User
                  {selectedRole === "User" && (
                    <span className="ml-2 text-green-500">✔</span>
                  )}
                </div>
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                  onClick={() => handleSelection("Vendor")}
                >
                  Vendor
                  {selectedRole === "Vendor" && (
                    <span className="ml-2 text-green-500">✔</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <SHForm onSubmit={handleSignUp} resolver={zodResolver(registerValidationSchema)}>
            <div className="pb-2">
              <SHInput name="name" label="Full Name" type="text" variant="bordered" />
            </div>
            <div className="pb-2">
              <SHInput name="email" label="Email" type="email" variant="bordered" />
            </div>
            <div className="pb-2">
              <SHInput name="password" label="Password" type="password" variant="bordered" />
            </div>

            <div className="flex justify-center items-center mt-3">
              <button
                type="submit"
                className="relative h-10 w-24 transform rounded-lg border-2 border-primary text-primary hover:text-gray-700 hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
              >
                Sign Up
              </button>
            </div>
          </SHForm>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
