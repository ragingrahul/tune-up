"use client";
import React, { useContext, useEffect, useRef } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import LikeButton from "./LikeButton";
import VanillaTilt from "vanilla-tilt";

interface MessageDialogProps {
  message: string;
  isYou: boolean;
}

function MessageDialog(props: MessageDialogProps) {
  return (
    <div
      className="flex items-center w-[100%] font-sans"
      style={{
        flexDirection: props.isYou ? "row-reverse" : "row",
      }}
    >
      <div
        className="rounded-[20px] p-4 m-4"
        style={{
          maxWidth: "50%",
          backgroundColor: props.isYou ? "#ffffff" : "#ff8080",
          border: props.isYou ? "" : "1px solid #ffffff",
          color: props.isYou ? "#000000" : "#ffffff",
        }}
      >
        <p className="">{props.message}</p>
      </div>
    </div>
  );
}

export default MessageDialog;
