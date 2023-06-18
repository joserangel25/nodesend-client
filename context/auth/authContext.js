import { createContext, useReducer } from "react";
import authReducer from './authReducer'
import { clienteAxios } from "../../config/axios";

import { REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_MENSAJE, 
         INICIO_SESION_ERROR,
         INICIO_SESION_EXITOSO,
         USUARIO_AUTENTICADO, 
         CERRAR_SESION} from "../../types";
import { tokenAuth } from "../../config/tokenAuth";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const initialState = {
    token: typeof window !== 'undefined' ? sessionStorage.getItem('nodeSendToken') : '',
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
          payload: ''
        })
      }, 5000);
    }
  }

  const autenticarUsuario = async (datos) => {
    try {
      const { data } = await clienteAxios.post('/auth', datos)
      dispatch({
        type: INICIO_SESION_EXITOSO,
        payload: data
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: INICIO_SESION_ERROR,
        payload: error.response.data.msg
      })
    } finally {
      //limpiar el estado mensaje
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MENSAJE,
          payload: ''
        })
      }, 5000);
    }
  }

  const esUsuarioAutenticado = async () => {
    const token = sessionStorage.getItem('nodeSendToken')
    if(token){
      tokenAuth(token)
    }
    try {
      const { data } = await clienteAxios.get('/auth')
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: data.usuario
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: INICIO_SESION_ERROR,
        payload: error?.response?.data?.msg
      })
    } finally {
      //limpiar el estado mensaje
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_MENSAJE,
          payload: ''
        })
      }, 5000);
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <AuthContext.Provider
      value={{
        authState: state,
        registrarUsuario,
        autenticarUsuario,
        esUsuarioAutenticado,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider