import { Modal, ModalProps } from '@/components/UI/Modal'
import React from 'react'
import {QRCodeSVG} from "qrcode.react"
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ReservableInt, ReservaInt } from '@/styles/ModelTypes';
import { formatearFecha, formatearHora } from "@/utils/helpers";

interface QRModalProps extends Omit<ModalProps,"children">{
  reserva: ReservaInt
}

export function QRModal({className,reserva,...props}:QRModalProps) {

  const {auth} = useSelector((state: RootState) => state.auth);

  const qrValue = `${reserva.id}-${auth?.id}`

  
  return (
    <Modal
    {...props}
    className={className}
    >
        <div className='flex flex-col items-center'>

          <p className='text-lg capitalize'>{auth?.name}</p>
          <p className='text-lg'>{auth?.registration}</p>
          <p className='text-xl font-bold my-1'>{(reserva?.reservable?.space?.name ?? "")} </p>
          
          <p className='text-lg font-bold mb-2'>{formatearFecha(new Date(reserva.reservation_date))} {formatearHora(new Date(reserva.reservation_date))}</p>
          <QRCodeSVG value={qrValue}   />
          

        </div>
    </Modal>
  )
}
