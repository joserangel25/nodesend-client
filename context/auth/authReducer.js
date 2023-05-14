import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_MENSAJE } from "../../types";

export default (state, action) => {
  switch(action.type){
    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje: action.payload
      }
    default: 
      return state
  }
}