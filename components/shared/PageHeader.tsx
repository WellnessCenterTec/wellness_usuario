import Image from 'next/image'
import React from 'react'

interface Props{
    title:string
    image:string
}

export default function PageHeader({title,image}:Props) {
  return (
    <div className="flex-col relative h-40 w-full">
        <Image
          className="absolute top-0 left-0 z-10 h-40 w-full object-cover object-center"
          src={image}
          width={500}
          height={500}
          alt={title}
        />

        <div className="bg-[#0E369C] absolute opacity-30 w-full top-0 left-0 z-20 h-40"></div>
        <div className="absolute top-0 left-0 z-30 grid place-items-center w-full h-40">
          <h2 className="text-white text-2xl absolute font-bold">
            {title}
          </h2>
        </div>
      </div>
  )
}
