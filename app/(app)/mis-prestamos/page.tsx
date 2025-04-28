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
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 font-medium text-sm flex items-center whitespace-nowrap ${
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
            className={`px-4 py-2 font-medium text-sm flex items-center whitespace-nowrap ${
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
            className={`px-4 py-2 font-medium text-sm flex items-center whitespace-nowrap ${
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
              <div className="space-y-4">
                {filteredLoans.map((loan) => (
                  <LoanCard key={loan.id} loan={loan} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {activeTab === "pending" 
                    ? "No tienes préstamos pendientes" 
                    : activeTab === "active" 
                      ? "No tienes préstamos activos" 
                      : "No tienes historial de préstamos"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
