"use client";
import React from "react";
import Image from "next/image";

interface Props {
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
}

function LikeButton(props: Props) {
  return (
    <div
      className="h-[100px] w-[100px] rounded-full bg-white flex justify-center items-center hover:cursor-pointer"
      onClick={() => props.setLiked(!props.liked)}
    >
      <Image
        src={props.liked ? "/Heart_filled.svg" : "/Heart_lined.svg"}
        height={50}
        width={50}
        alt="Like"
        className="mt-1.5"
      ></Image>
    </div>
  );
}

export default LikeButton;
