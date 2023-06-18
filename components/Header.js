import React from 'react'
import Link from 'next/link'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Header() {
  const { authState, cerrarSesion } = useAuthContext()
  return (
    <header className='py-4 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/'>
        <img src="logo.svg" alt="Logotipo de la página React NodeSend" className='w-64 mb-8 md:mb-0 inline-block'/>
      </Link>

      {
        authState?.usuario ? (
          <div className='flex gap-3 items-center'>
            <p>Hola {authState.usuario?.nombre}</p>
            <button
              className='bg-red-500 p-2 rounded-md text-white font-bold'
              onClick={cerrarSesion}
            >
              Log Out
            </button>
          </div>
        ) :
        (
          <nav className='flex gap-2'>
            <Link href='/login' className='bg-red-500 p-2 rounded-md text-white font-bold'>Log In</Link>
            <Link href='/register' className='bg-black p-2 rounded-md text-white font-bold'>Sign Up</Link>
          </nav>
        )
      }
    </header>
  )
}
