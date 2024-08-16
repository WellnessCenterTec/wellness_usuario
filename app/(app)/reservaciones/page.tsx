"use client";

import Reservation from "@/components/pages/reservaciones/Reservation";
import PageHeader from "@/components/shared/PageHeader";
import React, { useState } from "react";

import { ReservaInt, ReservableInt } from "@/styles/ModelTypes";
import { handleError } from "@/utils/errorHandler";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from "@/components/shared/Spinner";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { formatearFecha, formatearHora } from "@/utils/helpers";
import { QRModal } from "./QRModal";

export default function page() {
  const { data } = useSWR<ReservaInt[]>("/reservation/reserves", fetcher);

  const [selectedReserve, setSelectedReserve] = useState<ReservaInt | null>(null)
  const [activeQR, setActiveQR] = useState(false)

  return (
    <div>
      <PageHeader image="/samples/fondo.jpeg" title="Mis Reservaciones" />

      <div className="mt-6 mx-4 space-y-3">
        {data ? (
          data.map((reserva) => (
            
              <Reservation
                id={reserva.id}
                image={
                  reserva.reservable?.space?.image ?? "/samples/fondo.jpeg"
                }
                date={formatearFecha(new Date(reserva.reservation_date))}
                location={reserva.reservable?.space?.location ?? ""}
                time={formatearHora(new Date(reserva.reservation_date))}
                title={reserva.reservable?.space?.name ?? ""}
                onClick={()=>{
                   setSelectedReserve(reserva)
                    setActiveQR(true)
                }}
              />
           
          ))
        ) : (
          <Spinner />
        )}
      </div>
      {selectedReserve && (

        <QRModal active={activeQR} setActive={(value) => {
          setActiveQR(value)
        }} reserva={selectedReserve} />
      )}
    </div>
  );
}
