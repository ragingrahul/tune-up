import React from 'react'
import Image from 'next/image'

function BottomNavbar() {
  return (
    <div>
        <div className="fixed backdrop-filter hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-white bottom-3 w-[400px] h-[100px] bg-slate-50/20 backdrop-blur-[10px] rounded-3xl flex justify-between items-center">
        <Image
          src="/ProfileIcon.svg"
          width={60}
          height={200}
          alt="Logo"
          className="ml-10 hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
          onClick={()=>window.location.href=`/profile`}
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
  )
}

export default BottomNavbar