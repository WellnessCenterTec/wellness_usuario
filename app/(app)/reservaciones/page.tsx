"use client";

import Reservation from "@/components/pages/reservaciones/Reservation";
import PageHeader from "@/components/shared/PageHeader";
import React, { useState } from "react";
import Link from "next/link";

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
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function page() {
  const { data } = useSWR<ReservaInt[]>("/reservation/reserves", fetcher);

  const [selectedReserve, setSelectedReserve] = useState<ReservaInt | null>(null)
  const [activeQR, setActiveQR] = useState(false)

  return (
    <ProtectedRoute>
      <div>
        <PageHeader image="/samples/fondo.jpeg" title="Mis Reservaciones" />

        <div className="mt-6 space-y-3 sm:space-y-4">
          {data ? (
            data.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {data.map((reserva) => (
                  <Reservation
                    key={reserva.id}
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No tienes reservaciones</h3>
                  <p className="text-slate-600 mb-4">Aún no has realizado ninguna reservación.</p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Hacer una reservación
                  </Link>
                </div>
              </div>
            )
          ) : (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          )}
        </div>
        {selectedReserve && (
          <QRModal active={activeQR} setActive={(value) => {
            setActiveQR(value)
          }} reserva={selectedReserve} />
        )}
      </div>
    </ProtectedRoute>
  );
}
