import React, { useEffect } from "react";
import { useRouter } from "next/router";


export default function MainLayout({ children, color = "bg-slate-100",footer=true }:any) {


  

  return (
    <>
      {children}
    </>
  );
}
