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
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        Afluencia en Tiempo Real
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Circular Progress */}
        <div className="relative w-48 h-48">
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
            <span className="text-3xl font-bold text-slate-900">{occupiedPercentage}%</span>
            <span className="text-sm text-slate-500">Ocupado</span>
          </div>
        </div>

        {/* Status Legend */}
        <div className="space-y-4">
          {statusData.map((status, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: status.color }}
              />
              <span className="text-lg font-medium text-slate-700">{status.label}</span>
              <span className="text-2xl font-bold text-slate-900">{status.value}</span>
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
        className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center"
      >
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            ¡Te damos la bienvenida al Wellness Center!
          </h2>
          <p className="text-blue-100">Tu centro de bienestar universitario</p>
        </div>
      </div>

      {/* Live Status Card */}
      <div className="mx-4 -mt-8 relative z-10">
        <LiveStatusDashboard liveStatusData={liveStatusData} />
      </div>

      {/* Hourly Chart Section */}
      <div className="mx-4 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
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
      </div>

      {/* Services Section */}
      <div className="mx-4 mt-6 pb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Servicios Disponibles
        </h2>

        <div className="space-y-4">
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
  );
}