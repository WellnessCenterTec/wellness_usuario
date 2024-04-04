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

const CustomBar = (props:any ) => {
    const { fill, x, y, width, height, payload } = props;
  
    // Cambiar el color a gris si projection es true
    const actualFill = payload.projection ? '#A9A9A9' : fill;
  
    return <Rectangle x={x ? +x : 0} y={y ? +y : 0} width={width} height={height} fill={actualFill} />;
  };
  

  interface Props{
    data:ProyectionGraphData[]
  }

export default function ProyectionGraph({data}:Props) {

  const maxValue = Math.max(...data.map((item)=>item.value))

  return (
    <div className="w-full h-52 px-5">
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <ReferenceLine y={maxValue}  label={{ value: maxValue, position: 'insideTopLeft' }} stroke="red" strokeDasharray="3 3" /> 
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          
          <Bar dataKey="value" fill="#93C5FD" shape={<CustomBar />}  />
          {/* <Line dataKey="value" fill="#CFFAFE" stroke='#7DD3FC' dot={false} /> */}
          
        </ComposedChart>
        </ResponsiveContainer>
    </div>
  )
}
