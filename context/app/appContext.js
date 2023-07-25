import { createContext, useReducer } from "react";
import appReducer from "./appReducer";

import { MOSTRAR_ALERTA,
         LIMPIAR_MENSAJE,
         CARGANDO,
         SUBIR_ARCHIVO_ERROR,
         SUBIR_ARCHIVO_EXITO,
         CREAR_ENLACE_ERROR,
         LIMPIAR_STATE,
         CREAR_ENLACE_EXITO,
         CAMBIO_CANTIDAD_DESCARGAS,
         CAMBIO_CLAVE,
         CLAVE_VERIFICADA_EXITO,
         CLAVE_VERIFICADA_ERROR } from "../../types";
import { clienteAxios } from "../../config/axios";
import { getError } from "../../helpers/errors";

export const AppContext = createContext();

  const initialState = {
    mensajeArchivo: '',
    nombreArchivoOriginal: '',
    nombreArchivoNodesend: '',
    cargando: false,
    error: false,
    urlEnlace: '',
    descargas: 1, 
    password: '',
    claveVerificada: false
  };

  const AppContextProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    const limpiarMensaje = (time = 2000) => {
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MENSAJE
        })
      }, time)
    };
    const mostrarMensajeAlerta = (msg) => {
      dispatch({
        type: MOSTRAR_ALERTA,
        payload: msg
      })

      limpiarMensaje()
      
    };

    const subirArchivo = async ({ file, nombreOriginal }) => {
      dispatch({
        type: CARGANDO
      })
      try {
        const { data } = await clienteAxios.post('/archivos', file)
        dispatch({
          type: SUBIR_ARCHIVO_EXITO,
          payload: {
            nombreArchivoOriginal: nombreOriginal,
            nombreArchivoNodesend: data?.archivo
          }
        })
      } catch (error) {
        console.log(error)
        dispatch({
          type: SUBIR_ARCHIVO_ERROR,
          payload: getError(error.response?.data?.error?.code)
        })
        limpiarMensaje(5000)
      }
    };

    const crearEnlaceImage = async () => { 
      const dataUrl = {
        nombre_original: state.nombreArchivoOriginal,
        nombreArchivoNodesend: state.nombreArchivoNodesend,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor
      }

      try {
        const { data } = await clienteAxios.post('/enlaces', dataUrl)
        dispatch({
          type: CREAR_ENLACE_EXITO,
          payload: data?.urlArchivo
        })
      } catch (error) {
        console.log(error)
      }
    };

    const reiniciarState = () => {
      dispatch({
        type: LIMPIAR_STATE
      })
    };

    const cambioClaveArchivo = clave => {
      dispatch({
        type: CAMBIO_CLAVE,
        payload: clave
      })
    };

    const cambioCantidadDescargasArchivo = cantidad => {
      dispatch({
        type: CAMBIO_CANTIDAD_DESCARGAS,
        payload: cantidad
      })
    };

    const verificarClaveEnlace = async ({url, password}) => {
      try {
        const { data } = await clienteAxios.post(`/enlaces/${url}`, {
          password
        })
        if(data?.esCorrecto){
          dispatch({
            type: CLAVE_VERIFICADA_EXITO,
            payload: 'La clave coincide. Continúa el proceso.'
          })
        } else {
          dispatch({
            type: MOSTRAR_ALERTA,
            payload: 'La clave no coincide. Intenta nuevamente'
          })
        }
        limpiarMensaje()
      } catch (error) {
        console.log(error)
      }
    }

    return <AppContext.Provider
    value={{ mostrarMensajeAlerta,
             mensaje: state.mensajeArchivo,
             cargando: state.cargando,
             error: state.error, 
             claveVerificada: state.claveVerificada,
             subirArchivo,
             crearEnlaceImage,
             urlEnlace: state.urlEnlace,
             reiniciarState,
             cambioClaveArchivo,
             cambioCantidadDescargasArchivo,
             verificarClaveEnlace,
             limpiarMensaje
          }}>
        {children}
    </AppContext.Provider>
};

export default AppContextProvider