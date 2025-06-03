"use client";

import { useState, useMemo, useCallback } from "react";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import PageHeader from "@/components/shared/PageHeader";
import Spinner from "@/components/shared/Spinner";
import MaterialCard from "@/components/pages/materiales/MaterialCard";
import LoanRequestModal from "@/components/pages/materiales/LoanRequestModal";
import MaterialRulesModal from "@/components/pages/materiales/MaterialRulesModal";
import { MaterialInt } from "@/styles/ModelTypes";
import { useDebounce } from "@/hooks/useDebounce";

export default function MaterialesPage() {
  const { data: materials, isLoading, error } = useSWR<MaterialInt[]>(
    "/material/available",
    fetcher
  );

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInt | null>(null);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [selectedMaterialForRules, setSelectedMaterialForRules] = useState<MaterialInt | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Debounce search term to optimize performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Pagination configuration
  const itemsPerPage = 12;

  // Filter materials based on search term
  const filteredMaterials = useMemo(() => {
    if (!materials) return [];
    if (!debouncedSearchTerm.trim()) return materials;

    return materials.filter(material =>
      material.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [materials, debouncedSearchTerm]);

  // Pagination calculations
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.max(1, Math.ceil(filteredMaterials.length / itemsPerPage));
  const currentItems = filteredMaterials.slice(offset, offset + itemsPerPage);

  // Reset to first page when search changes
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  }, []);

  // Pagination handlers
  const handleClickNext = () => {
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRequestLoan = (material: MaterialInt) => {
    setSelectedMaterial(material);
    setRequestModalOpen(true);
  };

  const handleShowRules = (material: MaterialInt) => {
    setSelectedMaterialForRules(material);
    setRulesModalOpen(true);
  };

  return (
    <div>
      <PageHeader
        image="/samples/fondo.jpeg"
        title="Materiales Disponibles"
      />

      <div className="py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar materiales..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <p className="text-red-600 font-semibold mb-4">Error al cargar los materiales</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <>
            {currentItems && currentItems.length > 0 ? (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full border shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th className="p-3 text-left">Imagen</th>
                        <th className="p-3 text-left">Nombre</th>
                        <th className="p-3 text-left">Cantidad</th>
                        <th className="p-3 text-left">Días de préstamo</th>
                        <th className="p-3 text-left">Costo de reposición</th>
                        <th className="p-3 text-left">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((material) => (
                        <tr key={material.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            {material.image ? (
                              <img
                                src={material.image}
                                alt={material.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="p-2">{material.name}</td>
                          <td className="p-2">{material.quantity}</td>
                          <td className="p-2">{material.leadTimeDays}</td>
                          <td className="p-2">${material.replacementCost.toFixed(2)}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleRequestLoan(material)}
                                className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Solicitar
                              </button>
                              {material.rules && (
                                <button
                                  onClick={() => handleShowRules(material)}
                                  className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded"
                                  title="Ver reglas del material"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {currentItems.map((material) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      onRequestLoan={() => handleRequestLoan(material)}
                      onShowRules={() => handleShowRules(material)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {filteredMaterials.length > itemsPerPage && (
                  <div className="flex flex-wrap justify-center mt-6 mb-6 gap-2">
                    <button
                      onClick={() => setCurrentPage(0)}
                      disabled={currentPage === 0}
                      className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-blue-50 disabled:opacity-50 text-gray-600"
                      aria-label="Primera página"
                    >
                      <i className="fa-solid fa-angles-left"></i>
                    </button>
                    <button
                      onClick={handleClickPrev}
                      disabled={currentPage === 0}
                      className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-blue-50 disabled:opacity-50 text-gray-600"
                      aria-label="Página anterior"
                    >
                      <i className="fa-solid fa-angle-left"></i>
                    </button>

                    {/* Mobile pagination - just show current page */}
                    <div className="md:hidden flex items-center">
                      <span className="mx-2 text-sm">
                        Página {currentPage + 1} de {pageCount}
                      </span>
                    </div>

                    {/* Desktop pagination - show page numbers */}
                    <div className="hidden md:flex gap-2">
                      {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                        // Show pages around current page
                        let pageToShow = currentPage - 2 + i;
                        if (currentPage < 2) pageToShow = i;
                        if (currentPage > pageCount - 3) pageToShow = pageCount - 5 + i;
                        if (pageToShow >= 0 && pageToShow < pageCount) {
                          return (
                            <button
                              key={pageToShow}
                              onClick={() => setCurrentPage(pageToShow)}
                              className={`w-12 h-12 flex items-center justify-center rounded-md text-lg font-medium ${
                                currentPage === pageToShow
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-50 text-gray-800"
                              }`}
                              aria-label={`Página ${pageToShow + 1}`}
                              aria-current={
                                currentPage === pageToShow ? "page" : undefined
                              }
                            >
                              {pageToShow + 1}
                            </button>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={handleClickNext}
                      disabled={currentPage >= pageCount - 1}
                      className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-blue-50 disabled:opacity-50 text-gray-600"
                      aria-label="Página siguiente"
                    >
                      <i className="fa-solid fa-angle-right"></i>
                    </button>
                    <button
                      onClick={() => setCurrentPage(pageCount - 1)}
                      disabled={currentPage >= pageCount - 1}
                      className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-blue-50 disabled:opacity-50 text-gray-600"
                      aria-label="Última página"
                    >
                      <i className="fa-solid fa-angles-right"></i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {searchTerm ? "No se encontraron materiales" : "No hay materiales disponibles"}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? `No hay materiales que coincidan con "${searchTerm}"`
                      : "No hay materiales disponibles en este momento"
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => handleSearchChange("")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
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

      <MaterialRulesModal
        material={selectedMaterialForRules}
        isOpen={rulesModalOpen}
        onClose={() => setRulesModalOpen(false)}
      />
    </div>
  );
}
