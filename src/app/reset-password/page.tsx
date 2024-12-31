"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "@/src/assets/store-logo.pn";
import toast from "react-hot-toast";
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { resetPassword } from "@/src/utils/loginService";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")!;
  const resetToken = searchParams.get("token")!;
  const router = useRouter();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Resetting Password...");

    const userData = { email: email, newPassword: data.newPassword };

    try {
      const response = await resetPassword(userData, resetToken);
      toast.dismiss();
      if (response?.success) {
        toast.success("Password reset successful!", {
          duration: 6000,
        });
        router.push("/login");
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
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
            Change Password
          </h2>

          <SHForm
            defaultValues={{
              email: email || "",
            }}
            onSubmit={handleSubmit}
          >
            <div className="py-4">
              <SHInput
                name="email"
                label="Email"
                type="email"
                pathname="/login"
                variant="bordered"
                readonly
              />
            </div>
            <div className="pb-4">
              <SHInput
                name="newPassword"
                label="New Password"
                type="password"
                variant="bordered"
              />
            </div>

            <div className="flex justify-center items-center mb-10">
              <button
                type="submit"
                className="relative h-10 w-full origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
              >
                Reset Password
              </button>
            </div>
          </SHForm>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;