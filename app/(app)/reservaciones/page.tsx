"use client";

import Reservation from "@/components/pages/reservaciones/Reservation";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

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

export default function page() {
  const user = useSelector((state: RootState) => state.auth);

  const { data } = useSWR<ReservaInt[]>("/user/reserves", fetcher);

  return (
    <div>
      <PageHeader image="/samples/fondo.jpeg" title="Mis Reservaciones" />

      <div className="mt-6 mx-4 space-y-3">
        {data ? (
          data.map((reserva) => (
            <Reservation
              image="/samples/fondo.jpeg"
              date={formatearFecha(new Date(reserva.reservation_date))}
              location={reserva.reservable?.space?.location ?? ""}
              time={formatearHora(new Date(reserva.reservation_date))}
              title={reserva.reservable?.space?.name ?? ""}
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
