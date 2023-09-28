import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.BACKEND_URL}/api`,
})

export default clienteAxios