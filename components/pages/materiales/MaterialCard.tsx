import { MaterialInt } from "@/styles/ModelTypes";
import Image from "next/image";

interface MaterialCardProps {
  material: MaterialInt;
  onRequestLoan: () => void;
}

export default function MaterialCard({ material, onRequestLoan }: MaterialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {material.image ? (
          <img
            src={material.image}
            alt={material.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Sin imagen</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{material.name}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Disponibles:</span>
            <span className="font-medium">{material.quantity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Matrículas mínimas:</span>
            <span className="font-medium">{material.minMatriculas}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Días de préstamo:</span>
            <span className="font-medium">{material.leadTimeDays}</span>
          </div>
        </div>
        
        {material.rules && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Reglas:</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{material.rules}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Costo de reposición: ${material.replacementCost.toFixed(2)}
          </span>
          
          <button
            onClick={onRequestLoan}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Solicitar
          </button>
        </div>
      </div>
    </div>
  );
}
