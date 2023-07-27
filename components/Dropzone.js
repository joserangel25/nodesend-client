import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAppContext } from '../hooks/useAppContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Formulario from './Formulario';

export default function MyDropzone() {
  const { subirArchivo, cargando, error, crearEnlaceImage, mostrarMensajeAlerta } = useAppContext();
  const { authState } = useAuthContext();
  const { autenticado } = authState ?? {}

  const onDrop = useCallback( async (acceptedFiles) => {
    if(acceptedFiles.length){
      const formData = new FormData();
      formData.append('archivo', acceptedFiles[0]);
      subirArchivo({ file: formData, nombreOriginal: acceptedFiles[0]?.name})
    } else {
      mostrarMensajeAlerta('😢Solo puedes subir un solo archivo. ¡Intenta nuevamente!')
    }
  }, []);
  // Extraer contenido de Dropzone
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  const archivos = acceptedFiles.map((archivo) => (
    <li key={archivo.lastModified} className='bg-white p-3 shadow-lg rounded-md'>
      <p className='font-bold text-lg'>{archivo.path}</p>
      <p className='text-sm text-gray-500'>Pesa { (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
    </li>
  ));

  return (
    <div className={`mb-3 flex flex-col gap-5 items-center justify-center border-dashed ${isDragActive ? 'border-green-400' : 'border-gray-400'} border-2 bg-gray-100 p-5 w-full lg:w-1/2`}>
      {
        acceptedFiles.length > 0 ? 
        (
          <>
            <h2 className='text-center text-xl font-bold text-red-500'>Este es el archivo que vas a compartir:</h2>
            <ul className='w-full md:w-1/2 text-center'>{archivos}</ul>
            {
              (cargando && !error) && (<p>Subiendo...</p>)
            }

            {
              autenticado && (
               <Formulario />  
              )
            }

            {
              (!cargando && !error) &&
              (
                <button
                  className='bg-blue-700 p-3 rounded-lg text-white hover:bg-blue-800 transition-colors w-full md:w-2/3'
                  onClick={crearEnlaceImage}
                >
                  Crear enlace
                </button>
              )
            }
            
          </>
        )
        :
        (
          <div {...getRootProps({ className: 'dropzone' })} className='cursor-pointer h-24 md:h-40 lg:h-full w-full grid place-content-center'>
            <input type="text" className='w-full' {...getInputProps()} />
            <p className='lg:text-xl text-gray-600 text-center hover:text-red-600'>
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