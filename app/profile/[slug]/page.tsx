"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import styles from "../Main.module.css";
import { useStream, saveToIPFS, useWallet } from "../../hooks";
import { DataverseContext } from "../../context/Context";
import LikeButton from "../../components/LikeButton";
import { objectToArray } from "../../utils/address";
import LoadingProp from "../../components/LoadingScreen";
import BottomNavbar from "../../components/BottomNavbar";
import { modelId } from "../../utils/constants";
import { useParams } from "next/navigation";

const myFont = localFont({
  src: "../../fonts/Chillax-Bold.ttf",
  display: "swap",
});

function page() {
  const [liked, setLiked] = useState(false);
  const [profileArray, setProfileArray] = useState<any>();
  const { loadStreams, checkCapability } = useStream();
  const { getCurrentPkh } = useWallet();
  const { runtimeConnector, ownProfile } = useContext(DataverseContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();
  const [pkh, setPkh] = useState<string | undefined>();

  const getProfiles = async (pkh: string) => {
    setIsLoading(true);

    if (pkh) {
      const res = await loadStreams({
        pkh: pkh.replaceAll("%3A", ":"),
        modelId: modelId,
      });
      console.log(pkh.replaceAll("%3A", ":"));
      console.log(res);
      const result = objectToArray(res);
      console.log(result);
      setIsLoading(false);
      setProfileArray(result);
    }
  };

  const isConnected = async () => {
    setIsLoading(true);
    const res = await checkCapability();
    if (res) {
      const pkh = await getCurrentPkh();
      console.log(pkh);
    }
    setIsLoading(false);
    return res;
  };

  useEffect(() => {
    isConnected();
    const pkh = params.slug as string;
    setPkh(pkh);
    if (pkh) getProfiles(pkh);
  }, [runtimeConnector, pkh]);

  return (
    <div
      className={
        "h-screen w-screen bg-[#FF8080] flex flex-col items-center overflow-x-hidden " +
        myFont.className
      }
    >
      {profileArray && profileArray.length !== 0 && (
        <div className="">
          <div
            className={
              "bg-white h-[700px] w-[500px] rounded-[40px] mt-24 relative " +
              myFont.className
            }
          >
            <img
              src={profileArray[0].images[0]}
              width={1000}
              height={100}
              alt="picture"
              className="object-cover h-[100%] rounded-[40px]"
            />
            <div className="h-[100%] w-[500px] bg-black absolute top-0 rounded-[40px] overlay"></div>
            <div className="h-[100%] w-[100%] absolute top-0 flex flex-col justify-between">
              <div className="flex justify-between p-8">
                <h1 className="text-white text-[75px]">
                  {profileArray[0].age}
                </h1>
              </div>
              <div>
                <h1 className="text-white p-8 text-[50px]">
                  {profileArray[0].name}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-[500px] rounded-[40px] bg-white p-8 text-[#ff8080] text-[45px] mt-8 mb-36">
            <h1>{`"` + profileArray[0].description + `"`}</h1>
          </div>
        </div>
      )}
      <div className="fixed backdrop-filter top-3 rounded-2xl hover:backdrop-filter-none transition duration-300 ease-in-out hover:bg-[#ff8080] w-[450px] h-[75px] bg-white-900/20 backdrop-blur-[10px] flex justify-center items-center">
        <Image
          src="/Logo.png"
          width={200}
          height={200}
          alt="Logo"
          className=""
        />
      </div>
      <BottomNavbar />
      <LoadingProp
        isLoading={isLoading}
        title="Fetching"
        desc="Fetching user profile"
      />
    </div>
  );
}

export default page;
