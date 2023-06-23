"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import LikeButton from "../components/LikeButton";
import localFont from "next/font/local";
import ProfileCard from "../components/ProfileCard";
import { useStream, useWallet } from "../hooks";
import { DataverseContext } from "../context/Context";
import { objectToArray } from "../utils/address";
import ChatProfileCard from "../components/ChatProfileCard";
import ChatMenu from "../components/ChatMenu";
import { ToggleContext } from "../context/ToggleContext";

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

const profiles = [
  {
    name: "Anoy Roy Chowdhury",
    age: 21,
    image: "/profile_pic.jpg",
  },
  {
    name: "Rahul Raj Sarma",
    age: 22,
    image: "/profile_pic2.jpg",
  },
];

const ProfileMenu = () => {
  return (
    <>
      {profiles?.map((profile: any) => (
        <ChatProfileCard name={profile.name} image={profile.image} />
      ))}

      <h1 className="mt-4 font-sans text-center">
        Chats are initiated when <br />
        both of you liked each <br />
        other
      </h1>
    </>
  );
};

function page() {
  const { toggle } = useContext(ToggleContext);
  return (
    <div
      className={
        "h-screen w-screen bg-[#FF8080] flex flex-col items-center overflow-x-hidden " +
        myFont.className
      }
    >
      <div className="flex flex-col items-center w-screen mt-16 h-fit bg-[#FF8080] pb-32">
        {toggle ? <ProfileMenu /> : <ChatMenu />}
      </div>

      <div className="fixed backdrop-filter top-3 rounded-2xl hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-[#ff8080] w-[450px] h-[75px] bg-white-900/20 backdrop-blur-[10px] flex justify-center items-center">
        <Image
          src="/ChatLogo.png"
          width={150}
          height={200}
          alt="Logo"
          className=""
        />
      </div>

      <div className="fixed backdrop-filter hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-white bottom-3 w-[400px] h-[100px] bg-slate-50/20 backdrop-blur-[10px] rounded-3xl flex justify-between items-center">
        <Image
          src="/ProfileIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="ml-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        />
        <Image
          src="/LikeIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        />
        <Image
          src="/ChatIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="mr-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

export default page;
