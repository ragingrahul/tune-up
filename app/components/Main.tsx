"use client"
import React from 'react'
import Image from 'next/image'
import styles from '../Main.module.css'
import VideoCard from '../props/VideoCard'

const videoDetails=[
  {"videoName":"Two Strays","authorName":"Stefan Konnor"},
  {"videoName":"Skyrider 2","authorName":"Raging Rahul"},
  {"videoName":"Cyber Skies 3","authorName":"Anoy Hakus"},
]

function Main() {
  return (
    <div className='bg-black'>
      {
        videoDetails.map(video=><VideoCard videoName={video.videoName} authorName={video.authorName}/>)
      }
    </div>
  )
}

export default Main