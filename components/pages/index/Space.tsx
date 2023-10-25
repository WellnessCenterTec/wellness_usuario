import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  img: string;
  name: string;
}

export default function Space({ name, img }: Props) {
  return (
    <div className="h-52 w-full rounded-3xl relative">
      {/* Imagen de fondo */}

      <Image
        className="w-full h-52 object-center object-cover absolute top-0 left-0 z-10 inline-block rounded-3xl"
        src={img}
        width={600}
        height={500}
        alt={name}
      />

      {/* Overlay */}
      <div className="w-full h-52 bg-blue-500 opacity-30 absolute top-0 left-0 z-20 inline-block rounded-3xl "></div>

      {/* Contenido */}

      <div className="w-full h-52 grid place-items-center absolute top-0 left-0 z-30">
        <div>
          <p className="text-gray-100 font-bold text-3xl">{name}</p>
        </div>

        <Link
          className="bg-blue-600 text-gray-50 px-2 py-1 rounded-lg text-lg absolute bottom-5"
          href="/space/1"
        >
          Reservar
        </Link>
      </div>
    </div>
  );
}
