import { NextPage } from "next";
import Image from "next/image";
import GifLoad from "../../public/Loading.gif";
import localFont from "next/font/local";

const myFont = localFont({
    src: "../fonts/Chillax-Bold.ttf",
    display: "swap",
  });

interface Props {
  isLoading: boolean;
  title: string;
  desc: string;
}

const LoadingProp: NextPage<Props> = (props: Props) => {
  return (
    (props.isLoading && (
      <div className={"fixed top-0 left-0 h-[100vh] w-[100vw] bg-slate-900/20 backdrop-filter backdrop-blur-[10px] z-30 flex items-center justify-center "+myFont.className}>
        <div className="bg-[#FF8080] h-[195px] w-[550px] rounded-3xl border-[0.2px] backdrop-blur-[40px] border-white flex flex-col p-7 pt-5">
          <h1 className="text-[#ffffff] text-2xl">
            Loading Status
          </h1>
          <div className="bg-[##FF8080] h-[100px] w-[485px] mt-4 rounded-2xl border-[0.2px] border-white flex p-3 py-5 items-center">
            <Image
              src={GifLoad}
              width={50}
              height={50}
              alt="Loading"
              className="h-[60px] w-[60px]"
            />
            <div className="flex flex-col ml-4">
              <h1 className="text-[#ffffff] text-2xl">
                {props.title}
              </h1>
              <h1 className="text-white text-xl">
                {props.desc}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )) || <></>
  );
};

export default LoadingProp;