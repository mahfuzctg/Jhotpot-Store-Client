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
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="flex justify-center items-center min-h-screen"
    >
      {isLoading ? (
        <CustomerProfileLoading />
      ) : (
        <div className="relative  p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
          {/* Unique Hexagonal Profile Shape */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 bg-white p-1 rounded-full border-4 border-[#70B103] shadow-lg"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <img
              src={profile.profilePhoto || "/default-profile.png"}
              alt="Customer"
              loading="lazy"
              className="w-32 h-32 object-cover rounded-full transition-transform duration-300 hover:scale-110"
            />
          </div>

          <div className="mt-20 text-center">
            <h1 className="text-2xl font-bold text-gray-800">{profile.name || "N/A"}</h1>
            <p className="uppercase text-sm font-semibold text-[#70B103]">{profile.role || "Customer"}</p>

            {/* Divider */}
            <div className="w-20 border-t-2 border-[#70B103] my-4 mx-auto"></div>

            {/* Contact Details */}
            <div className="flex flex-col gap-3 text-gray-700 text-sm">
              <p className="flex items-center justify-center gap-2">
                📧 <span>{profile.email || "N/A"}</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                🏠 <span>{profile.address || "N/A"}</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                📞 <span>{profile.phone || "N/A"}</span>
              </p>
            </div>

            {/* Update Button */}
            <div className="mt-6">
              <button
                onClick={onOpen}
                className="bg-[#70B103] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-[#5a9002] transition-all duration-300 transform hover:scale-105"
              >
                ✏️ Update Profile
              </button>
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
