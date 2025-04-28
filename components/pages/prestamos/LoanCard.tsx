import { LoanInt, LoanStatus } from "@/styles/ModelTypes";
import { formatDate } from "@/utils/dateUtils";

interface LoanCardProps {
  loan: LoanInt;
}

export default function LoanCard({ loan }: LoanCardProps) {
  // Función para formatear la fecha
  const formatDateString = (dateString: Date | string | undefined) => {
    if (!dateString) return "Sin fecha";
    return formatDate(new Date(dateString));
  };
  
  // Función para obtener el color del badge según el estado
  const getStatusBadgeClass = (status: LoanStatus) => {
    switch (status) {
      case LoanStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case LoanStatus.AWAITING_PICKUP:
        return "bg-blue-100 text-blue-800";
      case LoanStatus.ON_LOAN:
        return "bg-green-100 text-green-800";
      case LoanStatus.LATE:
        return "bg-red-100 text-red-800";
      case LoanStatus.LOST:
        return "bg-gray-100 text-gray-800";
      case LoanStatus.RETURNED:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Función para obtener el texto del estado en español
  const getStatusText = (status: LoanStatus) => {
    switch (status) {
      case LoanStatus.PENDING:
        return "Pendiente de aprobación";
      case LoanStatus.AWAITING_PICKUP:
        return "Listo para recoger";
      case LoanStatus.ON_LOAN:
        return "En préstamo";
      case LoanStatus.LATE:
        return "Atrasado";
      case LoanStatus.LOST:
        return "Perdido";
      case LoanStatus.RETURNED:
        return "Devuelto";
      default:
        return status;
    }
  };
  
  // Función para obtener el mensaje de instrucción según el estado
  const getInstructionMessage = (loan: LoanInt) => {
    switch (loan.status) {
      case LoanStatus.PENDING:
        return "Tu solicitud está siendo revisada. Te notificaremos cuando sea aprobada.";
      case LoanStatus.AWAITING_PICKUP:
        return `Puedes recoger el material el ${formatDateString(loan.pickupDate)} en el horario ${loan.pickupTime}.`;
      case LoanStatus.ON_LOAN:
        return `Debes devolver el material antes del ${formatDateString(loan.returnDate)} en el horario ${loan.returnTime}.`;
      case LoanStatus.LATE:
        return "El material no fue devuelto a tiempo. Por favor devuélvelo lo antes posible para evitar sanciones adicionales.";
      case LoanStatus.LOST:
        return "Este material ha sido marcado como perdido. Por favor contacta al administrador.";
      case LoanStatus.RETURNED:
        return `Material devuelto el ${formatDateString(loan.actualReturnDate)}.`;
      default:
        return "";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <img
              src={loan.material?.image}
              alt={loan.material?.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h3 className="font-semibold text-lg">{loan.material?.name}</h3>
              <p className="text-sm text-gray-600">Cantidad: {loan.quantity}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(loan.status)}`}>
              {getStatusText(loan.status)}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              Solicitud: {formatDateString(loan.createdAt)}
            </span>
          </div>
        </div>
        
        <div className="border-t pt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Recolección:</span> {formatDateString(loan.pickupDate)} ({loan.pickupTime})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Devolución:</span> {formatDateString(loan.returnDate)} ({loan.returnTime})
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 mt-2">
            <p>{getInstructionMessage(loan)}</p>
          </div>
          
          {loan.penaltyApplied && (
            <div className="bg-red-50 p-3 rounded text-sm text-red-800 mt-2">
              <p className="font-medium">Penalización aplicada</p>
              {loan.penaltyNotes && <p>{loan.penaltyNotes}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
