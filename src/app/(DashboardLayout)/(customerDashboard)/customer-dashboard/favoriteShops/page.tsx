"use client";

import DashboardSectionTitle from "@/src/components/ui/components/DashboardSectionTitle";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { useUnfollowUserMutation } from "@/src/lib/redux/features/users/user.api";
import { IFollow, IVendor } from "@/src/types/schema";
import toast from "react-hot-toast";
import shop from "@/src/assets/store-logo.png";
import Image from "next/image";

const FavoriteShops = () => {
  const { userData, isLoading } = useUserDetails();
  const [unfollowUser] = useUnfollowUserMutation();

  console.log(userData?.userData?.follows);

  const handleunfollowVendor = async (vendor: IVendor) => {
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
    <div>
      <DashboardSectionTitle heading="Favorite Shops" />

      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <div>
            {userData?.userData?.follows?.length > 0 ? (
              <div
                className={`w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-center`}
              >
                {userData?.userData?.follows?.map((singleFollow: IFollow) => (
                  <div
                    key={singleFollow?.id}
                    className="relative w-full max-w-2xl my-5 md:my-16 flex flex-col items-start space-y-2 sm:space-x-6 px-4 py-4 border-2 border-dashed border-primary shadow-lg rounded-lg"
                  >
                    <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary text-gray-300 border-primary border-b-2 border-r-2 border-dashed">
                      Shop
                    </span>
                    <div className="w-full flex justify-center sm:justify-start sm:w-auto">
                      <img
                        className="object-cover h-16 mt-3 mr-3"
                        src={singleFollow?.vendor?.logo}
                        alt="Author"
                      />
                    </div>
                    <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
                      <p
                        className="font-display mb-2 text-xl font-semibold text-gray-200"
                        itemProp="author"
                      >
                        {singleFollow?.vendor?.shopName}
                      </p>
                      <div className="mb-4 text-gray-300 h-12">
                        <p>{singleFollow?.vendor?.description}</p>
                      </div>
                      <button
                        onClick={() =>
                          handleunfollowVendor(singleFollow?.vendor)
                        }
                        className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-black hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3"
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
                <p className="text-3xl text-center text-black mt-4">
                  You haven&apos;t followed any shop yet.
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