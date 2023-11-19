"use client"

import React, { useEffect, useState } from 'react';
import {Switch} from "@headlessui/react"
import PageHeader from '@/components/shared/PageHeader'
import Reservable from '@/components/pages/space/Reservable'
import { useRouter } from 'next/router';


import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { ReservableInt } from '@/styles/ModelTypes';
import { handleError } from "@/utils/errorHandler";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";


import { usePathname, useSearchParams, useParams } from 'next/navigation'
import { url } from 'inspector';
import Spinner from '@/components/shared/Spinner';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function Space() {
  const params = useParams();
  const spaceId = params.id;
  var fechasPrimeros 
  var objetosConFechaSeleccionada
  const [diaSeleccionado, setDia] = useState<null | Date>(null)
  const [botonSeleccionado, setBotonSeleccionado] = useState<null | number>(null)


 const { data } = useSWR<ReservableInt[][]>(`/reservable/getReservables/${spaceId}`, fetcher);


 useEffect(()=>{
  if(data != undefined && data != null && data.length != 0){
    setDia(data[0][0].init_date)
    setBotonSeleccionado(0)
  }
},[data])


if (data !== undefined && diaSeleccionado !== null) {
  // Mapear la primera fecha de cada grupo
  fechasPrimeros = data.map((grupo) => (grupo.length > 0 ? grupo[0].init_date : null));

  // Filtrar los objetos que coinciden con la fecha seleccionada (año, mes, día)
  objetosConFechaSeleccionada = data.flatMap(grupo =>
    grupo.filter(reservable => {
      const fechaReservable = new Date(reservable.init_date);
      const fechaSeleccionada = new Date(diaSeleccionado);
      
      return (
        fechaReservable.getFullYear() === fechaSeleccionada.getFullYear() &&
        fechaReservable.getMonth() === fechaSeleccionada.getMonth() &&
        fechaReservable.getDate() === fechaSeleccionada.getDate()
      );
    })
  );
}

 function formatearFecha(fecha: Date | null){
  const opcionesPorDefecto: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (fecha != null) {
    const fechaNew = new Date(fecha)
    return fechaNew.toLocaleDateString('es-ES', opcionesPorDefecto);
  } else {
    return 'Fecha inválida';
  }
 }

 function formatearHora(fecha: Date | null){

  if (fecha != null) {
    const fechaNew = new Date(fecha)
    const horas = fechaNew.getHours();
    const minutos = fechaNew.getMinutes();
    const segundos = fechaNew.getSeconds();
    const horaFormateada = `${agregarCeroDelante(horas)}:${agregarCeroDelante(minutos)}`;

    return horaFormateada
  } else {
    return 'Fecha inválida';
  }
 }

 function agregarCeroDelante(valor: number) {
  return valor < 10 ? `0${valor}` : valor;
}



  return (
    <div>

        <PageHeader 
            title='Crossfit'
            image='/samples/fondo.jpeg'
        />        


          <div className='flex-wrap gap-6 mt-4 mx-auto w-5/6'>
          {fechasPrimeros !== undefined && fechasPrimeros.length > 0 ? (
            <Slider slidesToShow={3} slidesToScroll={1}>
              {fechasPrimeros.map((fecha, index) => (
                <div key={index} className='px-2'>
                  <button
                    type='button'
                    onClick={() => {
                      setDia(fecha);
                      setBotonSeleccionado(index);
                    }}
                    className={`px-2 py-2 rounded-lg text-xl ${botonSeleccionado === index ? 'bg-blue-800 text-gray-50 border-blue-800' : 'bg-white-300 text-blue-800 border-blue-800'}`}
                    style={{ width: '100%' }}
                  >
                    {formatearFecha(fecha)}
                  </button>
                </div>
              ))}
            </Slider>
          ) : (
            <p>No hay fechas disponibles.</p>
          )}
        </div>

        <div className='w-5/6 h-[1px] bg-gray-800 mt-3 mx-auto'/>
        

        <div className='mx-auto w-5/6 mt-3 grid place-items-center gap-4'>


        {objetosConFechaSeleccionada !== undefined && objetosConFechaSeleccionada.length > 0 ? (
             objetosConFechaSeleccionada.map((reservable, index) => (
              <div key={index} className='px-2'>
                <Reservable 
                hour= {formatearHora(reservable.init_date)}
                teacher={reservable.coach}
                available={true}
                image='/samples/Avatar.png'
                spaceId = {Number(spaceId)}
                actualQuota={reservable.actualQuota}
                quota={reservable.quota}
                init_date={reservable.init_date}
                end_date={reservable.end_date}
            />
              </div>
            ))
          ) : (
            <p>No hay reservables disponibles.</p>
          )}


        </div>

    </div>
  )
}
