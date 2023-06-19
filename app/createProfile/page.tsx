"use client"
import React,{useRef,useState} from 'react'
import localFont from 'next/font/local';
import Image from 'next/image';
import {BiPlus} from 'react-icons/bi'
import styles from '../Main.module.css'

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function page() {
  const[avatar,setAvatar]=useState<File>()
  const avatarRef=useRef<HTMLInputElement>(null)

  return (
    <div
      className={
        "bg-[#FF8080] h-fit min-h-screen w-screen flex flex-col justify-center items-center bg-center xl:flex-col xl:h-screen  overflow-hidden "+myFont.className}
    >
      <Image src="/Logo.svg" alt="Logo" height={340} width={340} className='m-6' />
      <div className='flex flex-row border-4 w-[1040px] border-white rounded-2xl justify-start p-4'>
        <div
          onClick={() => {
            avatarRef?.current?.click();
          }}
          className="h-[540px] w-[350px] rounded-2xl hover:cursor-pointer "
        >
          {avatar ? (
            <img
              onClick={() => {
                avatarRef?.current?.click();
              }}
              src={URL.createObjectURL(avatar)}
              alt="avatar"
              className="rounded-2xl h-[440px] w-[350px]"
            />
          ) : (
            <div className='bg-white h-full w-full flex justify-center items-center rounded-2xl'>
              <BiPlus fill='#FF8080' size={120}/>
            </div>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          ref={avatarRef}
          onChange={(e) => {
            if (!e.target.files) return;
            setAvatar(e.target.files[0]);
            console.log(e.target.files[0].type);
          }}
        />
        <div className='flex flex-col pl-3'>
          <input type='text' placeholder='Enter Name' className='bg-[#FF8080] border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2'/>
          <input type='text' placeholder='Enter Age' className='bg-[#FF8080] border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2'/>
          <textarea placeholder='Enter Bio' className={'bg-[#FF8080] overflow-hidden border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2 '+styles.textarea}/>
        </div>
      </div>
    </div>
  )
}

export default page