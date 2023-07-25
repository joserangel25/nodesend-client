import { clienteAxios } from "./axios"

export const tokenAuth = () => {
  const token = sessionStorage.getItem('nodeSendToken');
  if(token){
    clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } 
  else {
    delete clienteAxios.defaults.headers.common['Authorization']
  }
}