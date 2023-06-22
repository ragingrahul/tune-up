"use client"
import React, { useRef, useState, useEffect, useContext } from 'react'
import localFont from 'next/font/local';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi'
import styles from '../Main.module.css'
import { useStream, saveToIPFS, useWallet } from '../hooks';
import { DataverseContext } from '../context/Context';
import LikeButton from '../components/LikeButton';

const myFont = localFont({
    src: "../fonts/Chillax-Bold.ttf",
    display: "swap",
});

function page() {
    const [liked, setLiked] = React.useState(false);
    return (
        <div
            className={
                "bg-[#FF8080] h-fit min-h-screen w-screen flex flex-col justify-center items-center bg-center xl:flex-col xl:h-screen  overflow-hidden " + myFont.className}
        >
            <Image src="/Logo.png" alt="Logo" height={340} width={340} className='m-6' />
            <div className='flex relative flex-row border-4 w-[1040px] border-white rounded-2xl justify-start p-6'>
                <img
                    src='./profile_pic2.jpg'
                    width={400}
                    height={250}
                    alt="picture"
                    className="object-cover h-[100%] rounded-[40px]"
                />
                <div className='flex flex-col pl-6 justify-between'>
                    <div>
                        <div className='text-white text-8xl mb-3'>21</div>
                        <div className='text-white text-6xl mb-3'>Raging Rahul </div>
                    </div>
                    <div className='text-white text-5xl mb-3'>I am the smart guy that you cant help but be impressed by.</div>
                </div>
                <div className='absolute top-5 right-5'>
                    <LikeButton  setLiked={setLiked} liked={liked} />
                </div>                
            </div>
            
        </div>
    )
}


export default page