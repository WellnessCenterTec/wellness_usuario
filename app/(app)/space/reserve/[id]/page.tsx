import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Reserve() {
  return (
    <div>
        <div className='flex items-center mx-4 pt-3'>
          <Link 
          href={"/space/1"}
          className='fa-solid fa-angle-left text-gray-900 text-2xl'
          >
          </Link>

          <p className='text-2xl flex-1 text-center font-bold'>Crossfit</p>
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

          <div className='px-3'>
            <div className='bg-blue-700 rounded-xl p-3'>
              <p className='text-center text-gray-100'>Horario</p>
              <p className='text-gray-50 font-bold'>8:00 AM - 9:30 AM</p>
            </div>

            <div className='rounded-xl p-3 ring-1 ring-blue-800 mt-6'>
              <p className='text-center'>Cupos</p>

              <p className='text-center text-blue-800 font-bold text-2xl'>30 / 40</p>
            </div>

            <div className='rounded-xl p-3 shadow mt-3'>

              <p className='text-center text-gray-700'>Maestro</p>

              <p className='text-center text-xl'>Pedro Martinez</p>

            </div>
          </div>
        </div>

        <div className='w-full grid place-items-center mt-5'>
          <button
            type='button'
            className='bg-blue-800 rounded-2xl px-5 py-2 font-bold text-gray-50 text-2xl'
          >
            Reservar
          </button>
        </div>
    </div>
  )
}
