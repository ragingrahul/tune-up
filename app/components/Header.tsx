"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import {
    RuntimeConnector,
    Extension,
    WALLET,
    RESOURCE
} from "@dataverse/runtime-connector";
import { DataverseContext } from '../context/Context';
import { useWallet,useStream } from '../hooks';
import { create } from 'domain';


const app = 'tunedin'

function Header() {
    const {connectWallet}=useWallet()
    const{
        pkh,
        createCapability,
    }=useStream()
    // const { runtimeConnector,walletConnected,pkh,setWalletConnect,setPkh } = useContext(DataverseContext)
    const [wallet, setWallet] = useState<WALLET>()

    const connect = async () => {
        try {
            const {address,wallet} =await connectWallet()
            if(wallet){
                const pkh=await createCapability(wallet)
                console.log("pkh:",pkh)
                return pkh
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <nav className='sticky top-0 text-white bg-transparent backdrop-blur-lg w-full flex flex-row items-center p-3 justify-between'>
            <Image src="/TuneInLogo.png" alt='Logo' width={200} height={40} />


            <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Search" />
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white rounded-lg border border-gray-700 hover:bg-black-700 focus:ring-2 focus:outline-none focus:ring-gray-300  dark:hover:bg-gray-700 dark:focus:ring-gray-100">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>


            <div className='text-2xl flex flex-row items-center'>
                <CgProfile size={50} />
                <div className='border border-gray-300 rounded-lg px-3 py-1 ml-3' onClick={connect}>
                    Connect
                </div>
            </div>
        </nav>
    )
}

export default Header