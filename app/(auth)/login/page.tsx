"use client"

import clienteAxios from "@/config/clienteAxios";
import Image from "next/image";
import React, { useState } from "react";

import jsCookie from "js-cookie"
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { handleError } from "@/utils/errorHandler";
import Link from "next/link";


export default function Login() {

  const [registration, setRegistration] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    try {
      
      // Hacemos la peticion

      const {data} = await clienteAxios.post("/user/login",{
        registration, password
      })

      // Colocamos la cookie

      jsCookie.set("token", data.token, {
        expires: new Date().setMonth(new Date().getMonth() + 1),
      });

      // Guardamos la autenticacion

      dispatch(setAuth(data))

      // Mandamos a la pantalla principal con window
      window.location.href = "/"
      

    } catch (error:any) {
      return handleError(error)
    }
  }

  return (
    <form 
    onSubmit={handleSubmit}
    className="min-h-screen relative">
      {/* Imagen de fondo */}
      <Image
        src="/estadio.png"
        alt="Fondo"
        width={600}
        height={200}
        className="w-full min-h-screen absolute top-0 left-0 object-center object-cover z-10"
      />

      {/* Overlay */}

      <div className="bg-gray-900 opacity-70 w-full min-h-screen absolute top-0 left-0 object-center object-cover z-20"></div>

      {/* Contenido principal */}

      <div className="w-full min-h-screen absolute top-0 left-0 grid place-items-center z-30">
        <div className="grid place-items-center w-full">
          <Image
            src={"/borrego.png"}
            alt="Logo"
            className="w-1/2 mb-10"
            width={600}
            height={200}
          />

          <div className="grid place-items-center gap-4 w-full">
            <div className="border-b-2 border-white w-2/3">
              <p className="text-gray-50">Matricula</p>
              <input 
              
              className="bg-transparent text-white py-1 rounded-md w-full"
              type="text"
              placeholder="A000000000"
              onChange={(e)=>setRegistration(e.target.value)}
              value={registration}
              />
            </div>

            <div className="border-b-2 border-white w-2/3">
              <input 
              className="bg-transparent text-white py-1 rounded-md w-full"
              type="password" 
              placeholder="Contraseña"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              />
            </div>

            <div>
              <Link 
              className="text-gray-50"
              href="/register"
              >
                
                ¿No tienes cuenta? Registrate

              </Link>
            </div>


            <input 
            className="inline-block bg-blue-700 rounded-lg px-4 py-2 text-lg text-gray-50 capitalize mt-8"
            type="submit" 
            value="iniciar Sesion" />
          </div>
        </div>
      </div>
    </form>
  );
}
