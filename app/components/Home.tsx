"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import { DataverseContext } from "@/app/context/Context";
import { useWallet } from "../hooks";
import VanillaTilt from "vanilla-tilt";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function HomePage() {
  const router = useRouter();
  const [liked, setLiked] = React.useState(true);
  const imagePanel = useRef(null);

  const { wallet, connectWallet } = useWallet();
  const { runtimeConnector } = useContext(DataverseContext);

  useEffect(() => {
    connectWallet();
  }, [runtimeConnector]);

  useEffect(() => {
    if (imagePanel.current)
      VanillaTilt.init(imagePanel.current, {
        max: 5,
        speed: 200,
      });
  }, []);

  return (
    <div
      className={
        "bg-[#FF8080] h-fit min-h-screen w-screen flex pl-0 flex-col xl:flex-row xl:h-screen xl:pl-16 overflow-hidden " +
        myFont.className
      }
    >
      <div className="flex flex-col justify-center w-screen xl:w-[50%] mt-20 h-full items-center xl:items-start xl:mt-0">
        <Image src="/Logo.png" width={500} height={500} alt="Logo" />
        <h1 className="text-[75px] leading-[5rem] mt-24 text-white text-center xl:text-left">
          We’re here to remind <br /> you that you’re not <br /> alone.
        </h1>
        <div
          className="bg-white w-[350px] h-[80.7px] rounded-full flex items-center justify-center text-[#FF8080] text-[50px] hover:cursor-pointer mt-12"
          onClick={connectWallet}
        >
          Launch
        </div>
      </div>
      <div
        className="flex justify-center items-center w-screen xl:w-[50%] mt-20 h-full xl:mt-0"
        ref={imagePanel}
      >
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
