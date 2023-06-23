"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import VanillaTilt from "vanilla-tilt";
import { DataverseContext } from "../context/Context";
import { ToggleContext } from "../context/ToggleContext";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

interface ProfileCardProps {
  name: string;
  image: string;
}

function ChatProfileCard(props: ProfileCardProps) {
  const { setToggle } = useContext(ToggleContext);
  return (
    <div
      className={
        "bg-white h-[400px] w-[500px] rounded-[40px] mt-8 relative " +
        myFont.className
      }
    >
      <img
        src={props.image}
        width={1000}
        height={100}
        alt="picture"
        className="object-cover h-[100%] rounded-[40px]"
      />
      <div className="h-[100%] w-[500px] bg-black absolute top-0 rounded-[40px] overlay"></div>
      <div className="h-[100%] w-[100%] absolute top-0 flex flex-col justify-between">
        <div className="flex justify-end p-8">
          <Image
            src="/GoButton.svg"
            width={100}
            height={100}
            alt="GoButton"
            className="hover:scale-110 transition duration-300 ease-in-out"
            onClick={() => {
              setToggle(false);
            }}
          />
        </div>
        <div>
          <h1 className="text-white p-8 text-[50px]">{props.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default ChatProfileCard;
