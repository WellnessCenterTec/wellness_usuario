"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import PageHeader from "@/components/shared/PageHeader";
import Spinner from "@/components/shared/Spinner";
import MaterialCard from "@/components/pages/materiales/MaterialCard";
import LoanRequestModal from "@/components/pages/materiales/LoanRequestModal";
import { MaterialInt } from "@/styles/ModelTypes";

export default function MaterialesPage() {
  const { data: materials, isLoading, error } = useSWR<MaterialInt[]>(
    "/material/available",
    fetcher
  );

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInt | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const handleRequestLoan = (material: MaterialInt) => {
    setSelectedMaterial(material);
    setRequestModalOpen(true);
  };

  return (
    <div>
      <PageHeader 
        image="/samples/fondo.jpeg" 
        title="Materiales Disponibles" 
      />

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 font-semibold">Error al cargar los materiales</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Materiales disponibles para préstamo
            </h2>
            
            {materials && materials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {materials.map((material) => (
                  <MaterialCard 
                    key={material.id}
                    material={material}
                    onRequestLoan={() => handleRequestLoan(material)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay materiales disponibles en este momento</p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedMaterial && (
        <LoanRequestModal
          material={selectedMaterial}
          isOpen={requestModalOpen}
          onClose={() => setRequestModalOpen(false)}
        />
      )}
    </div>
  );
}
