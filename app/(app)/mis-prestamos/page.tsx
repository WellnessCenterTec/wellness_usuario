"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PageHeader from "@/components/shared/PageHeader";
import Spinner from "@/components/shared/Spinner";
import LoanCard from "@/components/pages/prestamos/LoanCard";
import { LoanInt, LoanStatus } from "@/styles/ModelTypes";

export default function MisPrestamosPage() {
  const { auth } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState<"pending" | "active" | "history">("pending");
  
  const { data: loans, isLoading, error } = useSWR<LoanInt[]>(
    auth?.registration ? `/loan/myLoans/${auth.registration}` : null,
    fetcher
  );
  
  // Filtrar préstamos según la pestaña activa
  const filteredLoans = loans?.filter(loan => {
    if (activeTab === "pending") {
      return loan.status === LoanStatus.PENDING || loan.status === LoanStatus.AWAITING_PICKUP;
    } else if (activeTab === "active") {
      return loan.status === LoanStatus.ON_LOAN;
    } else {
      return loan.status === LoanStatus.RETURNED || loan.status === LoanStatus.LOST || loan.status === LoanStatus.LATE;
    }
  });
  
  // Contar préstamos por categoría
  const pendingCount = loans?.filter(loan => 
    loan.status === LoanStatus.PENDING || loan.status === LoanStatus.AWAITING_PICKUP
  ).length || 0;
  
  const activeCount = loans?.filter(loan => 
    loan.status === LoanStatus.ON_LOAN
  ).length || 0;
  
  const historyCount = loans?.filter(loan => 
    loan.status === LoanStatus.RETURNED || loan.status === LoanStatus.LOST || loan.status === LoanStatus.LATE
  ).length || 0;
  
  return (
    <div>
      <PageHeader 
        image="/samples/fondo.jpeg" 
        title="Mis Préstamos" 
      />
      
      
      <div className="py-6 sm:py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
          <div className="flex items-start sm:items-center gap-3">
            <i className="fa-solid fa-location-dot text-blue-600 text-lg sm:text-xl flex-shrink-0 mt-1 sm:mt-0"></i>
            <p className="text-blue-800 font-medium text-sm sm:text-base">
              Lugar para recoger el material en las oficinas del Wellness Center 2 piso en recepción
            </p>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b scrollbar-hide">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base flex items-center whitespace-nowrap transition-colors ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pendientes
            {pendingCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("active")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base flex items-center whitespace-nowrap transition-colors ${
              activeTab === "active"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Activos
            {activeCount > 0 && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {activeCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 sm:px-6 py-3 font-medium text-sm sm:text-base flex items-center whitespace-nowrap transition-colors ${
              activeTab === "history"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Historial
            {historyCount > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {historyCount}
              </span>
            )}
          </button>
        </div>
        
        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Error al cargar los préstamos</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            {filteredLoans && filteredLoans.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No hay préstamos</h3>
                  <p className="text-slate-600">
                    {activeTab === "pending"
                      ? "No tienes préstamos pendientes"
                      : activeTab === "active"
                        ? "No tienes préstamos activos"
                        : "No tienes historial de préstamos"}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
