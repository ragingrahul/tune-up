"use client"
import {useState,useContext} from "react"
import { FileType,Currency,WALLET,StreamContent } from "@dataverse/runtime-connector"
import { DataverseContext } from "../context/Context"

export function useStream(){
    const {runtimeConnector}=useContext(DataverseContext)
    const[pkh,setPkh]=useState("")
    const[streamsRecord,setStreamsRecord]=useState<StreamContent>({})

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

    return{
        pkh,
        streamsRecord,
        checkCapability,
        createCapability,
    }
}
