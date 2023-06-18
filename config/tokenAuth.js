import { clienteAxios } from "./axios"

export const tokenAuth = (token) => {
  if(token){
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } 
  else {
    delete clienteAxios.defaults.headers.common['Authorization']
  }

}