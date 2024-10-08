"use client";

import { setSpaceName } from "@/redux/slices/reservationSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";



interface Props {
  img: string;
  name: string;
  id: number;
}
export default function Space({ name, img, id }: Props) {
  const dispatch = useDispatch();

  const handleSelectedSpace = () => {
    dispatch(setSpaceName(name))   
  }

  return (
    <div className="h-40 w-full rounded-3xl relative">
      {/* Imagen de fondo */}

      <Image
        className="w-full h-40 object-center object-cover absolute top-0 left-0 z-10 inline-block rounded-3xl"
        src={img}
        width={600}
        height={500}
        alt={name}
      />

      {/* Overlay */}
      <div className="w-full h-40 bg-blue-500 opacity-30 absolute top-0 left-0 z-20 inline-block rounded-3xl "></div>

      {/* Contenido */}

      <div className="w-full h-40 grid place-items-center absolute top-0 left-0 z-30">
        <div>
          <p className="text-gray-100 font-bold text-xl">{name}</p>
        </div>

        <Link
          className="bg-blue-600 text-gray-50 px-2 py-1 rounded-lg text-lg absolute bottom-5"
          href={`/space/${id}?name=${name}`}
          onClick ={() => handleSelectedSpace()}
        >
          Reservar
        </Link>
      </div>
    </div>
  );
}
