"use client"
import React, { FC,ReactNode } from 'react'
import { Extension,RuntimeConnector } from "@dataverse/runtime-connector";
import {createContext,useEffect,useState} from "react"

interface ContextType{
    runtimeConnector:RuntimeConnector|undefined;
}

export const DataverseContext=createContext<ContextType>({} as ContextType)

export const DataverseProvider = ({children}:any)=>{

    const [runtimeConnector,setRuntimeConnector] =useState<RuntimeConnector>()

    const createRuntimeConnector =async()=>{
        const runtimeConnector=new RuntimeConnector(Extension)
        setRuntimeConnector(runtimeConnector)
    }

    useEffect(()=>{
        createRuntimeConnector()
    },[])

    return(
        <DataverseContext.Provider value={{runtimeConnector}}>
            {children}
        </DataverseContext.Provider>
    )
}