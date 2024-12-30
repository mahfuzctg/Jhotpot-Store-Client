"use client";

import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import PasswordChangeLoading from "@/src/components/LoadingCards/PasswordChangeLoading";
import Title from "@/src/components/Sections/title";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useChangePasswordMutation } from "@/src/lib/redux/features/auth/auth.api";

import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

/* eslint-disable jsx-a11y/anchor-is-valid */
const Security = () => {
  const { userData, isLoading } = useUserDetails();
  const [changePassword] = useChangePasswordMutation();

  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const passwordInfo = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    await toast.promise(changePassword(passwordInfo).unwrap(), {
      loading: "Changing Password...",
      success: () => {
        setTimeout(() => window.location.reload(), 1000);
        return "You changed your password successfully!";
      },
      error: "Failed to change password",
    });
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
      
        <Title sub="Enhance the Security of Your Account" heading="Update Your Password" />

        <>
          {isLoading ? (
            <PasswordChangeLoading />
          ) : (
            <div className="w-full p-6 rounded-lg shadow md:mt-5 sm:max-w-2xl sm:p-8">
              <SHForm
                defaultValues={{
                  email: userData?.userData?.email || "",
                }}
                onSubmit={handlePasswordChange}
              >
                <div className="py-5">
                  <SHInput
                    name="email"
                    label="Email"
                    type="email"
                    pathname="/login"
                    variant="bordered"
                    readonly
                  />
                </div>
                <div className="pb-5">
                  <SHInput
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    variant="bordered"
                  />
                </div>
                <div className="pb-8">
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
                    className="relative h-10 w-full origin-top transform rounded-lg border-2 border-[#70B003] text-[#70B003] before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#A9D656] uppercase font-bold"
                  >
                    Change Password
                  </button>
                </div>
              </SHForm>
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default Security;