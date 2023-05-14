import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img src="logo.svg" alt="Logotipo de la página React NodeSend" className='w-64 mb-8 md:mb-0 inline-block'/>
      </Link>

      <nav className='flex gap-2'>
        <Link href='/login' className='bg-red-500 p-2 rounded-md text-white font-bold'>LogIn</Link>
        <Link href='/register' className='bg-black p-2 rounded-md text-white font-bold'>Regístrate</Link>
      </nav>
    </header>
  )
}
