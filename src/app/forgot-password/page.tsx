/* eslint-disable react/self-closing-comp */
"use client";
import logo from "@/src/assets/logo.png";
import { forgotPassword } from "@/src/utils/loginService";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.loading("Loading...");

    const userData = { email: value };

    try {
      const response = await forgotPassword(userData);
      toast.dismiss();

      if ("success" in response && response?.success) {
        setValue("");
        router.push("/login");
        return toast.success("Please check email inbox or spam!", {
          duration: 6000,
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-[#18181B] rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <div className="flex justify-center items-center">
            <Link
              href={"/"}
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
            >
              <Image
                className=""
                src={logo}
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-400">
            Don&apos;t fret! Just type in your email and we will send you a URL
            to reset your password!
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <Input
                value={value}
                type="email"
                placeholder="Enter your email..."
                variant="bordered"
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "primary"}
                errorMessage="Please enter a valid email"
                onValueChange={setValue}
                size="lg"
              />
            </div>
            <button
              type="submit"
              className="relative h-12 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;