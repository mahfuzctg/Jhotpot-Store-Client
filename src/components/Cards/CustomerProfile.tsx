/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-20 mx-auto">
          {/* Profile Container */}
          <div
            id="profile"
            className="w-full max-w-3xl rounded-2xl shadow-2xl border-t-4 border-[#70B103] bg-white relative px-10 py-8"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)", // Unique bottom shape
            }}
          >
            {/* Profile Photo */}
            <div className="absolute -top-4 mb-8 left-1/2 transform -translate-x-1/2">
              <img
                src={profile.profilePhoto || "/default-profile.png"}
                alt="Customer"
                loading="lazy"
                className="rounded-full shadow-lg h-32 w-32 object-cover border-4 border-[#70B103] bg-white"
              />
            </div>

            <div className="mt-16 text-center">
              {/* User Name */}
              <h1 className="text-2xl font-bold text-black mb-2 mt-10 pt-8">
                {profile.name || "N/A"} <span className="ml-1">👤</span>
              </h1>

              {/* Role */}
              <p className="uppercase text-sm font-semibold text-[#70B103]">
                {profile.role || "Customer"}
              </p>

              {/* Divider */}
              <div className="w-20 border-t-2 border-[#70B103] my-4 mx-auto"></div>

              {/* Contact Details */}
              <div className="flex flex-col gap-3 text-gray-700 text-sm">
                <p className="flex items-center justify-center gap-2">
                  📧 <span>Email: {profile.email || "N/A"}</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  🏠 <span>Address: {profile.address || "N/A"}</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  📞 <span>Phone: {profile.phone || "N/A"}</span>
                </p>
              </div>

              {/* Update Button */}
              <div className="mt-6">
                <button
                  onClick={onOpen}
                  className="bg-[#70B103] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#5a9002] transition-all duration-300"
                >
                  ✏️ Update Profile
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
