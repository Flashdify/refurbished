'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCartSharp } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";


const Header = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const checkPath = () => {
      const currentPath = window.location.pathname;
      setIsLoginPage(
        currentPath.includes("login") ||
        currentPath.includes("signup") ||
        currentPath.includes("home")
      );
    };

    checkPath();
    window.addEventListener("popstate", checkPath);

    return () => {
      window.removeEventListener("popstate", checkPath);
    };
  }, []);

  return (
    <header className="bg-sereneBlue-700 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="relative">
          <Link
            href="/"
            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/vis/logo.jpg"
              width={100}
              height={100}
              alt="Logo"
              className="rounded-full"
            />
          </Link>
        </div>
        <nav>
        <ul className="flex space-x-6 items-center">
  {/* Cart Icon */}
  <li>
    <Link href="/cart" className="hover:text-gray-300 flex items-center">
      <div className="border border-black p-3 rounded-full flex items-center justify-center w-12 h-12">
        <IoCartSharp className="text-2xl" /> {/* Icon size */}
      </div>
    </Link>
  </li>

  {/* Home Link (conditional based on isLoginPage) */}
  {!isLoginPage && (
    <li>
      <Link href="/home" className="hover:text-gray-300 flex items-center">
        <div className="border border-black p-3 rounded-full flex items-center justify-center px-5 py-2">
          <span className="text-lg font-medium">Home</span> {/* Adjusted text size */}
        </div>
      </Link>
    </li>
  )}

  {/* Login Icon Only */}
  <li>
    <Link href="/login" className="hover:text-gray-300 flex items-center">
      <div className="border border-black p-3 rounded-full flex items-center justify-center w-12 h-12">
        <VscAccount className="text-2xl" /> {/* Icon size */}
      </div>
    </Link>
  </li>
</ul>

        </nav>
      </div>
    </header>
  );
};

export default Header;
