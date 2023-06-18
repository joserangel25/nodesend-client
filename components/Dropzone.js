import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
// import { useDropzone } from 'dropzone'
import { clienteAxios } from '../config/axios'

export default function MyDropzone() {
  const onDrop = useCallback( async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('archivo', acceptedFiles[0])

    try {
      const resultado = await clienteAxios.post('/archivos', formData)
      console.log(resultado)
    } catch (error) {
      console.log(error)
    }
  }, [])
  // Extraer contenido de Dropzone
  const { acceptedFiles, getRootProps, getInputProps, isDragActive  } = useDropzone( { onDrop } )

  const archivos = acceptedFiles.map((archivo) => (
    <li key={archivo.lastModified} className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
      <p className='font-bold text-lg'>{archivo.path}</p>
      <p className='text-sm text-gray-500'>{ (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
    </li>
  ))

  return (
    <div className={`p-10 lg:py-0 md:flex-1 mb-3 lg:mt-0 flex flex-col items-center justify-center border-dashed ${isDragActive ? 'border-green-400' : 'border-gray-400'} border-2 bg-gray-100 `}>
      {
        acceptedFiles.length > 0 ? 
        (
          <>
            <h2 className='text-xl font-bold text-red-500 mb-2'>Tus archivos subidos</h2>
            <ul>{archivos}</ul>
            <button
              className='bg-blue-700 w-full py-3 rounded-lg text-white mt-2 hover:bg-blue-800 transition-colors'
            >Crear enlace</button>
          </>
        )
        :
        (
          <div {...getRootProps({ className: 'dropzone' })} className='cursor-pointer h-full w-full grid place-content-center'>
            <input type="text" className='' {...getInputProps()} />
            <p className='lg:text-2xl text-gray-600 text-center'>
              { isDragActive ? '¡Suéltalo aquí!' : '¡Selecciona un archivo o arrástralo aquí!' }
            </p>
          </div>
        )
      }    
    </div>
  )
}


/*
<div className="py-10 lg:py-0 md:flex-1 mb-3 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input type="text" className='h-full ' {...getInputProps()} />
        <p className='lg:text-2xl text-gray-600 text-center'>
          { isDragActive ? '¡Suéltalo aquí!' : '¡Selecciona un archivo o arrástralo aquí!' }
        </p>
      </div>
    </div>
*/