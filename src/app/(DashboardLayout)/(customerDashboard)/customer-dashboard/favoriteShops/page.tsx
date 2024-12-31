"use client";

import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useUnfollowUserMutation } from "@/src/lib/redux/features/users/user.api";
import { IFollow, IVendor } from "@/src/types/schema";
import toast from "react-hot-toast";
import shop from "@/src/assets/logo.jpg";
import Image from "next/image";
import Title from "@/src/components/Sections/title";

const FavoriteShops = () => {
  const { userData, isLoading } = useUserDetails();
  const [unfollowUser] = useUnfollowUserMutation();

  const handleUnfollowVendor = async (vendor: IVendor) => {
    const vendorInfo = {
      vendorId: vendor.id,
    };

    await toast.promise(unfollowUser(vendorInfo).unwrap(), {
      loading: "Unfollowing...",
      success: `You unfollowed ${vendor?.shopName}`,
      error: "Failed to unfollow shop",
    });
  };

  return (
    <div className="p-6">
      <Title sub="Manage and view all the shops you've followed. Unfollow them at any time with ease." heading="Favorite Shops" />

      <div className="mt-6">
        {isLoading ? (
          <div className="text-center text-lg text-gray-600">Loading...</div>
        ) : (
          <div>
            {userData?.userData?.follows?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData?.userData?.follows?.map((singleFollow: IFollow) => (
                  <div
                    key={singleFollow?.id}
                    className="relative flex flex-col items-start bg-white p-6 rounded-xl shadow-lg border border-gray-300 hover:border-[#70B103] transition-all duration-300"
                  >
                    <span className="absolute text-xs font-medium top-2 left-2 px-2 py-1 bg-[#70B103] text-white rounded-full">
                      Shop
                    </span>

                    <div className="flex justify-center sm:justify-start w-full mb-4">
                      <Image
                        className="object-cover h-20 w-20 rounded-full"
                        src={singleFollow?.vendor?.logo || shop}
                        alt="Shop Logo"
                        width={80}
                        height={80}
                      />
                    </div>

                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {singleFollow?.vendor?.shopName}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm h-16 overflow-hidden">
                        {singleFollow?.vendor?.description}
                      </p>

                      <button
                        onClick={() =>
                          handleUnfollowVendor(singleFollow?.vendor)
                        }
                        className="mt-4 py-2 px-6 bg-[#70B103] text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                      >
                        Unfollow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center w-full">
                <Image src={shop} alt="shop" width={160} height={160} />
                <p className="text-3xl text-center text-gray-700 mt-4">
                  You haven't followed any shop yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteShops;
