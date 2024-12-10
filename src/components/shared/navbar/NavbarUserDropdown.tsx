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
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={userData?.profilePhoto}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold text-white">Signed in as</p>
            <p className="font-semibold text-white">{userData?.email}</p>
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              handleNavigation(
                userData?.role === "USER"
                  ? "/user-dashboard"
                  : "/admin-dashboard"
              )
            }
          >
            <span className="flex items-center gap-2 text-white">
              <span>
                <LayoutDashboard size={16} />
              </span>
              <span>Dashboard</span>
            </span>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            <span className="flex items-center gap-2 text-white">
              <span>
                <LogOut size={16} />
              </span>
              <span>Logout</span>
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}