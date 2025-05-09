"use client";

import PageHeader from "@/components/shared/PageHeader";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { LoanInt } from "@/styles/ModelTypes";
import Spinner from "@/components/shared/Spinner";
import { formatearFecha } from "@/utils/helpers";
import { useModal } from "@/components/UI/Modal";
import LoanModal from "@/components/pages/prestamos/LoanModal";

export default function Prestamos() {
  const { auth } = useSelector((state: RootState) => state.auth);
  const { active, setActive } = useModal();

  // Fetch user's loans
  const { data: loans, isLoading } = useSWR<LoanInt[]>(
    auth ? `/loan/myLoans/${auth.registration}` : null,
    fetcher
  );

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "AWAITING_PICKUP":
        return "bg-blue-100 text-blue-800";
      case "ON_LOAN":
        return "bg-green-100 text-green-800";
      case "LATE":
        return "bg-red-100 text-red-800";
      case "LOST":
        return "bg-red-100 text-red-800";
      case "RETURNED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status text in Spanish
  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendiente";
      case "AWAITING_PICKUP":
        return "Por recoger";
      case "ON_LOAN":
        return "Prestado";
      case "LATE":
        return "Atrasado";
      case "LOST":
        return "Perdido";
      case "RETURNED":
        return "Devuelto";
      default:
        return status;
    }
  };

  return (
    <div>
      <PageHeader image="/samples/fondo.jpeg" title="Préstamo de Materiales" />

      <div className="container mx-auto px-4 py-6">

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center">
            <i className="fa-solid fa-location-dot text-blue-600 mr-3 text-xl"></i>
            <p className="text-blue-800 font-medium">
              Lugar para recoger el material en las oficinas del Wellness Center 2 piso en recepción
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Mis Préstamos</h2>
          <button
            onClick={() => setActive(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Solicitar Préstamo
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <Spinner />
          </div>
        ) : loans && loans.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Recogida</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Devolución</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {loan.material?.image && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img className="h-10 w-10 rounded-full object-cover" src={loan.material.image} alt={loan.material?.name} />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{loan.material?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(new Date(loan.pickupDate))}
                      <div className="text-xs text-gray-400">{loan.pickupTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(new Date(loan.returnDate))}
                      <div className="text-xs text-gray-400">{loan.returnTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(loan.status)}`}>
                        {getStatusText(loan.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-500">No tienes préstamos registrados</p>
          </div>
        )}
      </div>

      {/* Modal para crear préstamo */}
      <LoanModal active={active} setActive={setActive} />
    </div>
  );
}
