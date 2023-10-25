import Space from "@/components/pages/index/Space";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

export default function Index() {
  return (
    <div className="">
      <PageHeader title={`Wellness Center`} image={"/images/borregos.jpg"} />

      <div className="mt-5 ">
        <p className="text-blue-800 text-2xl font-bold ml-8 ">Servicios</p>

        <div className="grid place-items-center gap-4 mt-6 mx-auto w-2/3">
          <Space name="Gimnasio" img="/samples/fondo.jpeg" />
          <Space name="Gimnasio" img="/samples/fondo.jpeg" />
          <Space name="Gimnasio" img="/samples/fondo.jpeg" />
        </div>
      </div>
    </div>
  );
}
