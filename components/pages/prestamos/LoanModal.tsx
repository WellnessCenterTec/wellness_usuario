"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/UI/Modal";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import Swal from "sweetalert2";
import { mutate } from "swr";
import useSWR from "swr";
import { fetcher } from "@/config/fetcher";
import { MaterialInt } from "@/styles/ModelTypes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Helper functions for date formatting
const getCurrentDateForInput = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

const getFutureDateForInput = (daysToAdd: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
};

interface LoanModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoanModal({ active, setActive }: LoanModalProps) {
  const { auth } = useSelector((state: RootState) => state.auth);
  const { data: materials } = useSWR<MaterialInt[]>("/material/available", fetcher);

  // Form state
  const [materialId, setMaterialId] = useState("");
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pickupDate, setPickupDate] = useState(getCurrentDateForInput());
  const [returnDate, setReturnDate] = useState(getFutureDateForInput(7));
  const [pickupTime, setPickupTime] = useState("7:00–9:00");
  const [returnTime, setReturnTime] = useState("7:00–9:00");
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInt | null>(null);

  // Add current user's registration to student IDs when component mounts
  useEffect(() => {
    if (auth && auth.registration && !studentIds.includes(auth.registration)) {
      setStudentIds([auth.registration]);
    }
  }, [auth]);

  // Update return date when material changes
  useEffect(() => {
    if (selectedMaterial) {
      setReturnDate(getFutureDateForInput(selectedMaterial.leadTimeDays));
    }
  }, [selectedMaterial]);

  // Update selected material when material ID changes
  useEffect(() => {
    if (materialId && materials) {
      const material = materials.find(m => m.id.toString() === materialId);
      setSelectedMaterial(material || null);
    } else {
      setSelectedMaterial(null);
    }
  }, [materialId, materials]);

  const handleAddStudentId = () => {
    if (studentIdInput.trim() && !studentIds.includes(studentIdInput.trim())) {
      setStudentIds([...studentIds, studentIdInput.trim()]);
      setStudentIdInput("");
    }
  };

  const handleRemoveStudentId = (id: string) => {
    // Don't allow removing the current user's ID
    if (auth && id === auth.registration) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes eliminar tu propia matrícula",
      });
      return;
    }
    setStudentIds(studentIds.filter(studentId => studentId !== id));
  };

  const validateStudentIds = async () => {
    try {
      const config = axiosConfig();
      if (!config) throw new Error("Sesión expirada, por favor inicia sesión.");

      const { data } = await clienteAxios.post("/loan/validateStudentIds", {
        studentIds
      }, config);

      if (!data.valid) {
        Swal.fire({
          icon: "warning",
          title: "Matrículas inválidas",
          html: `
            <p>Las siguientes matrículas no son válidas:</p>
            <ul class="mt-2 text-left">
              ${data.invalidStudents.map((id: string) => `<li>- ${id}</li>`).join("")}
            </ul>
          `,
        });
        return false;
      }
      return true;
    } catch (error: any) {
      console.error("Error al validar matrículas:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "No se pudieron validar las matrículas",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para solicitar un préstamo",
      });
      return;
    }

    // Validar que haya al menos una matrícula
    if (studentIds.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debe agregar al menos una matrícula",
      });
      return;
    }

    // Validar que la cantidad sea mayor a 0
    if (quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La cantidad debe ser mayor a 0",
      });
      return;
    }

    // Validar que la fecha de devolución sea posterior a la de recolección
    if (new Date(returnDate) <= new Date(pickupDate)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La fecha de devolución debe ser posterior a la fecha de recolección",
      });
      return;
    }

    // Validar que haya suficientes matrículas
    if (selectedMaterial && studentIds.length < selectedMaterial.minMatriculas) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Se requieren al menos ${selectedMaterial.minMatriculas} matrículas para este material`,
      });
      return;
    }

    // Validar que las matrículas existan
    const idsValid = await validateStudentIds();
    if (!idsValid) return;

    try {
      const config = axiosConfig();
      if (!config) throw new Error("Sesión expirada, por favor inicia sesión.");

      const payload = {
        materialId,
        responsibleId: auth.registration,
        studentIds,
        quantity,
        pickupDate,
        returnDate,
        pickupTime,
        returnTime,
      };

      const { data } = await clienteAxios.post("/loan/create", payload, config);

      Swal.fire({
        icon: "success",
        title: data.msg || "Préstamo solicitado con éxito",
        showConfirmButton: false,
        timer: 1500
      });

      mutate(`/loan/myLoans/${auth.registration}`); // Actualiza la lista de préstamos
      setActive(false); // Cierra el modal
      resetForm(); // Limpia los campos
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "No se pudo crear el préstamo",
      });
    }
  };

  const resetForm = () => {
    setMaterialId("");
    setStudentIds(auth ? [auth.registration] : []);
    setStudentIdInput("");
    setQuantity(1);
    setPickupDate(getCurrentDateForInput());
    setReturnDate(getFutureDateForInput(7));
    setPickupTime("7:00–9:00");
    setReturnTime("7:00–9:00");
    setSelectedMaterial(null);
  };

  return (
    <Modal active={active} setActive={setActive}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Solicitar Préstamo</h3>
          <button
            onClick={() => setActive(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Material */}
            <div>
              <label htmlFor="materialId" className="block text-sm font-medium text-gray-700 mb-1">
                Material *
              </label>
              <select
                id="materialId"
                value={materialId}
                onChange={(e) => setMaterialId(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                required
              >
                <option value="">Selecciona un material</option>
                {materials?.filter(m => !m.deleted && m.quantity > 0).map((material) => (
                  <option key={material.id} value={material.id}>
                    {material.name} - Disponibles: {material.quantity}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad *
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={selectedMaterial?.quantity || 1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                required
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Recolección *
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  value={pickupDate}
                  min={getCurrentDateForInput()}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Devolución *
                </label>
                <input
                  type="date"
                  id="returnDate"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Horarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Horario de Recolección *
                </label>
                <select
                  id="pickupTime"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                >
                  <option value="7:00–9:00">7:00–9:00</option>
                  <option value="14:00–16:00">14:00–16:00</option>
                </select>
              </div>
              <div>
                <label htmlFor="returnTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Horario de Devolución *
                </label>
                <select
                  id="returnTime"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                >
                  <option value="7:00–9:00">7:00–9:00</option>
                  <option value="14:00–16:00">14:00–16:00</option>
                </select>
              </div>
            </div>

            {/* Matrículas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Matrículas *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Agregar matrícula"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  className="flex-1 border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddStudentId}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Agregar
                </button>
              </div>
              {selectedMaterial && (
                <p className="text-xs text-gray-500 mt-1">
                  Se requieren al menos {selectedMaterial.minMatriculas} matrículas
                </p>
              )}

              {/* Lista de matrículas */}
              <div className="mt-2">
                <ul className="space-y-1">
                  {studentIds.map((id) => (
                    <li key={id} className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded">
                      <span>{id} {id === auth?.registration ? "(Tú - Responsable)" : ""}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStudentId(id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reglas del material */}
            {selectedMaterial && (
              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium text-blue-800 mb-1">Reglas del material</h4>
                <p className="text-sm text-blue-700">{selectedMaterial.rules}</p>
                <p className="text-sm text-blue-700 mt-1">
                  <strong>Costo de reposición:</strong> ${selectedMaterial.replacementCost.toFixed(2)}
                </p>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setActive(false)}
                className="px-4 py-2 border border-gray-300 rounded shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Solicitar Préstamo
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
