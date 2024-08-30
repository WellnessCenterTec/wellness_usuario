"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import Reservable from "@/components/pages/space/Reservable";

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { ReservableInt } from "@/styles/ModelTypes";

import { useParams, useSearchParams } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatearFecha, formatearHora, generarIdUnico } from "@/utils/helpers";
import Loader from "@/components/shared/Loader";

type ReservableDateFormat = [string, ReservableInt[]];

export default function Space() {


  const {id:spaceId} = useParams();
  const search = useSearchParams()
  const spaceName = search.get("name")

  const { data: reservables } = useSWR<ReservableDateFormat[]>(
    `/reservable/getReservables/${spaceId}`,
    fetcher
  );

  const [day, setDay] = useState("");

  // En cuanto carguen los reservables colocamos el dia como el primero que salga
  useEffect(() => {
    if (reservables && reservables.length > 0) {
      setDay(reservables[0][0]);
    }
  }, [reservables]);

  

 
  if (!reservables) {
    return <Loader />
  }

  // Definimos el reservable seleccionado actualmente
  const selectedReservable = reservables.find((res) => res[0] === day);

  return (
    <div>
      <PageHeader title={spaceName ?? ""} image="/samples/fondo.jpeg" />
      <div className="flex-wrap gap-6 mt-4 mx-auto w-5/6">
        {reservables.length > 0 ? (
          <div className="flex items-center gap-4">
            {reservables.map((element, index) => (
              <div key={generarIdUnico()} className="px-2">
                <button
                  type="button"
                  onClick={() => {
                    setDay(element[0]);
                  }}
                  className={`w-full capitalize px-2 py-2 rounded-lg text-xl ${
                    element[0] === day
                      ? "bg-blue-800 text-gray-50 border-blue-800"
                      : "bg-white-300 text-blue-800 border-blue-800"
                  }`}
                >
                  {formatearFecha(new Date(element[0]))}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No hay fechas disponibles.</p>
        )}
      </div>

      <div className="w-5/6 h-[1px] bg-gray-800 mt-3 mx-auto" />

      <div className="mx-auto w-5/6 mt-3 grid place-items-center gap-4">
        {selectedReservable &&
          selectedReservable[1].map((reser) => (
            
              <Reservable
                key={reser.id}
                id={reser.id}
                image="/borregoBlue.png"
                
                reservable={reser}
             
          
              />
            
          ))}

        
      </div>
    </div>
  );
}
