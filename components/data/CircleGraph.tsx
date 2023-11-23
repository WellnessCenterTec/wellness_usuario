"use client";

import { fetcher } from "@/config/fetcher";
import React from "react";
import useSWR from "swr";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { GraphData } from "@/styles/AppTypes";

const RED = "#F43F5E"
const BLUE = "#60A5FA"

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
      {total*percent}
    
    </text>
  );
};

export default function CircleGraph() {
  const { data } = useSWR<GraphData[]>("/space/liveStatus", fetcher);


  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={800} height={800}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props) => renderCustomizedLabel({...props,total:data.reduce((a,b)=>a+b.value,0)})}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.label === "Llenado" ? RED : BLUE}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
