"use client";

import Loader from "@/components/shared/Loader";
import { RootState } from "@/redux/store";
import { loadPerfil } from "@/redux/thunks/authThunk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

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

  if (cargando) {
    return (
      <Loader />
    );
  }

  return (
    <>
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

              <div >
                <p className="text-blue-700 font-bold text-sm">Torneo Relampago de Tochito</p>
                <p className="text-gray-700 text-sm">10 de septiembre de 2023</p>
              </div>
              <div >
                <p className="text-blue-700 font-bold text-sm">Torneo Relampago de Tochito</p>
                <p className="text-gray-700 text-sm">10 de septiembre de 2023</p>
              </div>
              <div >
                <p className="text-blue-700 font-bold text-sm">Torneo Relampago de Tochito</p>
                <p className="text-gray-700 text-sm">10 de septiembre de 2023</p>
              </div>

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

      <main className="bg-gray-100 min-h-screen">{children}</main>
    </>
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
        </ul>
      </div>
    </div>
  );
}
