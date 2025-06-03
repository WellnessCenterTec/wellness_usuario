"use client";

import Space from "@/components/pages/index/Space";
import React from "react";

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { SpaceInt } from "@/styles/ModelTypes";

import Spinner from "@/components/shared/Spinner";
import { ProyectionGraphData } from "@/styles/AppTypes";
import ProyectionGraph from "@/components/data/ProyectionGraph";

// Live Status Dashboard Component
function LiveStatusDashboard({ liveStatusData }: { liveStatusData: any }) {
  // Datos mock para cuando no hay datos reales
  const mockLiveStatus = [
    { label: "Ocupado", value: 380, color: "#EF4444" },
    { label: "Disponible", value: 120, color: "#10B981" }
  ];

  // Usar datos reales si están disponibles, sino usar mock
  let statusData = mockLiveStatus;

  if (liveStatusData && Array.isArray(liveStatusData) && liveStatusData.length > 0) {
    statusData = liveStatusData.map((item: any, index: number) => ({
      label: item.label || (index === 0 ? "Ocupado" : "Disponible"),
      value: item.value || 0,
      color: index === 0 ? "#EF4444" : "#10B981"
    }));
  }

  const totalCapacity = statusData.reduce((sum, item) => sum + item.value, 0);
  const occupiedPercentage = totalCapacity > 0
    ? Math.round((statusData[0].value / totalCapacity) * 100)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 text-center">
        Afluencia en Tiempo Real
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        {/* Circular Progress */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#EF4444"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${occupiedPercentage * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-slate-900">{occupiedPercentage}%</span>
            <span className="text-xs sm:text-sm text-slate-500">Ocupado</span>
          </div>
        </div>

        {/* Status Legend */}
        <div className="space-y-3 sm:space-y-4 w-full lg:w-auto">
          {statusData.map((status, index) => (
            <div key={index} className="flex items-center justify-between lg:justify-start gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-base sm:text-lg font-medium text-slate-700">{status.label}</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900">{status.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const {data:hourStatus} = useSWR<ProyectionGraphData[]>("/space/wellnessAttendances",fetcher)
  const { data } = useSWR<SpaceInt[]>(`/user/getSpaces`, fetcher);
  const { data: liveStatusData } = useSWR<any>("/space/liveStatus", fetcher);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div
        key="welcome"
        className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"
      >
        <div className="text-center text-white px-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            ¡Te damos la bienvenida al Wellness Center!
          </h2>
          <p className="text-blue-100 text-sm sm:text-base">Tu centro de bienestar universitario</p>
        </div>
      </div>

      {/* Live Status Card */}
      <div className="-mt-6 sm:-mt-8 relative z-10 mb-6">
        <LiveStatusDashboard liveStatusData={liveStatusData} />
      </div>

      {/* Content Grid for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Hourly Chart Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 text-center">
            Afluencia por Hora
          </h2>
          <div className="w-full">
            {hourStatus ? (
              <ProyectionGraph data={hourStatus} />
            ) : (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">
            Servicios Disponibles
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {data ? (
              data.map((space) => (
                <Space
                  key={space.id}
                  name={space.name}
                  id={space.id}
                  img={space.image}
                />
              ))
            ) : (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}