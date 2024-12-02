"use client";

import logo from "@/src/assets/store-logo.png";
import { siteConfig } from "@/src/config/site";

import { Button } from "@nextui-org/button";
import { Link as NextUILink } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const user = false;

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="pt-2 pb-1 lg:pb-4"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:-bottom-3",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[3px]",
          "data-[active=true]:after:rounded-[3px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand className="mt-3">
        <div className="lg:hidden">
          <NavbarMenuToggle />
        </div>
        <Image
          src={logo}
          alt="logo"
          height={80}
          width={80}
          className="hidden lg:flex py-1"
        />
      </NavbarBrand>

      <NavbarContent justify="center">
        <div className="hidden lg:flex gap-6">
          {siteConfig.navItems.map((item) => (
            <NavbarItem
              className={`text-lg ${
                pathname === item.href ? "text-primary" : "text-white"
              }`}
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
        </div>
        {/* <Image
          src={logo}
          alt="logo"
          height={170}
          width={170}
          className="flex lg:hidden"
        /> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          {isLoading ? (
            <div className="animate-pulse w-10 h-10 rounded-full bg-gray-400 " />
          ) : user ? (
            // <NavbarUserDropdown user={user} />
            ""
          ) : (
            <Link href="/login">
              <div className="hidden md:block">
                <Button color="secondary">Login</Button>
              </div>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <NextUILink
                color="primary"
                href={item.href}
                size="lg"
                className="font-bold"
              >
                {item.label}
              </NextUILink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
