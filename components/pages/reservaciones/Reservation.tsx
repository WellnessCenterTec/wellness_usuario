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
}

export default function Reservation({ id,image, title, location, date,time }: Props) {

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
    <div className="flex items-center gap-3 bg-white rounded-xl relative">
      <Image
        src={image}
        width={200}
        height={200}
        alt="Imagen de fondo"
        className="w-28 h-36 object-center object-cover rounded-md"
      />

      <div className="self-start flex flex-col justify-between w-full space-y-4 mt-3">
        <p className="font-bold text-2xl">{title}</p>
        <div className="flex items-center gap-2 ">
          <i className="fa-solid fa-location-dot text-gray-700"></i>
          <p className="text-gray-600">{location}</p>
        </div>

        <div className="flex items-center gap-2 ">
          <i className="fa-solid fa-calendar-days text-gray-700"></i>
          <p className="text-gray-700">
            {date} / <span className="text-gray-900 font-bold">{time}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-3 right-3 fa-solid fa-trash text-blue-600"
        onClick={handleDeleteReservation}
      >

      </button>
    </div>
  );
}
