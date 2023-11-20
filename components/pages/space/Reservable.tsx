"use client";


import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useDispatch } from "react-redux";

interface Props {
  hour: string;
  coach: string;
  image: string;
  spaceId: number
}

export default function Reservable({ hour, coach, image, spaceId}: Props) {

  return (
    <Link 
    href={`/space/reserve/${spaceId}`}
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
    </Link>
  );
}
