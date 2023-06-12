"use client"
import React from 'react'
import { Extension,RuntimeConnector } from "@dataverse/runtime-connector";
import {createContext,useEffect,useState} from "react"

interface ContextType{
    runtimeConnector:RuntimeConnector;
}

export const DataverseContext=createContext<ContextType>({} as ContextType)

const runtimeConnector:RuntimeConnector=new RuntimeConnector(Extension)


export const contextStore={
    runtimeConnector,
}