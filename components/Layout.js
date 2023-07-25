import React, { useEffect } from 'react'
import Head from 'next/head'
import Header from './Header'

import { useAuthContext } from '../hooks/useAuthContext'

export default function Layout({children}) {
  const { esUsuarioAutenticado } = useAuthContext()

  useEffect(() => {
    const token = sessionStorage.getItem('nodeSendToken')
    if(token){
      esUsuarioAutenticado()
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>React NodeSend</title>
      </Head>
      <div className="bg-gray-100 py-4 min-h-screen">
        <div className="container mx-auto">
          <Header />
          <main className="">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
