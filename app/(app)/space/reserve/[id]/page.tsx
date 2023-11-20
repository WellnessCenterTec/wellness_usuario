"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { handleError } from "@/utils/errorHandler";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Loader from "@/components/shared/Loader";
import { formatearHora } from "@/utils/helpers";



export default function Reserve() {
  const { reservable, spaceName } = useSelector(
    (state: RootState) => state.reservable
  );
 
  // Si no hay un reservable colocamos la carga
  if (!reservable) {
    return <Loader />
  }

  // Ya que sabemos que si hay una reservable extraemos las variables

  const {quota,init_date,end_date,admin,reservations} = reservable

  const fillQuota = reservations?.length ?? 0

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Funciona");

    try {
      const config = axiosConfig();

      if (!config) {
        throw new Error("Sesión vencida inicia sesion");
      }
    } catch (error: any) {
      return handleError(error);
    }
  };

 

  return (
    <div>
      <div className="flex items-center mx-4 pt-3">
       

        <p className="text-2xl flex-1 text-center font-bold">{spaceName} </p>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="w-full">
          <Image
            className=" object-center object-cover rounded-md"
            src="/samples/lateral.jpg"
            width={400}
            height={400}
            alt="Imagen de fondo"
          />
        </div>

        <div className="px-3 text-center">
          <div className="bg-blue-700 rounded-xl p-3">
            <p className="text-center text-gray-100">Horario</p>
            <p className="text-gray-50 font-bold">
              {" "}
              {formatearHora(new Date(init_date))} - {formatearHora(new Date(end_date))}{" "}
            </p>
          </div>

          <div className="rounded-xl p-3 ring-1 ring-blue-800 mt-6">
            <p className="text-center">Ocupación</p>
            <p className="text-center text-blue-800 font-bold text-2xl">
              {fillQuota} / {quota}
            </p>
          </div>

          <div className="rounded-xl p-3 shadow mt-3">
            <p className="text-center text-gray-700">Maestro</p>

            <p className="text-center text-xl"> {admin?.name} </p>
          </div>
        </div>
      </div>

      <div className="w-full grid place-items-center mt-5">
        <button
          type="button"
          className="bg-blue-800 rounded-2xl px-5 py-2 font-bold text-gray-50 text-2xl"
          onClick={handleSubmit}
        >
          Reservar
        </button>
      </div>
    </div>
  );
}
