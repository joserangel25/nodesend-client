import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

export default function Alerta() {
  const { authState: { mensaje } } = useAuthContext()
  return (
    <div className='bg-red-500 py-2 px3 w-full my-3 max-w-lg mx-auto text-white text-center'>
      {mensaje}
    </div>
  )
}
