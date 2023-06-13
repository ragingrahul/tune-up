"use client"
import React from 'react'
import Header from '../components/Header'
import { DataverseContext } from '@/context/Context'
import {useContext} from 'react'

function page() {
  const { runtimeConnector,walletConnected,pkh,setWalletConnect,setPkh } = useContext(DataverseContext)
  console.log(walletConnected,pkh)
  return (
    <main className="flex min-h-screen flex-col items-center h-[120vh] font-RobotoMono">
      <Header />
      {walletConnected}
      {pkh}
    </main>
  )
}

export default page