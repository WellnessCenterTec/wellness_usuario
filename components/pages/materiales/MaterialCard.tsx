import { MaterialInt } from "@/styles/ModelTypes";
import Image from "next/image";

interface MaterialCardProps {
  material: MaterialInt;
  onRequestLoan: () => void;
  onShowRules: () => void;
}

export default function MaterialCard({ material, onRequestLoan, onShowRules }: MaterialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
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
        <h3 className="font-semibold text-lg">{material.name}</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-sm text-gray-600">Cantidad:</p>
          <p className="font-medium">{material.quantity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Matrículas mínimas:</p>
          <p className="font-medium">{material.minMatriculas}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Días de préstamo:</p>
          <p className="font-medium">{material.leadTimeDays}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Costo de reposición:</p>
          <p className="font-medium">${material.replacementCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={onRequestLoan}
          className="flex-1 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Solicitar Préstamo
        </button>
        {material.rules && (
          <button
            onClick={onShowRules}
            className="px-3 py-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            title="Ver reglas del material"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
