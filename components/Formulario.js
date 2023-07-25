import { useState } from "react"
import { useAppContext } from "../hooks/useAppContext";

export default function Formulario() {
  const [ limiteDescargas, setLimiteDescargas ] = useState(false);
  const [ cifrarConClave, setCifrarConClave ] = useState(false);
  const { cambioClaveArchivo, cambioCantidadDescargasArchivo } = useAppContext()
  return (
    <div className="w-full my-4">
      <p className=" font-bold">⚙️Personaliza el uso de tu archivo</p>

      <div className="flex items-center gap-3 h-10 ">
        <label htmlFor="descargas">¿Limitar descargas?</label>
        <input 
          type="checkbox" 
          name="" 
          id="descargas" 
          onChange={() => setLimiteDescargas(!limiteDescargas)} 
        />
        {
          limiteDescargas && (
            <input 
              type="number" 
              placeholder="Coloca el número límite de descargas"
              className="px-3 py-1 grow outline-none rounded-md"
              onChange={(e) => cambioCantidadDescargasArchivo(Number(e.target.value))}
            />
          )
        }
      </div>

      <div className="flex items-center gap-3 h-10 mt-2">
        <label htmlFor="clave">¿Cifrar con clave?</label>
        <input 
          type="checkbox" 
          name="" 
          id="clave" 
          onChange={() => setCifrarConClave(!cifrarConClave)} 
        />
        {
          cifrarConClave && (
            <input 
              type="password" 
              placeholder="Escribe la contraseña"
              className="px-3 py-1 grow outline-none rounded-md"
              onChange={(e) => cambioClaveArchivo(e.target.value)}
            />
          )
        }
      </div>

    </div>
  )
}
