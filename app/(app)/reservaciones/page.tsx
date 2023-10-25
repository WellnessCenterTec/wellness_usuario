import Reservation from '@/components/pages/reservaciones/Reservation'
import PageHeader from '@/components/shared/PageHeader'
import React from 'react'

export default function page() {
  return (
    <div>
        <PageHeader 
            image='/samples/fondo.jpeg'
            title='Mis Reservaciones'
        />

        <div className='mt-6 mx-4 space-y-3'>
            <Reservation 
                image='/samples/fondo.jpeg'
                date='Mie 18 de julio'
                location='Piso 1, Salon 102'
                time='8am'
                title='Crossfit'
            />
            <Reservation 
                image='/samples/fondo.jpeg'
                date='Mie 18 de julio'
                location='Piso 1, Salon 102'
                time='8am'
                title='Crossfit'
            />
            <Reservation 
                image='/samples/fondo.jpeg'
                date='Mie 18 de julio'
                location='Piso 1, Salon 102'
                time='8am'
                title='Crossfit'
            />
        </div>
    </div>
  )
}
