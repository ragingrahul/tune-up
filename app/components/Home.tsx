"use client";
import React from "react";
import Image from "next/image";
import styles from "../Main.module.css";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function HomePage() {
  const router = useRouter();
  return (
    <div
      className={
        "bg-[#FF8080] h-screen w-screen flex pl-16 " + myFont.className
      }
    >
      <div className="flex flex-col justify-center w-[50%] h-full">
        <Image src="/Logo.svg" width={500} height={500} alt="Logo" />
        <h1 className="text-[75px] leading-[5rem] mt-24 text-white">
          We’re here to remind <br /> you that you’re not <br /> alone.
        </h1>
        <div className="bg-white w-[350px] h-[80.7px] rounded-full flex items-center justify-center text-[#FF8080] text-[50px] hover:cursor-pointer mt-12">
          Connect
        </div>
      </div>
      <div className="flex justify-center w-[50%] h-full bg-white"></div>
    </div>
  );
}

export default HomePage;
