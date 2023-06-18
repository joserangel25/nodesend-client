import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_MENSAJE,
         INICIO_SESION_ERROR,
         INICIO_SESION_EXITOSO,
         USUARIO_AUTENTICADO,
         CERRAR_SESION } from "../../types";

export default (state, action) => {
  switch(action.type){
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LIMPIAR_MENSAJE:
    case INICIO_SESION_ERROR:
      return {
        ...state,
        mensaje: action.payload
      };
    case INICIO_SESION_EXITOSO:
      sessionStorage.setItem('nodeSendToken', action.payload.token)
      return {
        ...state,
        autenticado: true,
        usuario: action.payload
      }
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload
      }
    case CERRAR_SESION: 
      sessionStorage.removeItem('nodeSendToken')
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null
      }
    default: 
      return state
  }
}