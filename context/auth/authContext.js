import { createContext, useReducer } from "react";
import authReducer from './authReducer'
import { clienteAxios } from "../../config/axios";

import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_MENSAJE } from "../../types";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const initialState = {
    token: '',
    autenticado: false,
    usuario: null,
    mensaje: ''
  }

  const [ state, dispatch ] = useReducer(authReducer, initialState);


  //Registrar un usiario
  const registrarUsuario = async (usser) => {

    try {
      const { data } = await clienteAxios.post('/usuarios', usser)
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: data.msg
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      })
    } finally {
      //limpiar el estado mensaje
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MENSAJE,
          action: ''
        })
      }, 5000);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        registrarUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider