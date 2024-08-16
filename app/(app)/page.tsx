"use client";

import Space from "@/components/pages/index/Space";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SpaceInt } from "@/styles/ModelTypes";


import Spinner from "@/components/shared/Spinner";
import { ProyectionGraphData } from "@/styles/AppTypes";
import CircleGraph from "@/components/data/CircleGraph";
import ProyectionGraph from "@/components/data/ProyectionGraph";



export default  function Index() {

  const {data:hourStatus} = useSWR<ProyectionGraphData[]>("/space/wellnessAttendances",fetcher)

  const { data } = useSWR<SpaceInt[]>(`/user/getSpaces`, fetcher);
  const { auth } = useSelector((state: RootState) => state.auth);

  return (
    <div className="">
      <PageHeader title={`Wellness Center`} image={"/images/borregos.jpg"} />

      <div>
      
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