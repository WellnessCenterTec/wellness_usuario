"use client";

import { fetcher } from "@/config/fetcher";
import { RootState } from "@/redux/store";
import { removeAuth } from "@/redux/slices/authSlice";
import { AnnounceInt } from "@/styles/ModelTypes";
import { formatearFecha } from "@/utils/helpers";
import { NextUIProvider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineBell, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import jsCookie from "js-cookie";
import Footer from "@/components/UI/Footer";

interface Props {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: Props) {
  const { auth } = useSelector((state: RootState) => state.auth);
  const [menuIcon, setIcon] = useState(false);
  const [announcements, setAnnouncements] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSmallerScreensNavigation = () => {
    setIcon(!menuIcon);
  };

  const handleLogout = () => {
    jsCookie.remove("token");
    dispatch(removeAuth());
    router.push("/");
  };

  const { data: announces } = useSWR<AnnounceInt[]>("/announce", fetcher);

  return (
    <NextUIProvider>
      <div className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Image
                  src={"/images/borrego-blue.svg"}
                  className="w-6 h-6 filter brightness-0 invert"
                  width={24}
                  height={24}
                  alt="Wellness Logo"
                />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Wellness Center
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Inicio</span>
              </Link>
              <Link
                href="/reservaciones"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Reservaciones</span>
              </Link>
              <Link
                href="/materiales"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium">Materiales</span>
              </Link>
              <Link
                href="/mis-prestamos"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Mis Préstamos</span>
              </Link>
              <Link
                href="https://sites.google.com/tec.mx/intramurosrecsports/inicio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                <span className="font-medium">Intramuros</span>
                <HiExternalLink className="w-4 h-4 text-slate-500" />
              </Link>
              <Link
                href="https://eventos.tec.mx/s/lt-event?language=es_MX&id=a5u8X000002EqqfQAC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Lockers</span>
                <HiExternalLink className="w-4 h-4 text-slate-500" />
              </Link>
            </nav>

            {/* Navigation Actions */}
            <div className="flex items-center gap-4 relative">
              {/* Notifications */}
              <button
                type="button"
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                onClick={() => setAnnouncements(!announcements)}
              >
                <AiOutlineBell className="w-5 h-5" />
                {announces && announces.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                )}
              </button>

              {/* Announcements Dropdown */}
              <div className={`absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 z-40 w-80 max-h-96 overflow-hidden ${announcements ? "" : "hidden"}`}>
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Anuncios</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {announces && announces.length > 0 ? announces.map((announce) => (
                    <div key={announce.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <p className="font-semibold text-slate-800 text-sm mb-1">{announce.title}</p>
                      <p className="text-slate-600 text-xs">{formatearFecha(new Date(announce.event_date))}</p>
                    </div>
                  )) : (
                    <div className="p-8 text-center">
                      <AiOutlineBell className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm font-medium">No hay anuncios disponibles</p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Menu - Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <AiOutlineUser className="w-5 h-5" />
                  <span className="font-medium">{auth?.registration}</span>
                </button>

                {/* User Dropdown */}
                <div className={`absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-slate-200 z-40 w-48 overflow-hidden ${userMenu ? "" : "hidden"}`}>
                  <div className="p-4 border-b border-slate-200">
                    <p className="font-semibold text-slate-800 text-sm">{auth?.name}</p>
                    <p className="text-slate-600 text-xs">{auth?.registration}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-4 text-slate-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <AiOutlineLogout className="w-4 h-4" />
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleSmallerScreensNavigation}
                className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              >
                {menuIcon ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthenticatedMobileNavigation
        menuIcon={menuIcon}
        handleSmallerScreensNavigation={handleSmallerScreensNavigation}
        auth={auth}
        handleLogout={handleLogout}
      />

      <div className="bg-gray-100 min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </NextUIProvider>
  );
}

interface AuthenticatedMobileNavigationProps {
  menuIcon: boolean;
  handleSmallerScreensNavigation: () => void;
  auth: any;
  handleLogout: () => void;
}

function AuthenticatedMobileNavigation({
  menuIcon,
  handleSmallerScreensNavigation,
  auth,
  handleLogout,
}: AuthenticatedMobileNavigationProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ${
        menuIcon ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={handleSmallerScreensNavigation}
    >
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          menuIcon ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Menú</h2>
            <p className="text-sm text-slate-600">{auth?.registration}</p>
          </div>
          <button
            onClick={handleSmallerScreensNavigation}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-6">
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                onClick={handleSmallerScreensNavigation}
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/reservaciones"
                onClick={handleSmallerScreensNavigation}
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Reservaciones</span>
              </Link>
            </li>
            <li>
              <Link
                href="/materiales"
                onClick={handleSmallerScreensNavigation}
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium">Materiales</span>
              </Link>
            </li>
            <li>
              <Link
                href="/mis-prestamos"
                onClick={handleSmallerScreensNavigation}
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Mis Préstamos</span>
              </Link>
            </li>
            <li>
              <Link
                href="https://sites.google.com/tec.mx/intramurosrecsports/inicio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
                <span className="font-medium">Intramuros</span>
                <HiExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
              </Link>
            </li>
            <li>
              <Link
                href="https://eventos.tec.mx/s/lt-event?language=es_MX&id=a5u8X000002EqqfQAC"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors group"
              >
                <svg className="w-5 h-5 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Lockers</span>
                <HiExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
              </Link>
            </li>
            <li>
              <div className="border-t border-slate-200 my-4"></div>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  handleSmallerScreensNavigation();
                }}
                className="w-full flex items-center gap-3 p-3 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
              >
                <AiOutlineLogout className="w-5 h-5 text-slate-500 group-hover:text-red-600" />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">Wellness Center</p>
            <p className="text-xs text-blue-600">Un espacio para tu bienestar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
