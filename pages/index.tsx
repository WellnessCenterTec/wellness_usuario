import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav';
import bg from '/Users/alessandrotolentinohernandez/Documents/GitHub/wellness_usuario/assets/Estadio-borregos1920.jpg'
import gym from "/Users/alessandrotolentinohernandez/Documents/GitHub/wellness_usuario/assets/gym.jpeg"
import { Card } from '@/components/Card';

import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Ocupado', value: 400 },
  { name: 'Libre', value: 300 },
];

const COLORS = ['#003399', '#00C49F'];



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <Nav>

      <div className="bg-cover bg-center" style= {{ height: 250,backgroundImage: `url(${bg.src})`}}>
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Welness Center</h1>  
          </div>
        </div>
      </div>
        

      <h1 className='mx-8 mb-5 mt-5 text-2xl lg:text-3xl xl:text-3xl'> <strong>Ocupación en el gimnasio</strong></h1>


      <div  className="w-10/12 mx-auto p-8 bg-white border border-gray-400 rounded-lg shadow" >

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-3" >

      <div className="h-48 mx-10 lg:h-52 xl:h-52" >

        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

        </ResponsiveContainer> 

      </div>

      <div>
        <h1 className='text-center mt-8 text-3xl'>  <strong> Aforo actual </strong>   </h1>
        <h3 className='text-center mt-10 text-3xl'>300</h3>
      </div>

      <div>
        <h1 className='text-center mt-8 text-3xl'>  <strong> Disponibles</strong>   </h1>
        <h3 className='text-center mt-10 text-3xl'>200</h3>
      </div>

</div>



</div>

       <h1 className='mx-8 mt-10 text-2xl  lg:text-3xl xl:text-3xl'> <strong> Servicios </strong></h1>

      <div className="grid grid-cols-1 gap-3 mx-14 mb-10 mt-5 lg:grid-cols-3 xl:grid-cols-3 " >

          <Card title={"Gimnasio"} imgNombre={gym}></Card>
          <Card title={"Gimnasio"} imgNombre={gym}></Card>
          <Card title={"Gimnasio"} imgNombre={gym}></Card>
          <Card title={"Gimnasio"} imgNombre={gym}></Card>

        
      </div>

  </Nav>
  
   
  )
}
