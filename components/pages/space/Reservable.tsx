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
    <div className="w-full bg-white flex items-center justify-between rounded-xl p-5">
      <div className="flex items-center">
        <div className="bg-gray-200 p-2 rounded-full grid place-items-center">
          <Image
            src={image}
            width={50}
            height={50}
            className="rounded-full bg-blue-400"
            alt="Avatar"
          />
        </div>

        <div className="ml-7">
          <p className="text-gray-900 font-bold text-lg text-left">{hour}</p>

          <p className="text-gray-600">Coach {coach}</p>
        </div>
      </div>
      <button
        className={` ${
          cannotReserve
            ? "bg-gray-300 text-gray-600"
            : "bg-blue-100 text-blue-600"
        } font-bold rounded px-4 py-2 justify-self-end`}
        type="button"
        onClick={handleReserve}
      >
        Reservar
      </button>
    </div>
  );
}
