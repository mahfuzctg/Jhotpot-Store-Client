"use client";

import { Link as NextUILink } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/config/site";
import logo from "@/src/assets/logo.jpg";
import useUserDetails from "@/src/hooks/CustomHooks/useUserDetails";
import NavbarUserDropdown from "./NavbarUserDropdown";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import CartDrawer from "../../CartDrawer/CartDrawer";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { useDisclosure } from "@nextui-org/modal";
import { totalProductsCount } from "@/src/lib/redux/features/products/product.slice";
import MainModal from "../../modal/Reusable/MainModal";
import NavSearchModal from "../../modal/Reusable/NavSearchModal";
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const { userData, isLoading } = useUserDetails();
  const totalProductInCart = useAppSelector(totalProductsCount);
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onOpenChange: onSearchChange } = useDisclosure();
  
  // State to manage CartDrawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isActive = (href: string) => pathname === href ? "text-white" : "text-white";  // Simplified active check

  return (
    <>
<>
  {/* Top Navigation Bar */}
  <div className="bg-[#fff] py-2 text-[#82C408] text-sm hidden lg:flex ">
    <div className="w-9/12 mx-auto flex justify-between items-center px-24">
      {/* Left Side: Contact Information */}
      <div className="flex flex-wrap space-x-6 sm:space-x-4 gap-2 sm:gap-4">
        <span className="block sm:inline">123 Main Street, Ctg, Bangladesh</span>
        <span className="block sm:inline">+123 456 7890</span>
        <span className="block sm:inline">jhotpot@gmail.com</span>
      </div>

      {/* Right Side: Social Media Icons */}
      <div className="flex space-x-4 sm:space-x-3 ml-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-[#82C408] text-xl hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-[#82C408] text-xl hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-[#82C408] text-xl hover:text-gray-300 transition duration-200" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-[#82C408] text-xl hover:text-gray-300 transition duration-200" />
        </a>
      </div>
    </div>
  </div>
</>


      {/* Main Navbar */}
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="bg-[#82C408]  pb-1 "
        classNames={{
          item: [
            "flex",
            "relative",
       
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:-bottom-3",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[3px]",
            "data-[active=true]:after:rounded-[3px]",
            "data-[active=true]:after:bg-white",
          ],
        }}
      >
        {/* Logo Section - Left */}
        <NavbarBrand className="mt-3 flex items-center">
          <div className="lg:hidden">
            <NavbarMenuToggle />
          </div>
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              height={50}
              width={50}
              className="hidden lg:flex  rounded-full"
            />
            <span className="ml-4 text-white font-semibold ">
              JHOTPOT <span className="text-black">STORE</span>
            </span>
          </Link>
        </NavbarBrand>

        {/* Routes Section - Center */}
        <NavbarContent justify="center" className="lg:flex hidden gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              className={`text-lg ${isActive(item.href)}`}
              key={item.label}
              isActive={pathname === item.href}
            >
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Right Section - Search, Cart, and Profile */}
        <NavbarContent justify="end">
          <NavbarItem className="flex gap-4 items-center">
            {/* Search Button */}
            <IoSearch
              onClick={onSearchOpen}
              className="text-white text-2xl cursor-pointer"
            />

            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-white hover:text-[#82C408] transition duration-200"
              >
                <FiShoppingCart size={20} />
              </button>
            </div>

            {/* Profile/Dropdown */}
            {isLoading ? (
              <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400" />
            ) : userData ? (
              <NavbarUserDropdown user={userData} />
            ) : (
              <Link href="/login">
                <div className=" md:block mx-2">
                  <button className="relative h-10 w-30 origin-top transform rounded-lg border-2 border-white text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-black hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold px-3">
                    Login
                  </button>
                </div>
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>

        {/* Navbar Menu for Mobile */}
        <NavbarMenu>
          <div className="mx-4 mt-6 flex flex-col justify-center items-center gap-3">
            {siteConfig.navMenuItems
              .filter((item) => !(item.label === "Login" && userData?.userData))
              .map((item, index) => (
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  <NextUILink
                    color="primary"
                    href={item.href}
                    size="lg"
                    className="font-bold"
                  >
                    <span className="py-2 border-2 border-white text-center w-96 md:w-[600px] rounded-2xl">
                      {item.label}
                    </span>
                  </NextUILink>
                </NavbarMenuItem>
              ))}
          </div>
        </NavbarMenu>

        {/* Search Modal */}
        <MainModal isOpen={isSearchOpen} onOpenChange={onSearchChange}>
          <NavSearchModal />
        </MainModal>
      </NextUINavbar>

      {/* Cart Drawer */}
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} isOpen={false} />}
    </>
  );
}
