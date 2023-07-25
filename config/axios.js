import axios from 'axios'
import variables from './variables'

export const clienteAxios = axios.create({
  baseURL: `${variables.URL_BACK}/api`,

})