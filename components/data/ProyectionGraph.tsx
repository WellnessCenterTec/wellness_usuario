"use client"

import { ProyectionGraphData } from '@/styles/AppTypes'

import React from 'react'
import { BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis,Tooltip,Legend,Bar, Rectangle, BarProps, Line, ReferenceLine, ComposedChart } from 'recharts'
import { ActiveShape } from 'recharts/types/util/types'

const mock_data: ProyectionGraphData[] = [
    {label:"6am",value:100,projection:false},
    {label:"7am",value:80,projection:false},
    {label:"8am",value:80,projection:false},
    {label:"9am",value:70,projection:false},
    {label:"10am",value:100,projection:false},
    {label:"11am",value:120,projection:false},
    {label:"12pm",value:130,projection:false},
    {label:"1pm",value:130,projection:false},
    {label:"2pm",value:150,projection:true},
    {label:"3pm",value:130,projection:true},
    {label:"4pm",value:120,projection:true},
    {label:"5pm",value:110,projection:true},
    {label:"6pm",value:150,projection:true},
    {label:"7pm",value:170,projection:true},
    {label:"8pm",value:100,projection:true},
    {label:"9pm",value:80,projection:true},
]

// Iterface real pero no se puede colocar por errores de tipado de recharts
interface CustomBarProps extends BarProps {
    payload: ProyectionGraphData;
}

const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;

    // Cambiar el color a gris si projection es true
    const actualFill = payload?.projection ? '#94A3B8' : '#3B82F6';

    return (
      <Rectangle
        x={x || 0}
        y={y || 0}
        width={width || 0}
        height={height || 0}
        fill={actualFill}
        rx={4}
        ry={4}
      />
    );
  };
  

  interface Props{
    data:ProyectionGraphData[]
  }

export default function ProyectionGraph({data}:Props) {
  // Si no hay datos, usar datos de ejemplo
  const chartData = (!data || !Array.isArray(data) || data.length === 0) ? mock_data : data;

  // Validar que cada elemento tiene las propiedades necesarias
  const validData = chartData.filter(item =>
    item &&
    typeof item === 'object' &&
    'label' in item &&
    'value' in item &&
    typeof item.value === 'number'
  );

  if (validData.length === 0) {
    return (
      <div className="w-full h-52 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-lg mx-auto mb-2"></div>
          <p className="text-sm text-slate-500">Datos inválidos</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...validData.map((item) => item.value));

  return (
    <div className="w-full h-52 px-2">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={validData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748B' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#64748B' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <ReferenceLine
            y={maxValue}
            label={{ value: `Máximo: ${maxValue}`, position: 'insideTopRight' }}
            stroke="#EF4444"
            strokeDasharray="5 5"
          />
          <Bar
            dataKey="value"
            fill="#3B82F6"
            shape={<CustomBar />}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
