"use client";

import Space from "@/components/pages/index/Space";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { SpaceInt } from "@/styles/ModelTypes";


import { handleError } from "@/utils/errorHandler";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";

import Spinner from "@/components/shared/Spinner";



export default  function Index() {

  const { data } = useSWR<SpaceInt[]>(`/user/getSpaces`, fetcher);
  const { auth } = useSelector((state: RootState) => state.auth);

  return (
    <div className="">
      <PageHeader title={`Wellness Center`} image={"/images/borregos.jpg"} />

      <div className="mt-5 ">
        <p className="text-blue-800 text-2xl font-bold ml-8 ">Servicios</p>

        <div className="grid place-items-center gap-4 mt-6 mx-auto w-2/3">
          
          {data ? (
              data.map((space) => <Space name={space.name} id = {space.id} img = "/samples/fondo.jpeg" />)
            ) : (
              <Spinner />
            )}

        </div>

      </div>
    </div>
  );
}