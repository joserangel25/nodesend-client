import React from 'react'
import Head from 'next/head'
import Header from './Header'

export default function Layout({children}) {
  return (
    <>
      <Head>
        <title>React NodeSend</title>
      </Head>
      <div className="bg-gray-100 w-screen min-h-screen">
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
