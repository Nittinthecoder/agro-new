"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";


import { navLinks } from "@/lib/constants";

const TopNavBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-green-500 shadow-xl ">
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((links) => (
          <Link
            href={links.url}
            key={links.label}
            className={`flex gap-4 text-sm ${pathname === links.url ? "text-black" : "text-gray-300"}`}
          >
            {links.icon} <p>{links.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center max-md:left-72">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-lime-300 shadow-xl rounded-lg">
            {navLinks.map((links) => (
              <Link
                href={links.url}
                key={links.label}
                className="flex gap-4 text-sm"
              >
                {links.icon} <p>{links.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopNavBar;
