"use client";

import Reservation from '@/components/pages/reservaciones/Reservation'
import PageHeader from '@/components/shared/PageHeader'
import React from 'react'


import { ReservaInt, ReservableInt } from '@/styles/ModelTypes';
import { handleError } from "@/utils/errorHandler";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Spinner from '@/components/shared/Spinner';


export default function page() {
    let data: ReservaInt[] = [];
    const user = useSelector((state: RootState) => state.auth);

    console.log(user.auth?.id)
    

    const config = axiosConfig()

    clienteAxios.get("/reservation/reservasUser", {
        params: {
          Id: user.auth?.id
        }    
      })
      .then(function (response) {
        data.push(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    
    
  return (
    <div>
        <PageHeader 
            image='/samples/fondo.jpeg'
            title='Mis Reservaciones'
        />

        <div className='mt-6 mx-4 space-y-3'>

                 
          {data ? (
              data.map((reserva) => <Reservation image = "/samples/fondo.jpeg" 
              date={reserva.fecha.toDateString()} 
              location={reserva.ubicación} 
              time= {reserva.hora.toString()}
              title={reserva.espacio}              
              />)
            ) : (
              <Spinner />
            )}

        </div>
    </div>
  )
}
