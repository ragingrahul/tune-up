"use client"
import React from 'react'
import Image from 'next/image'
import styles from '../Main.module.css'

function Main() {
  return (
    <div>
      <div className={`w-[720px] h-[505px] ${styles.bgcard}  rounded-[32px] flex justify-center`}>
        <div className={`p-4 flex flex-col items-center`}>
          <Image src="/Thumbnail.jpg" alt='Thumbnail' width={480} height={360} className='rounded-3xl'/>
          <div className='m-4 font-bold text-2xl'>
            Skyrider 2
          </div>
          <div className='font-thin'>
            Raging Rahul
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main