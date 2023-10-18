"use client"
import React from 'react'
import { MoralisProvider } from 'react-moralis'
export default function MoralisProviderComponent({children}:{children: React.ReactNode}) {
  return (
    <>
    <MoralisProvider initializeOnMount={false} >
    {children}
    </MoralisProvider>
    </>
  )
}
