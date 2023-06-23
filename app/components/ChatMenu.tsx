"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import VanillaTilt from "vanilla-tilt";
import MessageDialog from "./MessageDialog";
import { DataverseContext } from "../context/Context";
import { ToggleContext } from "../context/ToggleContext";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

interface ChatMenuProps {}

function ChatMenu(props: ChatMenuProps) {
  const { setToggle } = useContext(ToggleContext);
  return (
    <>
      <div className="bg-white-900/20 h-[350px] w-[500px] absolute backdrop-filter backdrop-blur-[10px]"></div>
      <div
        className={
          "bg-white h-[175px] w-[500px] rounded-[40px] mt-8 absolute " +
          myFont.className
        }
      >
        <img
          src={"/profile_pic.jpg"}
          width={1000}
          height={100}
          alt="picture"
          className="object-cover h-[100%] rounded-[40px]"
        />
        <div className="h-[100%] w-[500px] absolute top-0 rounded-[40px] backdrop-filter bg-white-900/20 backdrop-blur-[10px]"></div>
        <div className="h-[100%] w-[100%] absolute top-0 flex flex-col justify-between">
          <div className="flex justify-between p-7">
            <h1 className="text-white text-[40px]">Anoy Roy Chowdhury</h1>
            <Image
              src="/CloseIcon.svg"
              width={100}
              height={100}
              alt="GoButton"
              className="hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => setToggle(true)}
            />
          </div>
        </div>
      </div>
      <div className="bg-white h-[100px] w-[500px] rounded-[30px] mt-[230px] flex items-center justify-between px-5 absolute">
        <input
          type="text"
          className="bg-white border-2 border-[#ff8080] h-[60%] w-[82%] rounded-[15px] font-sans text-black placeholder:text-slate-600/30 text-2xl px-4"
          placeholder="Message"
        ></input>
        <div className=" hover:bg-slate-400/10 group h-[60%] w-[15%] rounded-[15px] flex items-center justify-center transition duration-300 ease-in-out">
          <Image
            src="/SendIcon.svg"
            width={30}
            height={100}
            alt="SendIcon"
            className="group-hover:scale-110 transition duration-300 ease-in-out"
          />
        </div>
      </div>
      <div className="h-fit w-[500px] mt-[350px] flex flex-col items-center justify-center px-5">
        {messages.map((message) => (
          <MessageDialog message={message.message} isYou={message.isYou} />
        ))}
      </div>
    </>
  );
}

const messages = [
  {
    message: "I see trees of green",
    isYou: true,
  },
  {
    message: "Red roses too",
    isYou: false,
  },
  {
    message: "I see them bloom",
    isYou: true,
  },
  {
    message: "For me and you",
    isYou: false,
  },
  {
    message: "And I think to myself",
    isYou: true,
  },
  {
    message: "What a wonderful world",
    isYou: false,
  },
];

export default ChatMenu;
