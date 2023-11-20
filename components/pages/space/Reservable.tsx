"use client";


import { setReservable } from "@/redux/slices/reservableSlice";
import { ReservableInt } from "@/styles/ModelTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { useDispatch } from "react-redux";

interface Props {
  reservable:ReservableInt
  hour: string;
  coach: string;
  image: string;
  spaceId: number
}

export default function Reservable({reservable, hour, coach, image, spaceId}: Props) {

  const router = useRouter()
  const dispatch = useDispatch()
  
  const handleClick = ()=>{
    // Colocamos el reservable en el contexto
    dispatch(setReservable(reservable))
    console.log(reservable)
    // Redirigimos a la url
    router.push(`/space/reserve/${spaceId}`)
    
  }

  const handlePrefetch = ()=>{
    // Función encargada de emular el prefetch hecho por los links
    router.prefetch(`/space/reserve/${spaceId}`)
  }

  return (
    <button 
    onClick={handleClick}
    onMouseEnter={handlePrefetch}
    className="w-full bg-white flex items-center rounded-xl p-5">
      <div className="bg-gray-200 p-2 rounded-full grid place-items-center">
        <Image
          src={image}
          width={50}
          height={50}
          className="rounded-full"
          alt="Avatar"
        />
      </div>

      <div className=" ml-7">
        <p className="text-gray-900 font-bold text-lg">{hour}</p>

        <p className="text-gray-600">Coach {coach}</p>
      </div>
    </button>
  );
}
