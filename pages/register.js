import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAuthContext } from '../hooks/useAuthContext'
import Alerta from '../components/Alerta'

export default function CrearCuenta() {

  const { registrarUsuario, authState: { mensaje } } = useAuthContext()

  const formik = useFormik({
    initialValues: {
      nombre: '',
      password: '',
      email: ''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatario'),
      password: Yup.string().required('El password es obligatorio').min(6, 'El password debe ser mayor a 6 dígitos')
    }),
    onSubmit: (datos) => {
      registrarUsuario(datos)
    }
  })
  return (
    <div className='w-screen'>
      <h2 className='text-lg leading-tight md:text-2xl font-sans font-bold text-gray-800 text-center w-full md:w-1/2 mx-auto'>😉¡Crea una cuenta para más beneficios!</h2>
      
      {
        mensaje && <Alerta mensaje={mensaje} />
      }

      <div className="flex justify-center mt-6">
        <div className="md:w-4/5 xl:w-3/5 px-5 mx-auto">
          <form 
            className='bg-white rounded-lg shadow-md px-8 py-6'
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label htmlFor="nombre" className='block text-sm text-black font-bold mb-2'>Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                className='shadow appearance-none rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-red-500'
                placeholder='Nombre de usuario'
                value={formik.values.nombre} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {
                (formik.touched.nombre && formik.errors.nombre) && (
                  <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                    <p>{formik.errors.nombre}</p>
                  </div>
                )
              }
            </div>

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
              value='Crear cuenta'
            />
          </form>
        </div>
      </div>
    </div>
  )
}
