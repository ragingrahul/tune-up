"use client"
import {useState,useContext} from "react"
import { FileType,Currency,WALLET,StreamContent } from "@dataverse/runtime-connector"
import { DataverseContext } from "../context/Context"

export function useStream(){
    const {runtimeConnector}=useContext(DataverseContext)
    const[pkh,setPkh]=useState("")
    const[streamsRecord,setStreamsRecord]=useState<StreamContent>({})

    const encrypted=JSON.stringify({
        text:false,
        images:false,
        videos:false,
    })

    const checkCapability=async()=>{
        const res=await runtimeConnector?.checkCapability()
        console.log(res)
        return res
    }

    const createCapability=async(wallet:WALLET)=>{
        const currentPkh=await runtimeConnector?.createCapability({
            app:"tunedin",
            wallet,
        })
        if(currentPkh)
            setPkh(currentPkh)
        return currentPkh;
    }

    const loadStreams = async ({
        pkh,
        modelId,
      }: {
        pkh?: string;
        modelId: string;
      }) => {
        let streams;
        if (pkh) {
          streams = await runtimeConnector?.loadStreamsBy({
            modelId,
            pkh,
          });
        } else {
          streams = await runtimeConnector?.loadStreamsBy({
            modelId,
          });
        }
        if(streams)
            setStreamsRecord(streams);
        return streams;
      };

      const createPublicStream = async() => {
        const res=await runtimeConnector?.createStream({
            modelId:"kjzl6hvfrbw6c7cp6xafsa7ghxh1yfw4bsub1363ehrxhi999vlpxny9k69uoxz",
            streamContent:{
                appVersion:'0.0.1',
                text:'Hello There',
                images:[
                    'https://bafkreib76wz6wewtkfmp5rhm3ep6tf4xjixvzzyh64nbyge5yhjno24yl4.ipfs.w3s.link',
                ],
                videos:[],
                createdAt:new Date().toISOString(),
                updatedAt:new Date().toISOString,
                encrypted,
            },
        })
        return res
      };


    return{
        pkh,
        streamsRecord,
        checkCapability,
        createCapability,
        loadStreams,

    }
}
