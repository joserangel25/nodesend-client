import { MOSTRAR_ALERTA,
         LIMPIAR_MENSAJE,
         CARGANDO,
         SUBIR_ARCHIVO_ERROR,
         SUBIR_ARCHIVO_EXITO,
         CREAR_ENLACE_ERROR,
         CREAR_ENLACE_EXITO,
         LIMPIAR_STATE,
         CAMBIO_CANTIDAD_DESCARGAS,
         CAMBIO_CLAVE,
         CLAVE_VERIFICADA_EXITO } from "../../types";


export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
        return {
          ...state,
          mensajeArchivo: action.payload
        }
    case LIMPIAR_MENSAJE: 
     return {
      ...state,
      mensajeArchivo: ''
     }
    case CARGANDO: 
     return {
      ...state,
      cargando: true
     }
    case SUBIR_ARCHIVO_EXITO: 
      return {
        ...state,
        nombreArchivoOriginal: action.payload.nombreArchivoOriginal,
        nombreArchivoNodesend: action.payload.nombreArchivoNodesend,
        cargando: false
      }
    case SUBIR_ARCHIVO_ERROR: 
      return {
        ...state,
        cargando: false,
        error: true,
        mensajeArchivo: action.payload
      }
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        urlEnlace: action.payload
      }
    case CAMBIO_CANTIDAD_DESCARGAS:
      return {
        ...state,
        descargas: action.payload
      }
    case CAMBIO_CLAVE:
      return {
        ...state,
        password: action.payload
      }
    case CLAVE_VERIFICADA_EXITO:
      return {
        ...state,
        claveVerificada: true,
        mensaje: action.payload
      }
    case LIMPIAR_STATE: 
     return {
      ...state,
      mensajeArchivo: '',
      nombreArchivoOriginal: '',
      nombreArchivoNodesend: '',
      cargando: false,
      error: false,
      urlEnlace: '',
      descargas: 1,
      password: '',
      autor: '',
      claveVerificada: false
     }

    default:
      return state;
  }
}