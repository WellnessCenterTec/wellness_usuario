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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Imagen de fondo */}
      <div className="relative h-48 overflow-hidden">
        <Image
          className="w-full h-full object-center object-cover transition-transform duration-300 hover:scale-105"
          src={img}
          width={600}
          height={500}
          alt={name}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>

        {/* Service name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">{name}</h3>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium">Disponible ahora</span>
          </div>

          <Link
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            href={`/space/${id}?name=${name}`}
            onClick={() => handleSelectedSpace()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
