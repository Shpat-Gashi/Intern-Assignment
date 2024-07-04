import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="h-[88px] w-full top-0 flex items-center justify-between bg-[#132a3c] shadow-lg px-4">
      <div className="flex items-center ml-[150px]">
        <Link href="/">
          <Image
            src="/pabau.webp"
            width={85}
            height={75}
            alt="pabau"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4 mr-44">
        <Link href="/">
          <IoMdHome className="text-white h-8 w-auto hover:text-[#d7d7d7]" />
        </Link>
        <Link href="/add-booking">
          <IoAddCircleOutline className="text-white h-8 w-auto hover:text-[#d7d7d7]" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
