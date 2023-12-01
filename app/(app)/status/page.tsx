import CircleGraph from '@/components/data/CircleGraph'
import ProyectionGraph from '@/components/data/ProyectionGraph'
import PageHeader from '@/components/shared/PageHeader'
import { fetcher } from '@/config/fetcher'
import { ProyectionGraphData } from '@/styles/AppTypes'
import React, { use } from 'react'
import useSWR from 'swr'

// Pagina donde se puede ver el estado de llenado del wellness en tiempo real

export default function Status() {

  const {data:hourStatus} = useSWR<ProyectionGraphData[]>("/space/wellnessAttendances",fetcher)

  return (
    <div>
      <PageHeader image="/samples/fondo.jpeg" title="Estado del gimnasio" />
      <p className='text-center font-bold text-2xl my-8'>Afluencia del Gimnasio en tiempo real</p>
      <div>
        <CircleGraph />
      </div>
      <p className='text-center font-bold text-2xl my-8'>Afluencia del Gimnasio por hora</p>
      <div className=' mx-auto'>
        {hourStatus && (

        <ProyectionGraph
          data={hourStatus}
        />
        )}
      </div>

    </div>
  )
}
