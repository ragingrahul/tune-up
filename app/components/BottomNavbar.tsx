"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { DataverseContext } from "../context/Context";

function BottomNavbar() {
  const { pkh } = useContext(DataverseContext);
  return (
    <div className="fixed backdrop-filter hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-white bottom-3 w-[400px] h-[100px] bg-slate-50/20 backdrop-blur-[10px] rounded-3xl flex justify-between items-center">
      <Image
        src="/ProfileIcon.svg"
        width={60}
        height={200}
        alt="Logo"
        className="ml-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        onClick={() => (window.location.href = `/profile/${pkh}`)}
      />
      <Image
        src="/LikeIcon.svg"
        width={60}
        height={200}
        alt="Logo"
        className="hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        onClick={() => (window.location.href = `/matches`)}
      />
      <Image
        src="/FeedIcon.svg"
        width={60}
        height={200}
        alt="Logo"
        className="mr-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        onClick={() => (window.location.href = `/mainfeed`)}
      />
    </div>
  );
}

export default BottomNavbar;
