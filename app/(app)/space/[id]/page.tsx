"use client"

import React from 'react'
import {Switch} from "@headlessui/react"
import PageHeader from '@/components/shared/PageHeader'
import Reservable from '@/components/pages/space/Reservable'

export default function Space() {
  return (
    <div>

        <PageHeader 
            title='Crossfit'
            image='/samples/fondo.jpeg'
        />
        <div className='ml-3 mt-3 space-y-2'>
            <p className='text-blue-800 font-bold text-lg '>Reservar</p>
            <p>Filtrar por disponiblidad</p>

            <Switch
            checked={true}
            onChange={(e) => {
              
            }}
            className={`switch ${
              true ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Es un dropset</span>
            <span
              className={`${
                true ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>

        <div className='flex items-center gap-6 mt-4 mx-auto w-5/6'>

            <button
                type='button'
                className='bg-blue-800 px-2 py-2 rounded-lg text-gray-50 text-xl'
            >
                Mie, 14
            </button>

            <button
                type='button'
                className='text-gray-600 text-xl'
            >
                15
            </button>
            <button
                type='button'
                className='text-gray-600 text-xl'
            >
                16
            </button>

        </div>

        <div className='w-5/6 h-[1px] bg-gray-800 mt-3 mx-auto'>

        </div>

        <div className='mx-auto w-5/6 mt-3 grid place-items-center gap-4'>

            <Reservable 
                hour='8:00 AM'
                
                teacher='Jose'
                available={true}
                image='/samples/Avatar.png'
            />
            <Reservable 
                hour='10:30:00 AM'
                
                teacher='Jose'
                available={false}
                image='/samples/Avatar.png'
            />
            <Reservable 
                hour='8:00 AM'
                
                teacher='Jose'
                available={true}
                image='/samples/Avatar.png'
            />

        </div>

    </div>
  )
}
