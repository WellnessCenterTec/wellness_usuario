"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/UI/Modal";
import { MaterialInt } from "@/styles/ModelTypes";
import { axiosConfig } from "@/config/axiosConfig";
import clienteAxios from "@/config/clienteAxios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Swal from "sweetalert2";
import { getCurrentDateForInput, getFutureDateForInput } from "@/utils/dateUtils";

interface LoanRequestModalProps {
  material: MaterialInt;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoanRequestModal({ material, isOpen, onClose }: LoanRequestModalProps) {
  const { auth } = useSelector((state: RootState) => state.auth);
  
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pickupTime, setPickupTime] = useState("7:00–9:00");
  const [pickupDate, setPickupDate] = useState(getCurrentDateForInput());
  const [returnDate, setReturnDate] = useState("");
  
  // Actualizar la fecha de devolución cuando cambia el material
  useEffect(() => {
    if (material) {
      setReturnDate(getFutureDateForInput(material.leadTimeDays));
    }
  }, [material]);
  
  // Agregar la matrícula del usuario actual
  useEffect(() => {
    if (auth?.registration && !studentIds.includes(auth.registration)) {
      setStudentIds([auth.registration]);
    }
  }, [auth]);
  
  const handleAddStudentId = () => {
    if (studentIdInput.trim() && !studentIds.includes(studentIdInput.trim())) {
      setStudentIds([...studentIds, studentIdInput.trim()]);
      setStudentIdInput("");
    }
  };
  
  const handleRemoveStudentId = (id: string) => {
    // No permitir eliminar la matrícula del usuario actual
    if (id === auth?.registration) {
      Swal.fire({
        icon: "warning",
        title: "No permitido",
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
    
    // Validar que haya suficientes matrículas
    if (studentIds.length < material.minMatriculas) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Se requieren al menos ${material.minMatriculas} matrículas para este material`,
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
    
    // Validar que las matrículas existan
    const idsValid = await validateStudentIds();
    if (!idsValid) return;
    
    try {
      const config = axiosConfig();
      if (!config) throw new Error("Sesión expirada, por favor inicia sesión.");
      
      const payload = {
        materialId: material.id,
        responsibleId: auth?.registration,
        studentIds,
        quantity,
        pickupDate,
        returnDate,
        pickupTime,
        returnTime: pickupTime, // Mismo horario para devolución
      };
      
      const { data } = await clienteAxios.post("/loan/create", payload, config);
      
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Tu solicitud de préstamo ha sido enviada correctamente",
        showConfirmButton: false,
        timer: 1500
      });
      
      onClose();
      resetForm();
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "No se pudo crear la solicitud de préstamo",
      });
    }
  };
  
  const resetForm = () => {
    setStudentIds(auth?.registration ? [auth.registration] : []);
    setStudentIdInput("");
    setQuantity(1);
    setPickupTime("7:00–9:00");
    setPickupDate(getCurrentDateForInput());
    if (material) {
      setReturnDate(getFutureDateForInput(material.leadTimeDays));
    }
  };
  
  return (
    <Modal active={isOpen} setActive={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Solicitar préstamo</h2>
        
        <div className="mb-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-start gap-3">
            <img
              src={material.image}
              alt={material.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{material.name}</h3>
              <p className="text-sm text-gray-600">Disponibles: {material.quantity}</p>
              <p className="text-sm text-gray-600">Matrículas mínimas: {material.minMatriculas}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Cantidad */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Cantidad *
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={material.quantity}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                required
              />
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
              <p className="text-xs text-gray-500 mt-1">
                Se requieren al menos {material.minMatriculas} matrículas
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {studentIds.map((id) => (
                  <div key={id} className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1">
                    <span>{id}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveStudentId(id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fecha y horario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de recolección *
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Horario de recolección *
                </label>
                <select
                  id="pickupTime"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300 focus:border-blue-500"
                  required
                >
                  <option value="7:00–9:00">Mañana (7:00–9:00)</option>
                  <option value="14:00–16:00">Tarde (14:00–16:00)</option>
                </select>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="bg-yellow-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-yellow-800">Información importante:</p>
              <ul className="list-disc list-inside text-yellow-700 mt-1 space-y-1">
                <li>La fecha de devolución será el {new Date(returnDate).toLocaleDateString()}</li>
                <li>Debes presentar tu credencial al recoger el material</li>
                <li>El costo de reposición en caso de pérdida es de ${material.replacementCost.toFixed(2)}</li>
                {material.rules && <li>{material.rules}</li>}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between mt-6 border-t pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
