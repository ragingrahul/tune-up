"use client"
import React, { useRef, useState, useEffect, useContext } from 'react'
import localFont from 'next/font/local';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi'
import styles from '../Main.module.css'
import { useStream,saveToIPFS,useWallet } from '../hooks';
import { DataverseContext } from '../context/Context';
import LoadingProp from '../components/LoadingScreen';

const myFont = localFont({
  src: "../fonts/Chillax-Bold.ttf",
  display: "swap",
});

type GenderType = "Male" | "Female"

function page() {
  const {runtimeConnector}=useContext(DataverseContext)
  const {checkCapability,createPublicStream,loadStreams}=useStream()
  const {getCurrentPkh}=useWallet()
  const [avatar, setAvatar] = useState<File>()
  const [name,setName]=useState<string>()
  const [age,setAge]=useState<string>()
  const [bio,setBio]=useState<string>()
  const avatarRef = useRef<HTMLInputElement>(null)
  const [gender, setGender] = useState<GenderType | null>(null)
  const [pkh,setPkh] = useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const uploadPicture=async()=>{
    const cid=await saveToIPFS(avatar)
    console.log(cid)
    return cid
  }
  
  const getPkh=async()=>{
    const pkh=await getCurrentPkh()
    if(pkh)
      setPkh(pkh)
  }

  const handleSubmit=async()=>{
    if(!name){
      window.alert("Please enter name")
      return
    }
    if(!age){
      window.alert("Please enter age")
      return
    }
    if(!bio){
      window.alert("Enter bio")
      return
    }
    if(!gender){
      window.alert("Select gender")
      return
    }
    if(!avatar){
      window.alert("Select profile picture")
      return
    }
    setIsLoading(true)
    const cid=await uploadPicture()
    const imageLink="https://"+cid+".ipfs.w3s.link"
    const res =await createPublicStream(name,bio,imageLink,gender,parseInt(age),pkh)
    setIsLoading(false)
    console.log(res)
    window.location.href='/profile'
  }

  const getProfiles=async()=>{
    setIsLoading(true)
    const pkh=await getCurrentPkh()
    if (pkh) {
      const res = await loadStreams({
          pkh: pkh,
          modelId: "kjzl6hvfrbw6c7bhl6j6dmchepqt1vpdqskaiz1cq5e3mt5u8bmhexuyx4n6072"
      })
      console.log(res)
      if(res){
        window.location.href='/mainfeed'
      }
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    checkCapability()
    getPkh()
    getProfiles()
  },[runtimeConnector])

  return (
    <div
      className={
        "bg-[#FF8080] h-fit min-h-screen w-screen flex flex-col justify-center items-center bg-center xl:flex-col xl:h-screen  overflow-hidden " + myFont.className}
    >
      <Image src="/Logo.png" alt="Logo" height={340} width={340} className='m-6' />
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
              className="rounded-2xl h-[540px] w-[350px] object-cover"
            />
          ) : (
            <div className='bg-white h-full w-full flex justify-center items-center rounded-2xl'>
              <BiPlus fill='#FF8080' size={120} />
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
          <input type='text' 
            value={name}
            onChange={(e)=>{if(e.target){setName(e.target.value);}}}
            placeholder='Enter Name' 
            className='bg-[#FF8080] border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2' 
          />
          <input type='number'
             value={age}
             onChange={(e)=>{if(e.target){setAge(e.target.value)}}}
             placeholder='Enter Age' 
             className='bg-[#FF8080] border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2' 
          />
          <textarea 
            value={bio}
            onChange={(e)=>{if(e.target){setBio(e.target.value)}}}
            placeholder='Enter Bio' 
            maxLength={100}
            className={'bg-[#FF8080] overflow-hidden border-2 placeholder-white border-white rounded-lg text-white p-2 text-4xl focus:outline-none m-2 ' + styles.textarea} 
          />
          <div className='flex flex-row items-center'>
            <div
              className="h-[70px] w-[70px] m-2 rounded-full bg-white flex justify-center items-center hover:cursor-pointer"
              onClick={() => setGender("Male")}
            >
              <Image
                src={gender === "Male" ? '/Male_Filled.svg' : '/Male_Lined.svg'}
                height={40}
                width={40}
                alt="Male"
                className=''
              />
            </div>
            <div className='text-white text-4xl'>Male</div>
            <div
              className="h-[70px] w-[70px] m-2 rounded-full bg-white flex justify-center items-center hover:cursor-pointer"
              onClick={() => setGender("Female")}
            >
              <Image
                src={gender === "Female" ? '/Female_Filled.svg' : '/Female_Lined.svg'}
                height={40}
                width={40}
                alt="Female"
                className=''
              />
            </div>
            <div className='text-white text-4xl'>Female</div>
          </div>
          <div 
            className='bg-white text-[#FF8080] w-fit m-2 p-3 text-4xl rounded-full hover:cursor-pointer'
            onClick={handleSubmit}
          >
            Create Profile
          </div>
        </div>
      </div>
      <LoadingProp 
        isLoading={isLoading}
        title='Loading'
        desc='Creating a new Profile'
      />
    </div>
  )
}

export default page