import jsCookie from "js-cookie";

export function axiosConfig(json:boolean = true){
    
    const token = jsCookie.get("token");
    if(!token) return null
    const config = {
        headers: {
        "Content-Type": json ? "application/json" : "multipart/form-data",
        Authorization: `Bearer ${token}`,
        },
    };
    return config
}