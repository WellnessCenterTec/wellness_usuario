import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { handleError } from "@/utils/errorHandler";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import { mutate } from "swr";

interface Props {
  id:number
  image: string;
  title: string;
  location: string;
  date: string;
  time:string
  onClick : ()=>void
}

export default function Reservation({ id,image, title, location, date,time,onClick }: Props) {

  async function handleDeleteReservation(){
    try {
      const config = axiosConfig();
      if(!config) return;
      const {data} = await clienteAxios.delete(`/reservation/delete/${id}`,config);
      mutate("/reservation/reserves")
      await Swal.fire({
        icon: "success",
        title: "Reservación eliminada",
        text: data.message,
      });

    } catch (error:any) {
      return handleError(error);
    }
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-slate-200 hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 overflow-hidden">
      <button
        type="button"
        onClick={onClick}
        className="w-full p-4 sm:p-6 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <Image
              src={image}
              width={200}
              height={200}
              alt="Imagen de fondo"
              className="w-20 h-24 sm:w-24 sm:h-28 lg:w-28 lg:h-32 object-center object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-slate-800 truncate">{title}</h3>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-slate-500 text-sm"></i>
              <p className="text-slate-600 text-sm sm:text-base truncate">{location}</p>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-calendar-days text-slate-500 text-sm"></i>
              <p className="text-slate-700 text-sm sm:text-base">
                {date} / <span className="text-slate-900 font-bold">{time}</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Toca para ver QR
              </span>
            </div>
          </div>
        </div>
      </button>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex justify-end">
        <button
          type="button"
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteReservation();
          }}
          title="Eliminar reservación"
        >
          <i className="fa-solid fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  );
}
