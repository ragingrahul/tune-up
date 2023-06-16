"use client";
import React from "react";
import Image from "next/image";
import styles from "../Main.module.css";
import VideoCard from "../props/VideoCard";
import { useRouter } from "next/navigation";

const videoDetails = [
  { videoName: "Two Strays", authorName: "Stefan Konnor" },
  { videoName: "Skyrider 2", authorName: "Raging Rahul" },
  { videoName: "Cyber Skies 3", authorName: "Anoy Hakus" },
];

function Main() {
  const router = useRouter();
  return (
    <div className="bg-black">
      {videoDetails.map((video) => (
        <VideoCard videoName={video.videoName} authorName={video.authorName} />
      ))}
      <button
        className="bg-red-500 text-white p-2 rounded-md"
        onClick={() => router.push("/VideoPage")}
      >
        Go to Videos
      </button>
    </div>
  );
}

export default Main;
