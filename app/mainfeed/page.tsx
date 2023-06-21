"use client";
import React from "react";
import Image from "next/image";
import LikeButton from "../components/LikeButton";
import localFont from "next/font/local";
import ProfileCard from "../components/ProfileCard";

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

function page() {
  return (
    <div
      className={
        "h-screen w-screen bg-[#FF8080] flex flex-col items-center overflow-x-hidden " +
        myFont.className
      }
    >
      <div className="flex flex-col items-center w-screen mt-16 h-fit bg-[#FF8080] pb-32">
        {profiles.map((profile) => (
          <ProfileCard
            name={profile.name}
            age={profile.age}
            image={profile.image}
          />
        ))}
      </div>

      <div className="fixed backdrop-filter top-3 rounded-2xl hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-[#ff8080] w-[450px] h-[75px] bg-white-900/20 backdrop-blur-[10px] flex justify-center items-center">
        <Image
          src="/Logo.png"
          width={200}
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
