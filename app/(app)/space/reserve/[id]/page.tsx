"use client";


import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Fragment, useEffect, useState} from "react";
import { handleError } from "@/utils/errorHandler";
import Swal from "sweetalert2";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";


import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function Reserve() {

  const reservable = useSelector((state: RootState) => state.index);
  const alumno = useSelector((state: RootState) => state.auth);
  
  const [reservableId, setReservableId] = useState<null | number>(null)
  const [userId, setUserId] = useState<null | number>(null)
  const [spaceId, setSpaceId] = useState<null | number>(null)
  const [spaceName, setSpaceName] = useState("")
  const [hour, setHour] = useState("")
  const [teacher, setTeacher] = useState("")
  const [teacherId, setTeacherId] = useState<null | number>(null)
  const [actualQuota, setActualQuota] = useState<null | number>(null)
  const [Quota, setQuota] = useState<null | number>(null)
  const [init_date, setInit_date] = useState<null | Date>(null)
  const [end_date, setEnd_date] = useState<null | Date>(null)


  useEffect(()=>{

    if(alumno?.auth?.id){
      setUserId(alumno?.auth?.id)
    }

    if(reservable?.spaceId != undefined && 
      reservable?.spaceName != undefined && 
      reservable?.hour != undefined &&
      reservable?.teacher != undefined &&
      reservable?.teacherId != undefined &&
      reservable?.actualQuota != undefined &&
      reservable?.quota  != undefined &&
      reservable?.init_date  != undefined &&
      reservable?.idReservable != undefined
      ){
        setReservableId(reservable?.idReservable)
        setSpaceId(reservable?.spaceId)
        setSpaceName(reservable?.spaceName)
        setHour(reservable?.hour)
        setTeacher(reservable?.teacher)
        setTeacherId(reservable?.teacherId)
        setActualQuota(reservable?.actualQuota)
        setQuota(reservable?.quota)
        setInit_date(reservable?.init_date)
        setEnd_date(reservable?.end_date)
    } else {
      console.log("adios")

    }
  },[reservable])

  const handleSubmit = async (e:any)=>{
    e.preventDefault()

    console.log("Funciona")

    
    try {
        const config = axiosConfig()

        if(!config){
            throw new Error("Sesión vencida inicia sesion")
        }

        if (init_date != null && end_date != null )
        {
          const newDate = new Date(init_date)
          const {data} = await clienteAxios.post("/reservation/createReserva",{
            

            reservableId: reservableId,
            userId: userId,
            reservation_date: newDate.toISOString(),
            status: "Activa",
            reason: "Reservada"
      
           //spaceId:spaceId,
           //init_date:init_date.toISOString(),
           //end_date: end_date.toISOString(),
          //adminId: teacherId,
          },config)
        }
        
        await Swal.fire({
            icon:"success",
            title:"Reserva creada con exito!!"
        })


        
    } catch (error:any) {
        return handleError(error)
        
    }

    
  }



  function formatearHora(fecha: Date | null){

    if (fecha != null) {
      const fechaNew = new Date(fecha)
      const horas = fechaNew.getHours();
      const minutos = fechaNew.getMinutes();
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
        <div className='flex items-center mx-4 pt-3'>
          <Link 
          href={"/space/1"}
          className='fa-solid fa-angle-left text-gray-900 text-2xl'
          >
          </Link>

          <p className='text-2xl flex-1 text-center font-bold'>{spaceName} </p>
        </div>

        <div className='grid grid-cols-2 mt-4'>
          <div className='w-full'>
            <Image 
            className=' object-center object-cover rounded-md'
            src='/samples/lateral.jpg'
            width={400}
            height={400}
            alt='Imagen de fondo'
            />
          </div>

          <div className='px-3 text-center'>
            <div className='bg-blue-700 rounded-xl p-3'>
              <p className='text-center text-gray-100'>Horario</p>
              <p className='text-gray-50 font-bold'> {formatearHora(init_date)} - {formatearHora(end_date)} </p>
            </div>

            <div className='rounded-xl p-3 ring-1 ring-blue-800 mt-6'>
              <p className='text-center'>Ocupación</p>
              <p className='text-center text-blue-800 font-bold text-2xl'>{actualQuota} / {Quota}</p>
            </div>

            <div className='rounded-xl p-3 shadow mt-3'>

              <p className='text-center text-gray-700'>Maestro</p>

              <p className='text-center text-xl'> {teacher} </p>

            </div>
          </div>
        </div>

        <div className='w-full grid place-items-center mt-5'>
          <button
            type='button'
            className='bg-blue-800 rounded-2xl px-5 py-2 font-bold text-gray-50 text-2xl'
            onClick={handleSubmit}
          >
            Reservar
          </button>
        </div>
    </div>
  )
}
