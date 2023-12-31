import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAppContext } from '../hooks/useAppContext'

export default function Header() {
  const { authState, cerrarSesion } = useAuthContext();
  const { reiniciarState } = useAppContext()
  const router = useRouter();

  const handleClikLogoRedirect = () => {
    router.push('/')
    reiniciarState()
  }
  return (
    <header className='md:w-4/5 xl:w-3/5 p-5 mx-auto flex flex-col md:flex-row items-center justify-between'>

      <img 
       onClick={handleClikLogoRedirect}
       src="/logo.svg" 
       alt="Logotipo de la página React NodeSend" 
       className='w-64 inline-block cursor-pointer'
      />


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
            {
              !router.pathname.includes('login') && (
                <Link 
                  href='/login' 
                  className='bg-red-500 hover:bg-red-800 transition-colors p-2 rounded-md text-white font-bold'>
                    Log In
                </Link>
              )
            }
            {
              !router.pathname.includes('register') && (
                <Link 
                  href='/register' 
                  className='bg-black hover:bg-gray-700 transition-colors p-2 rounded-md text-white font-bold'>
                    Sign Up
                </Link>
              )
            }
            
          </nav>
        )
      }
    </header>
  )
}
