"use client";

import { fetcher } from "@/config/fetcher";
import React from "react";
import useSWR from "swr";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GraphData } from "@/styles/AppTypes";

const PRIMARY_BLUE = "#003366"
const LIGHT_GRAY = "#E2E8F0"

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  total
}: any) => {
 
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {Math.round(total*percent)}
    
    </text>
  );
};

export default function CircleGraph() {
  const { data, error } = useSWR<GraphData[]>("/space/liveStatus", fetcher);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-slate-500">Error al cargar datos</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2 animate-pulse"></div>
          <p className="text-sm text-slate-500">Cargando...</p>
        </div>
      </div>
    );
  }

  // Validar que data es un array y tiene elementos válidos
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-slate-500">Sin datos disponibles</p>
        </div>
      </div>
    );
  }

  // Validar que cada elemento tiene las propiedades necesarias
  const validData = data.filter(item =>
    item &&
    typeof item === 'object' &&
    'label' in item &&
    'value' in item &&
    typeof item.value === 'number'
  );

  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-slate-500">Datos inválidos</p>
        </div>
      </div>
    );
  }

  // Si no hay datos válidos, mostrar datos de ejemplo
  const chartData = validData.length > 0 ? validData : [
    { label: "Ocupado", value: 380 },
    { label: "Disponible", value: 120 }
  ];

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => renderCustomizedLabel({...props, total: chartData.reduce((a, b) => a + b.value, 0)})}
            outerRadius={60}
            innerRadius={0}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={450}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.label === "Llenado" || entry.label === "Ocupado" ? PRIMARY_BLUE : LIGHT_GRAY}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
