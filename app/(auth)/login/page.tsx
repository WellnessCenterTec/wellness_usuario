import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen relative">
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
              <p className="text-gray-50">Email</p>
              <input 
              className="bg-transparent text-white py-1 rounded-md w-full"
              type="email"
              placeholder="Correo"
              />
            </div>

            <div className="border-b-2 border-white w-2/3">
              <input 
              className="bg-transparent text-white py-1 rounded-md w-full"
              type="password" 
              placeholder="Contraseña"
              />
            </div>


            <input 
            className="inline-block bg-blue-700 rounded-lg px-4 py-2 text-lg text-gray-50 capitalize mt-8"
            type="submit" 
            value="iniciar Sesion" />
          </div>
        </div>
      </div>
    </div>
  );
}
