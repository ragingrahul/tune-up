interface VideoDetails {
    videoName: string;
    authorName: string;
}
import Image from "next/image";
import styles from '../Main.module.css'

function VideoCard(Props: VideoDetails) {

    return (
        <div className={`w-[720px] h-[505px] ${styles.bgcard} my-6  rounded-[32px] flex justify-center`}>
            <div className={`p-4 flex flex-col items-center`}>
                <Image src="/Thumbnail.jpg" alt='Thumbnail' width={480} height={360} className='rounded-3xl' />
                <div className='m-4 font-bold text-2xl'>
                    {Props.videoName}
                </div>
                <div className='font-thin'>
                    {Props.authorName}
                </div>
            </div>
        </div>
    )
}

export default VideoCard