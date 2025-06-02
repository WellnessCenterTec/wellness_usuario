"use client";

import { ReservableInt } from "@/styles/ModelTypes";
import { formatearHora } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { DateTime } from "luxon";

interface Props {
  id: number;
  image: string;
  reservable: ReservableInt;
}

export default function Reservable({ id, image, reservable }: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const spaceName = search.get("name");

  const {} = reservable;
  const hour = formatearHora(new Date(reservable.init_date));
  const coach = reservable?.admin?.name ?? "";

  const reservableDate = DateTime.fromISO(reservable.init_date)
    .plus({ minutes: 5 })
    .toJSDate();
  const nowPlus1 = DateTime.now().plus({ day: 1 }).toJSDate();
  const cannotReserve = nowPlus1 <= reservableDate;

  function handleReserve() {
    // Verificamos si es posible reservar

    if (cannotReserve) {
      Swal.fire({
        icon: "error",
        title: "No puedes reservar",
        text: "Solo puedes reservar con un dia de anticipación",
      });
      return;
    }

    router.push(`/space/reserve/${id}?name=${spaceName}`);
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Coach Avatar */}
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-0.5">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                <Image
                  src={image}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-2xl"
                  alt="Coach Avatar"
                />
              </div>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* Class Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-900 font-bold text-lg">{hour}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p className="text-slate-600 font-medium">Coach {coach}</p>
            </div>
          </div>
        </div>

        {/* Reserve Button */}
        <button
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            cannotReserve
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
          type="button"
          onClick={handleReserve}
          disabled={cannotReserve}
        >
          {cannotReserve ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              No disponible
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
