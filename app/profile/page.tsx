"use client"
import React, { useRef, useState, useEffect, useContext } from 'react'
import localFont from 'next/font/local';
import Image from 'next/image';
import { BiPlus } from 'react-icons/bi'
import styles from '../Main.module.css'
import { useStream, saveToIPFS, useWallet } from '../hooks';
import { DataverseContext } from '../context/Context';
import LikeButton from '../components/LikeButton';
import { objectToArray } from "../utils/address";
import LoadingProp from '../components/LoadingScreen';


const myFont = localFont({
    src: "../fonts/Chillax-Bold.ttf",
    display: "swap",
});

function page() {
    const [liked, setLiked] = useState(false);
    const [profileArray, setProfileArray] = useState<any>()
    const { loadStreams, checkCapability } = useStream()
    const { getCurrentPkh } = useWallet()
    const { runtimeConnector, ownProfile } = useContext(DataverseContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pkh, setPkh] = useState<string>()

    const getProfiles = async () => {
        setIsLoading(true);
        const pkh=await getCurrentPkh();
        if (pkh) {
            const res = await loadStreams({
                pkh: pkh,
                modelId: "kjzl6hvfrbw6c5v0ce3x14dusz2qebnzosn596q6pd3dp4oaqkq3zwdohgbb3qd"
            })

            //console.log(res)
            const result = objectToArray(res)
            console.log(result)
            setIsLoading(false);
            setProfileArray(result)
        }
    }

    const isConnected = async () => {
        setIsLoading(true)
        const res = await checkCapability()
        if (res) {
            const pkh = await getCurrentPkh()
            setPkh(pkh)
            console.log(pkh)
        }
        setIsLoading(false)
        return res
    }

    useEffect(() => {
        isConnected()
        getProfiles()
    }, [runtimeConnector])


    return (
        <div
            className={
                "bg-[#FF8080] h-fit min-h-screen w-screen flex flex-col justify-center items-center bg-center xl:flex-col xl:h-screen  overflow-hidden " + myFont.className}
        >
            <Image src="/Logo.png" alt="Logo" height={340} width={340} className='m-6' />
            {profileArray && profileArray.length !== 0 && <div className='flex relative flex-row border-4 w-[1040px] border-white rounded-2xl justify-start p-6'>
                <img
                    src={profileArray[0].images[0]}
                    width={400}
                    height={250}
                    alt="picture"
                    className="object-cover h-[100%] rounded-[40px]"
                />
                <div className='flex flex-col pl-6 justify-between'>
                    <div>
                        <div className='text-white text-8xl mb-3'>{profileArray[0].age}</div>
                        <div className='text-white text-6xl mb-3'>{profileArray[0].name}</div>
                    </div>
                    <div className='text-white text-5xl mb-3'>{profileArray[0].description}</div>
                    <div
                        className="bg-white w-[350px] h-[80.7px] rounded-full flex items-center justify-center text-[#FF8080] text-[50px] hover:cursor-pointer mt-12"
                        onClick={() => window.location.href = '/mainfeed'}
                    >
                        Matches
                    </div>
                </div>
                <div className='absolute top-5 right-5'>
                    <div
                        className="h-[100px] w-[100px] rounded-full bg-white flex justify-center items-center"
                    >
                        <Image
                            src={"/Heart_filled.svg"}
                            height={50}
                            width={50}
                            alt="Like"
                            className="mt-1.5"
                        ></Image>
                    </div>
                </div>
            </div>}
            <LoadingProp
                isLoading={isLoading}
                title='Fetching'
                desc='Fetching user profile'
            />
        </div>
    )
}


export default page