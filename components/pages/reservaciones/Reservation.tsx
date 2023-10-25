import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  title: string;
  location: string;
  date: string;
  time:string
}

export default function Reservation({ image, title, location, date,time }: Props) {
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
      >

      </button>
    </div>
  );
}
