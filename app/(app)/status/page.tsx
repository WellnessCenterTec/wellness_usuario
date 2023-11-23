import CircleGraph from '@/components/data/CircleGraph'
import PageHeader from '@/components/shared/PageHeader'
import React from 'react'

// Pagina donde se puede ver el estado de llenado del wellness en tiempo real

export default function Status() {
  return (
    <div>
      <PageHeader image="/samples/fondo.jpeg" title="Estado del gimnasio" />
      <p className='text-center font-bold text-2xl my-8'>Afluencia del Gimnasio en tiempo real</p>
      <div>
        <CircleGraph />
      </div>
    </div>
  )
}
