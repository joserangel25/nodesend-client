import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import { useAuthContext } from '../hooks/useAuthContext'
import Alerta from '../components/Alerta'

export default function Login() {

  const router = useRouter()
  const { autenticarUsuario, authState: { mensaje, autenticado, usuario } } = useAuthContext();

  useEffect(() => {

    if(autenticado && !mensaje){
      router.push('/')
    }

    if(autenticado && mensaje){
      setTimeout(() => {
        router.push('/')
      }, 1200)
    }
  }, [autenticado])
    

    const formik = useFormik({
    initialValues: {
      password: '',
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es obligatario'),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: (datos) => {
      autenticarUsuario(datos)
    }
  })
  return (
    <div className='md:w-4/5 xl:w-3/5 mx-auto'>
    <h2 className='text-4xl font-sans font-bold text-gray-800 text-center'>Iniciar sesión</h2>

    {  mensaje && <Alerta mensaje={mensaje} />  }
    
    <div className="flex justify-center mt-3">
      <div className="w-full max-w-lg ">
        <form 
          className='bg-white rounded shadow-md px-8 py-6'
          onSubmit={formik.handleSubmit}
        >

          <div className="mb-4">
            <label htmlFor="email" className='block text-sm text-black font-bold mb-2'>Email</label>
            <input 
              type="email" 
              id="email" 
              className='shadow appearance-none rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-red-500'
              placeholder='Email de usuario'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}   
            />

            {
              (formik.touched.email && formik.errors.email) && (
                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.email}</p>
                </div>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className='block text-sm text-black font-bold mb-2'>Password</label>
            <input 
              type="password" 
              id="password" 
              className='shadow appearance-none rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-red-500'
              placeholder='Password de usuario'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {
              (formik.touched.password && formik.errors.password) && (
                <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.password}</p>
                </div>
              )
            }
          </div>

          <input
            type='submit'
            className='bg-red-500 hover:bg-red-800 w-full p-3 text-white uppercase font-bold transition-colors cursor-pointer'
            value='Iniciar sesión'
          />
        </form>
      </div>
    </div>
  </div>
  )
}
