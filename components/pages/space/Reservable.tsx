"use client";

import { setActualQuota, setEnd_date, setHour, setInit_date, setQuota, setSpaceId, setSpaceName, setTeacher, setTeacherId, setidReservable } from "@/redux/slices/indexSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useDispatch } from "react-redux";

interface Props {
  reservableInt: number;
  hour: string;
  teacher: string;
  teacherId: number;
  image: string;
  available: boolean;
  spaceId: number
  SpaceName: string
  actualQuota: number
  quota: number
  init_date: Date
  end_date: Date
}

export default function Reservable({ reservableInt, hour, teacher,teacherId, image, available, spaceId, SpaceName, actualQuota, quota, init_date, end_date}: Props) {
  const dispatch = useDispatch();

  const handleSelectedReservable = () => {
    dispatch(setidReservable(reservableInt))
    dispatch(setHour(hour)) 
    dispatch(setTeacher(teacher))   
    dispatch(setTeacherId(teacherId))
    dispatch(setSpaceId(spaceId))
    dispatch(setSpaceName(SpaceName))
    dispatch(setActualQuota(actualQuota))
    dispatch(setQuota(quota))
    dispatch(setInit_date(init_date))
    dispatch(setEnd_date(end_date))
  }

  return (
    <Link 
    href={`/space/reserve/${spaceId}`}
    onClick ={() => handleSelectedReservable()}
    className="w-full bg-white flex items-center rounded-xl p-5">
      <div className="bg-gray-200 p-2 rounded-full grid place-items-center">
        <Image
          src={image}
          width={50}
          height={50}
          className="rounded-full"
          alt="Avatar"
        />
      </div>

      <div className=" ml-7">
        <p className="text-gray-900 font-bold text-lg">{hour}</p>

        <p className="text-gray-600">Coach {teacher}</p>
      </div>
    </Link>
  );
}
