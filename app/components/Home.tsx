"use client";
import React from "react";
import Image from "next/image";
import styles from "../Main.module.css";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function HomePage() {
  const router = useRouter();
  const [liked, setLiked] = React.useState(true);
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
        <div
          className="bg-white w-[350px] h-[80.7px] rounded-full flex items-center justify-center text-[#FF8080] text-[50px] hover:cursor-pointer mt-12"
          onClick={() => router.push("/feed")}
        >
          Connect
        </div>
      </div>
      <div className="flex justify-center items-center w-[50%] h-full">
        <div className="bg-white h-[80%] w-[60%] rounded-[40px] relative">
          <Image
            src="/profile_pic.jpg"
            width={1000}
            height={100}
            alt="picture"
            className="object-cover h-[100%] rounded-[40px]"
          ></Image>
          <div className="h-[100%] w-[100%] bg-black absolute top-0 rounded-[40px] overlay"></div>
          <div className="h-[100%] w-[100%] absolute top-0 flex flex-col justify-between">
            <div className="flex justify-between p-8">
              <h1 className="text-white text-[75px]">21</h1>
              <LikeButton setLiked={setLiked} liked={liked} />
            </div>
            <div>
              <h1 className="p-8 text-[50px]">Anoy Roy Chowdhury</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
