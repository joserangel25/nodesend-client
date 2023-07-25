import { useEffect, useState } from "react";
import Alerta from "../components/Alerta"
import Dropzone from "../components/Dropzone"
import { useAppContext } from "../hooks/useAppContext"

export default function Home() {
  const { mensaje, urlEnlace, limpiarMensaje } = useAppContext();
  const [ domain, setDomain ] = useState('');
  const [ isCopy, setIsCopy ] = useState(false)

  useEffect(() => {
    setDomain(window.location.href)
  }, [])

  const handleClick = () => {
    navigator.clipboard.writeText(`${domain}enlaces/${urlEnlace}`)
    setIsCopy(true)

    setTimeout(() => {
      setIsCopy(false)
    }, 1000);
  };
  return (
    <>
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-12">
      {
        mensaje && <Alerta mensaje={mensaje}/>
      }
      
      <div className="lg:flex lg:gap-5 md:shadow-lg bg-white rounded-lg py-10 px-5">
        {
          urlEnlace ?
          (<div className="text-center p-3 bg-red-50 mb-3 rounded-md shadow-sm grow flex flex-col items-center justify-center">
            <p className="font-bold text-red-700 text-2xl">👌Copia el enlace de tu archivo y compártelo!</p>
            <div className="group relative my-5 flex justify-center">
              <button 
                className="rounded bg-amber-500 px-4 py-2 text-sm text-white shadow-sm"
                onClick={handleClick} 
              >
                {urlEnlace}
              </button>
              <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">✨ {isCopy ? 'Copiado!' : 'Clic and copy!'}</span>
            </div>

            <p className="text-sm text-red-700">🤓Recuerda compartirlo con alguien de confianza.</p>
            <p className="text-sm text-red-700 ">🔒¡Asegúrate de pasarlo a la persona correcta!</p>
            
          </div>)
          :
          (<Dropzone />)
        }
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-sans font-bold text-gray-800 mb-3">Compartir archivos de forma sencilla y rápida</h2>
          <p className="text-lg leading-loose">
            <span className="text-red-500 font-bold">ReactNodeSand</span>
            {''} te permite compartir archivos con cifrado de extremo a extremo y se eliminan después de su descarga {'(si así lo deseas)'}. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea.
          </p>
        </div>
      </div>
    </div>
    </>

  )
}
