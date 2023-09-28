import { axiosConfig } from "./axiosConfig";
import clienteAxios from "./clienteAxios";



const config = axiosConfig();
export const fetcher = (url: string) => clienteAxios(url,config ?? {}).then((datos) => datos.data)
