"use client";

import { protectedRoutes } from "@/src/constant";
import { logout } from "@/src/lib/redux/features/auth/auth.slice";
import { clearCoupon } from "@/src/lib/redux/features/coupon/couponSlice";
import { clearCart } from "@/src/lib/redux/features/products/product.slice";

import { useAppDispatch } from "@/src/lib/redux/hooks";
import { logoutService } from "@/src/utils/loginService";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

import { LayoutDashboard, LogOut, User, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavbarUserDropdown({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { userData } = user;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearCoupon());
    logoutService();

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }

    toast.success("Logged out successfully", { duration: 3000 });
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform duration-300 transform hover:scale-110 cursor-pointer border-2 border-blue-500"
            src={userData?.role === "VENDOR" ? userData?.logo : userData?.profilePhoto}
            alt="User Avatar"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-gradient-to-r from-[#4c6ef5] to-[#4c9aff] rounded-lg p-3 shadow-lg"
        >
          <DropdownItem key="profile" className="h-14 gap-2 px-4 py-2 rounded-lg hover:bg-[#82C408] transition-colors duration-200">
            <p className="font-semibold text-gray-100">Signed in as</p>
            <p className="font-semibold text-black">{userData?.email}</p>
          </DropdownItem>

          <DropdownItem
            onClick={() =>
              handleNavigation(
                userData?.role === "CUSTOMER"
                  ? "/customer-dashboard"
                  : userData?.role === "VENDOR"
                  ? "/vendor-dashboard"
                  : "/admin-dashboard"
              )
            }
            key="dashboard"
            className="px-4 py-2 rounded-lg hover:bg-[#82C408] transition-colors duration-200"
          >
            <span className="flex items-center gap-2 text-black">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </span>
          </DropdownItem>

          <DropdownItem
            onClick={handleLogout}
            key="logout"
            color="danger"
            className="px-4 py-2 rounded-lg hover:bg-[#ff6b6b] transition-colors duration-200"
          >
            <span className="flex items-center gap-2 text-black">
              <LogOut size={18} />
              <span>Logout</span>
            </span>
          </DropdownItem>

          <DropdownItem
            onClick={() => handleNavigation("/settings")}
            key="settings"
            className="px-4 py-2 rounded-lg hover:bg-[#82C408] transition-colors duration-200"
          >
            <span className="flex items-center gap-2 text-black">
              <Settings size={18} />
              <span>Settings</span>
            </span>
          </DropdownItem>
          
          {/* Add a fun emoji for more interaction */}
          <DropdownItem key="help" className="px-4 py-2 rounded-lg hover:bg-[#82C408] transition-colors duration-200">
            <span className="flex items-center gap-2 text-black">
              <User size={18} />
              <span>Need Help? 🤔</span>
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
