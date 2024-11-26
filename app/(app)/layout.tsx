"use client";

import Loader from "@/components/shared/Loader";
import { fetcher } from "@/config/fetcher";
import { RootState } from "@/redux/store";
import { loadPerfil } from "@/redux/thunks/authThunk";
import { AnnounceInt } from "@/styles/ModelTypes";
import { formatearFecha } from "@/utils/helpers";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  const { auth, cargando } = useSelector((state: RootState) => state.auth);
  const [menuIcon, setIcon] = useState(false);
  const [announcements, setAnnouncements] = useState(false)


  const dispatch = useDispatch<any>();
  const router = useRouter();

  const handleSmallerScreensNavigation = () => {
    setIcon(!menuIcon);
  };

  useEffect(()=>{
    dispatch(loadPerfil())
  },[])

  useEffect(() => {
    if (!auth?.id && !cargando) {
      router.push("/login");
    }
  }, [cargando, auth, router]);

  const {data:announces} = useSWR<AnnounceInt[]>("/announce",fetcher)


  if (cargando) {
    return (
      <Loader />
    );
  }

  return (
    <NextUIProvider>
      <div className=" w-full border-black-200 bg-gray-50">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/#" className="flex items-center">
            <Image
              src={"/images/borrego-blue.svg"}
              className="h-12 mr-3"
              width={40}
              height={40}
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Athletics
            </span>
          </Link>

          {/* Smaller screens - navigation skills */}
          {/* onClick change the icon*/}

          <div className="flex items-center gap-6 relative">
            <button
              type="button"
              className="fa-solid fa-bell text-blue-700 text-xl"
              onClick={()=>setAnnouncements(!announcements)}
            ></button>

            <div className={`absolute top-10 right-5 bg-white z-40 p-4 w-56 h-36 space-y-2 overflow-y-auto ${announcements ? "":"hidden"}`}>

              {announces && announces.length > 0 ? announces.map((announce=>(

              <div 
                key={announce.id}
              >
                <p className="text-blue-700 font-bold text-sm capitalize">{announce.title}</p>
                <p className="text-gray-700 text-sm capitalize">{formatearFecha(new Date(announce.event_date))}</p>
              </div>
              ))) : (
                <div className="w-full mt-10">
                  <p className="text-blue-700 text-sm text-center font-bold">No hay anuncios disponibles</p>
                </div>
              )} 
              

            </div>

            <button
              onClick={handleSmallerScreensNavigation}
              className="flex z-30"
            >
              {menuIcon ? (
                <AiOutlineClose size={25} className="text-[#FFFFF]" />
              ) : (
                <AiOutlineMenu size={25} className="text-[#FFFFF]" />
              )}
            </button>
          </div>
        </div>

        {/* Smaller screens - Navbar*/}
      </div>
      <MobileNavigation
        menuIcon={menuIcon}
        handleSmallerScreensNavigation={handleSmallerScreensNavigation}
      />

      <main className="bg-gray-100 min-h-screen flex flex-col">{children}</main>
    </NextUIProvider>
  );
}

interface MobileNavigationProps {
  menuIcon: boolean;
  handleSmallerScreensNavigation: () => void;
}

function MobileNavigation({
  menuIcon,
  handleSmallerScreensNavigation,
}: MobileNavigationProps) {
  return (
    <div
      className={` fixed top-20 flex justify-center items-center w-full bg-slate-800 text-white ease-in duration-300 z-50 left-0 ${
        menuIcon ? "" : "translate-x-[100%]"
      }`}
    >
      {/* Smaller screens - Links*/}

      <div className="w-full">
        <ul className="font-bold text-2xl">
          <li
            onClick={handleSmallerScreensNavigation}
            className="pt-5 pb-10 px-4 hover:text-[#CEFF00] cursor-pointer"
          >
            <Link href="/#" className="text-white">
              Inicio
            </Link>
          </li>

          <li
            onClick={handleSmallerScreensNavigation}
            className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer"
          >
            <Link href="/reservaciones" className="text-white">
              Reservaciones
            </Link>
          </li>
          <li
            onClick={handleSmallerScreensNavigation}
            className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer"
          >
            <Link href="https://sites.google.com/tec.mx/intramurosrecsports/inicio" target="_blank" className="text-white">
              Intramuros
            </Link>
          </li>
          <li
            onClick={handleSmallerScreensNavigation}
            className="py-10 px-4 hover:text-[#CEFF00] cursor-pointer"
          >
            <Link href="https://eventos.tec.mx/s/lt-event?language=es_MX&id=a5u8X000002EqqfQAC" target="_blank" className="text-white">
              Lockers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
