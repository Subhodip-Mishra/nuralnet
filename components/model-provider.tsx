"use client"

import { useEffect, useState } from "react"
import { ProModal } from "@/components/pro-model";

export const ModelProvider = () => {
    const [ismounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!ismounted){
        return null;
    }

    return (
        <>
        <ProModal />
        </>
    )
}