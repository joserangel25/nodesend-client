import React, { useRef } from 'react'
import Link from 'next/link';
import { clienteAxios } from '../../config/axios'
import variables from '../../config/variables';
import { useAppContext } from '../../hooks/useAppContext';
import Alerta from '../../components/Alerta';

export async function getServerSideProps({ params: { url } }){
  let archivo = null;
    try {
      const { data } = await clienteAxios(`/enlaces/${url}`);
      archivo = data;
    } catch (error) {
      console.log(error);
    }
    return {
      props: {
          url: archivo
      }
  }
};

export default function({ url }) {
  const { archivo, nombreOriginal, password } = url ?? {};
  const { verificarClaveEnlace, claveVerificada, mensaje } = useAppContext();
  const refPassword = useRef()
  
  const handleSubmitVerificarClave = (e) => {
    e.preventDefault()
    if(!refPassword.current.value)return

    verificarClaveEnlace({ url: archivo, password: refPassword.current.value })
  }
  return (
    <div className='grid place-content-center md:w-4/5 xl:w-3/5 mx-auto md:shadow-lg bg-white rounded-lg py-10 px-5'>
        {
          mensaje && <Alerta mensaje={mensaje}/>
        }
        {
          archivo ? (
            <>
            <p className='text-2xl font-bold text-red-700'>Hola, alguien ha compartido un archivo contigo</p>
            {
              password && !claveVerificada ? (
                <>
                <form 
                  className='bg-white rounded  px-8'
                  onSubmit={handleSubmitVerificarClave}
                >
                  <p className='mb-5 text-center mt-3 text-lg'>¡Pero está protegido. Ingresa la clave para desbloquear!</p>
                  <div className="mb-4 flex gap-2">
                    <input 
                      type="password" 
                      className='shadow bg-red-500 rounded w-full px-3 py-2 placeholder:text-white text-white focus:outline-none'
                      placeholder='Escribe la clave'
                      ref={refPassword}  
                    />

                    <input
                      type='submit'
                      className='bg-black hover:bg-gray-700  p-3 text-white uppercase font-bold transition-colors cursor-pointer'
                      value='Validar'
                    />
                  </div>
                </form>
                </>

              ) : (
                <>
                {
                  (password && claveVerificada) && <p className='mt-2 text-center font-medium text-red-800 text-lg'>¡Excelente! La clave coincide y puedes continuar!</p>
                }
                <p className='mb-5 text-center mt-3'>¡Por favor descárgalo!</p>
                <a
                    className='bg-black hover:bg-red-700 transition-colors p-3 text-white text-center rounded-md w-1/2 mx-auto'
                    href={`${variables.URL_BACK}/api/archivos/${archivo}`}
                >
                    {nombreOriginal}
                </a>
                </>
              )
            }

            <div className='text-center text-sm text-red-700 mt-4'>
              <p className=''><span className='font-bold'>Toma nota</span> y recuerda que por <span className='font-bold'>defecto:</span></p>
              <p>🔒Solo podrás descargar el archivo una sola vez</p>
              <p>😉El enlace solo funcionará hasta que descargues el archivo</p>
            </div>
            </>
          ) : (
          <>
            <p className='text-2xl text-center text-red-600 font-bold'>😢Lo sentimos</p>
            <p className='text-gray-700 w-4/5 text-center mx-auto'>Este archivo ya no se encuentra disponible. Por favor comunícate con la persona que te facilitó el enlace.</p>
            <Link
              replace
              className='bg-red-500 p-2 rounded-md text-white font-bold justify-self-center mt-4'
              href='/'
            >
              Ir al home
            </Link>
          </>
          )
        }
    </div>
  )
}

