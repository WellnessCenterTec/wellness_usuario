"use client";

import Space from "@/components/pages/index/Space";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CarouselImageInt, SpaceInt } from "@/styles/ModelTypes";


import Spinner from "@/components/shared/Spinner";
import { ProyectionGraphData } from "@/styles/AppTypes";
import CircleGraph from "@/components/data/CircleGraph";
import ProyectionGraph from "@/components/data/ProyectionGraph";
import Image from "next/image";



export default  function Index() {

  const {data:hourStatus} = useSWR<ProyectionGraphData[]>("/space/wellnessAttendances",fetcher)
  const { data: announces=[], mutate } = useSWR<CarouselImageInt[]>(
    "/admin/carouselImages",
    fetcher
  );
  const { data } = useSWR<SpaceInt[]>(`/user/getSpaces`, fetcher);
  const { auth } = useSelector((state: RootState) => state.auth);
  const { data: liveStatus } = useSWR("/space/liveStatus", fetcher);


  return (
    <div className="">
      <Carousel showArrows={true} stopOnHover={true} 
            autoPlay={true} infiniteLoop = {true} 
            interval = {5000} 
            showThumbs = {true} 
            showStatus = {false} 
            useKeyboardArrows = {true}>

            {announces.map((element) => (
              <div className="relative w-full  overflow-hidden">
              <Image src = {element.url} className="object-cover w-full h-full" alt="" width={300} height={200} />
              </div>

                
            ))}

            </Carousel>

      <div className="">
        <div>
       
        <p className='text-center font-bold text-2xl my-8'>Afluencia del Gimnasio por hora</p>
        <div className=' mx-auto'>
          {hourStatus && (

          <ProyectionGraph
            data={hourStatus}
          />
          )}
        </div>


      </div>


    </div>

      <div className="mt-5 ">
        <p className="text-blue-800 text-2xl font-bold ml-8 ">Servicios</p>

        <div className="grid place-items-center gap-4 mt-6 mx-auto w-2/3">
          
          {data ? (
              data.map((space) => <Space name={space.name} id = {space.id} img ={space.image} />)
            ) : (
              <Spinner />
            )}

        </div>

      </div>
    </div>
  );
}