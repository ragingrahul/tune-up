"use client";
import React from "react";
import Image from "next/image";
import LikeButton from "../components/LikeButton";
import VanillaTilt from "vanilla-tilt";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function page() {
  const [liked, setLiked] = React.useState(true);
  return (
    <div
      className={
        "h-screen w-screen bg-[#FF8080] flex flex-col items-center overflow-x-hidden " +
        myFont.className
      }
    >
      <div className="flex flex-col items-center w-screen mt-16 h-fit bg-[#FF8080]">
        <div className="bg-white h-[700px] w-[500px] rounded-[40px] mt-8 relative">
          <Image
            src="/profile_pic.jpg"
            width={1000}
            height={100}
            alt="picture"
            className="object-cover h-[100%] rounded-[40px]"
          ></Image>
          <div className="h-[100%] w-[500px] bg-black absolute top-0 rounded-[40px] overlay"></div>
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

        <div className="bg-white h-[700px] w-[500px] rounded-[40px] mt-8 relative">
          <Image
            src="/profile_pic.jpg"
            width={1000}
            height={100}
            alt="picture"
            className="object-cover h-[100%] rounded-[40px]"
          ></Image>
          <div className="h-[100%] w-[500px] bg-black absolute top-0 rounded-[40px] overlay"></div>
          <div className="h-[100%] w-[100%] absolute  top-0 flex flex-col justify-between">
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

      <div className="fixed backdrop-filter w-[80%] h-[75px] bg-white-900/20 backdrop-blur-[10px] flex justify-center items-center">
        <Image
          src="/Logo.png"
          width={200}
          height={200}
          alt="Logo"
          className=""
        />
      </div>
    </div>
  );
}

export default page;
