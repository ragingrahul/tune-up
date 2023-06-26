"use client"
import { useState, useContext } from "react"
import { FileType, Currency, WALLET, StreamContent } from "@dataverse/runtime-connector"
import { DataverseContext } from "../context/Context"
import { appName,modelId } from "../utils/constants"

export function useStream() {
  const { runtimeConnector } = useContext(DataverseContext)
  const [pkh, setPkh] = useState("")
  const [streamsRecord, setStreamsRecord] = useState<StreamContent>({})

  const encrypted = JSON.stringify({
    name: false,
    images: false,
  })

  const checkCapability = async () => {
    const res = await runtimeConnector?.checkCapability()
    console.log(res)
    return res
  }

  const createCapability = async (wallet: WALLET) => {
    const currentPkh = await runtimeConnector?.createCapability({
      app: appName,
      wallet,
    })
    if (currentPkh)
      setPkh(currentPkh)
    return currentPkh;
  }

  const loadStreamsByStreamId = async (streamId: string) => {
    const stream = await runtimeConnector?.loadStream(streamId)
    return stream
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
    if (streams)
      setStreamsRecord(streams);
    return streams;
  };

  const createPublicStream = async (name: string, description: string, image: string, gender: string, age: number, pkh: string) => {
    const res = await runtimeConnector?.createStream({
      modelId: modelId,
      streamContent: {
        appVersion: '0.0.1',
        name: name,
        description: description,
        images: [
          image,
        ],
        gender: gender,
        age: age,
        addresses: [],
        pkh: pkh,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        encrypted,
      },
    })
    return res
  };

  const updatePublicStream = async (name: string, description: string, image: string, gender: string, age: number, pkh: string ,liked: Array<string>,streamId:string,createdAt:string) => {
    const res=await runtimeConnector?.updateStream({
      streamId:streamId,
      streamContent:{
        appVersion: '0.0.1',
        name: name,
        description: description,
        images: [image,],
        gender: gender,
        addresses: liked,
        pkh: pkh,
        createdAt:createdAt,
        updatedAt:new Date().toISOString(),
        encrypted,
      },
    })
    return res
  }


  return {
    pkh,
    streamsRecord,
    checkCapability,
    createCapability,
    loadStreams,
    loadStreamsByStreamId,
    createPublicStream,
    updatePublicStream
  }
}
