"use client"
import {useState,useContext} from "react"
import { FileType,Currency,WALLET,StreamContent } from "@dataverse/runtime-connector"
import { DataverseContext } from "../context/Context"

export function useStream(){
    const {runtimeConnector}=useContext(DataverseContext)
    const[pkh,setPkh]=useState("")
    const[streamsRecord,setStreamsRecord]=useState<StreamContent>({})

    const encrypted=JSON.stringify({
        name:false,
        images:false,
    })

    const checkCapability=async()=>{
        const res=await runtimeConnector?.checkCapability()
        console.log(res)
        return res
    }

    const createCapability=async(wallet:WALLET)=>{
        const currentPkh=await runtimeConnector?.createCapability({
            app:"matchin",
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

      const createPublicStream = async(name:string,description:string,image:string,gender:string,age:number) => {
        const res=await runtimeConnector?.createStream({
            modelId:"kjzl6hvfrbw6c6th6e5bxgz8fmcehowflja2qtelvdec6wv8cwg1djbvb2gy8e3",
            streamContent:{
                appVersion:'0.0.1',
                name:name,
                description:description,
                images:[
                    image,
                ],
                gender:gender,
                age:age,
                addresses:[],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
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
        createPublicStream,
    }
}
