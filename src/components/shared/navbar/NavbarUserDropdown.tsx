"use client";

import { protectedRoutes } from "@/src/constant";
import { logout } from "@/src/lib/redux/features/auth/auth.slice";

import { useAppDispatch } from "@/src/lib/redux/hooks";
import { logoutService } from "@/src/utils/loginService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { LayoutDashboard, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavbarUserDropdown({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { userData } = user;

  const handleLogout = () => {
    dispatch(logout());
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
    <div className="flex justify-start w-[50%] gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform hover:scale-110 border-2 border-gray-200 shadow-lg"
            src={userData?.profilePhoto}
            size="lg"
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-2xl p-3"
        >
          <DropdownItem key="profile" className="flex flex-col gap-1 px-4 py-2">
            <span className="text-sm font-semibold">Signed in as</span>
            <span className="text-sm font-medium">{userData?.email}</span>
          </DropdownItem>
          <DropdownItem
            key="dashboard"
            onClick={() =>
              handleNavigation(
                userData?.role === "USER"
                  ? "/user-dashboard"
                  : "/admin-dashboard"
              )
            }
            className="flex items-center gap-2 px-4 py-2 hover:bg-green-500 rounded-md transition duration-200 ease-in-out"
          >
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </DropdownItem>
          <DropdownItem
            key="logout"
            onClick={handleLogout}
            color="danger"
            className="flex items-center gap-2 px-4 py-2 hover:bg-red-500 rounded-md transition duration-200 ease-in-out"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
