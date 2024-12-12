"use client";

import { protectedRoutes } from "@/src/constant";
import { logout } from "@/src/lib/redux/features/auth/authSlice";
import { clearCoupon } from "@/src/lib/redux/features/coupon/couponSlice";
import { clearCart } from "@/src/lib/redux/features/products/productSlice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { logoutService } from "@/src/utils/loginService";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import logo from "@/src/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  commonLinks: SidebarLink[];
}

const Sidebar = ({ links, commonLinks }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useUserDetails();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearCoupon());
    logoutService();

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }

    toast.success("Logged out successfully!", { duration: 3000 });
  };

  return (
    <div>
      <div
        id="view"
        className="h-full flex flex-row drawer lg:drawer-open z-50"
        // eslint-disable-next-line react/no-unknown-property
        x-data="{ sidenav: true }"
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div
          className="drawer-content flex flex-col items-start mt-5 ml-2"
          style={{ backgroundColor: "white !important" }}
        >
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block h-6 w-6 stroke-current text-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>

        <div
          id="sidebar"
          className="drawer-side h-full max-h-screen overflow-y-scroll"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
            height: "100vh" /* Ensure full viewport height */,
            overflowY: "auto" /* Enable scrolling */,
          }}
          // eslint-disable-next-line react/no-unknown-property
          x-show="sidenav"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <div className="menu p-4 w-64 md:w-80 min-h-full bg-base-200 text-base-content">
            <div className="space-y-3">
              {/* Company logo */}
              <div className="mb-5 flex justify-center items-center">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    height={65}
                    width={65}
                    className=""
                  />
                </Link>
              </div>

              {/* User Image */}
              <div className="flex justify-center items-center pt-2">
                {userData?.userData?.profilePhoto ? (
                  <Avatar
                    src={userData?.userData?.profilePhoto}
                    className="w-16 h-16 text-large"
                  />
                ) : (
                  <div className="animate-pulse rounded-full bg-gray-400 w-20 h-20" />
                )}
              </div>

              {/* User Name */}
              <div className="font-bold md:text-xl text-center text-primary">
                {userData?.userData?.name}
              </div>

              <nav className="p-2 space-y-3">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-start md:items-center space-x-2 py-1 px-2 hover:bg-primary hover:text-white rounded font-bold"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>

              <Divider className="" />

              <nav className="p-2 space-y-3">
                {commonLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center space-x-2 py-1 px-2 hover:bg-primary hover:text-white rounded font-bold"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>

              <Divider className="" />

              <div onClick={handleLogout} className="px-2 cursor-pointer">
                <div className="flex items-start md:items-center space-x-2 py-1 px-2 hover:bg-primary hover:text-white rounded font-bold">
                  {/* Logout SVG */}
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
