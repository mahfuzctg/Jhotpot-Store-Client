/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { BsPhone } from "react-icons/bs";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import { motion } from "framer-motion";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import CustomerProfileLoading from "../LoadingCards/CustomerProfileLoading";
import { useDisclosure } from "@nextui-org/modal";
import MainModal from "../modal/Reusable/MainModal";
import UpdateProfileModal from "../modal/Reusable/UpdateProfileModal";

interface UserData {
  profilePhoto?: string;
  name?: string;
  role?: string;
  email?: string;
  address?: string;
  phone?: string;
}

const CustomerProfile = () => {
  const { userData, isLoading } = useUserDetails();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const profile: UserData = userData?.userData || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
    >
      {isLoading ? (
        <CustomerProfileLoading />
      ) : (
        <div className="w-80 md:w-auto flex items-center h-auto flex-wrap mx-auto my-20 lg:my-0 mr-10 md:mr-0">
          {/* Profile Container */}
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-gray-900 px-5 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              {/* Mobile Profile Photo */}
              <img
                // src={profile.profilePhoto || "/default-profile.png"}
                alt="Customer"
                loading="lazy"
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover"
              />

              {/* User Name */}
              <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-white">
                {profile.name || "N/A"}
              </h1>
              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-primary opacity-25" />

              {/* User Role */}
              <p className="pt-4 text-sm font-medium flex items-center justify-start uppercase text-white ml-6 md:ml-14 lg:ml-0">
                <span>{profile.role || "Customer"}</span>
              </p>

              {/* Email */}
              <p className="pt-3 text-white font-medium text-sm flex items-center justify-start ml-6 md:ml-14 lg:ml-0">
                <MdEmail className="text-primary mr-4 text-lg" />
                <span>Email: {profile.email || "N/A"}</span>
              </p>

              {/* Address */}
              <p className="pt-3 text-white font-medium text-sm flex items-center ml-6 md:ml-14 lg:ml-0">
                <MdOutlineLocationOn className="text-primary mr-3 text-4xl md:text-xl" />
                <span>Address: {profile.address || "N/A"}</span>
              </p>

              {/* Phone */}
              <p className="pt-3 text-white font-medium text-sm flex items-center ml-6 md:ml-14 lg:ml-0">
                <BsPhone className="text-primary mr-4 text-lg" />
                <span>Phone: {profile.phone || "N/A"}</span>
              </p>

              {/* Update Button */}
              <div className="pt-12 pb-8 cursor-pointer">
                <button
                  onClick={onOpen}
                  className="bg-primary btn-custom text-white font-bold py-2 px-4 rounded-full hover:bg-[#c4650a]"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Profile Modal */}
      <MainModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <UpdateProfileModal />
      </MainModal>
    </motion.div>
  );
};

export default CustomerProfile;
