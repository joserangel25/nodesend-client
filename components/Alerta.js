import React from 'react';

export default function Alerta({ mensaje }) {
  return (
    <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg mx-auto text-white text-center rounded-md shadow-md'>
      {mensaje}
    </div>
  )
}
