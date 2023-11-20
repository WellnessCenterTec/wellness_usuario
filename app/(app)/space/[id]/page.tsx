"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import Reservable from "@/components/pages/space/Reservable";

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { ReservableInt } from "@/styles/ModelTypes";

import { useParams } from "next/navigation";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type ReservableDateFormat = [string, ReservableInt[]];

export default function Space() {
  const space = useSelector((state: RootState) => state.index);

  const params = useParams();
  const spaceId = params.id;

  const { data: reservables } = useSWR<ReservableDateFormat[]>(
    `/reservable/getReservables/${spaceId}`,
    fetcher
  );

  const [day, setDay] = useState("");

  // En cuanto carguen los reservables colocamos el dia como el primero que salga
  useEffect(() => {
    if (reservables) {
      setDay(reservables[0][0]);
    }
  }, [reservables]);

  function formatearFecha(fecha: Date | null) {
    const opcionesPorDefecto: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    if (fecha != null) {
      const fechaNew = new Date(fecha);
      return fechaNew.toLocaleDateString("es-ES", opcionesPorDefecto);
    } else {
      return "Fecha inválida";
    }
  }

  function formatearHora(fecha: Date | null) {
    if (fecha != null) {
      const fechaNew = new Date(fecha);
      const horas = fechaNew.getHours();
      const minutos = fechaNew.getMinutes();
      const segundos = fechaNew.getSeconds();
      const horaFormateada = `${agregarCeroDelante(horas)}:${agregarCeroDelante(
        minutos
      )}`;

      return horaFormateada;
    } else {
      return "Fecha inválida";
    }
  }

  function agregarCeroDelante(valor: number) {
    return valor < 10 ? `0${valor}` : valor;
  }

  console.log(reservables);

  if (!reservables) {
    return <div>Loading...</div>;
  }

  // Definimos el reservable seleccionado actualmente
  const selectedReservable = reservables.find((res) => res[0] === day);

  return (
    <div>
      <PageHeader title={space.spaceName ?? ""} image="/samples/fondo.jpeg" />

      <div className="flex-wrap gap-6 mt-4 mx-auto w-5/6">
        {reservables.length > 0 ? (
          <Slider slidesToShow={3} slidesToScroll={1}>
            {reservables.map((element, index) => (
              <div key={index} className="px-2">
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
          </Slider>
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
                hour={formatearHora(new Date(reser.init_date))}
                coach={reser?.admin?.name ?? ""}
                available={true}
                image="/samples/Avatar.png"
                spaceId={Number(spaceId)}
                actualQuota={reser.actualQuota}
                quota={reser.quota}
                init_date={new Date(reser.init_date)}
                end_date={new Date(reser.end_date)}
              />
            
          ))}

        
      </div>
    </div>
  );
}
