import { AxiosError } from "axios";
import Swal from "sweetalert2";

export interface RequestResponse {
  msg: string;
}

export const handleError = (error: AxiosError<RequestResponse>) => {
  // Si no es un error de axios
  if (!error?.response) {
    const standardError = error as Error;
    Swal.fire({
      icon: "error",
      title: standardError.message
    });
    return
  }

  // Si si lo es

  // Checking error type
  if (error?.code === "ERR_NETWORK") {
    return Swal.fire({
      icon: "error",
      title: "Error de Conexion",
      text: "Hay un error con tu conexión a internet, mejora tu conexión y reintenta",
    });
  }

  if (error?.code === "ERR_CONNECTION_REFUSED") {
    return Swal.fire({
      icon: "error",
      title: "Conexión Rechazada",
      text: "El servidor no está aceptando conexiones en este momento, intenta de nuevo más tarde",
    });
  }

  if (error?.code === "ERR_TIMEOUT") {
    return Swal.fire({
      icon: "error",
      title: "Tiempo de espera agotado",
      text: "La solicitud está tardando demasiado en responder, verifica tu conexión",
    });
  }

  if (error?.code === "ECONNRESET") {
    return Swal.fire({
      icon: "error",
      title: "Conexión Cerrada",
      text: "La conexión con el servidor fue cerrada abruptamente, intenta nuevamente",
    });
  }

  // Verificamos el status HTTP del error
  switch (error?.response?.status ?? error?.status) {
    case 400:
      Swal.fire({
        icon: "error",
        title: "Solicitud incorrecta",
        text:
          error?.response?.data?.msg ??
          "La solicitud no pudo ser procesada, revisa los datos e intenta nuevamente",
      });
      break;

    case 401:
      Swal.fire({
        icon: "error",
        title: "No autorizado",
        text:
          error?.response?.data?.msg ??
          "No tienes autorización para realizar esta operación, inicia sesión nuevamente",
      });
      break;

    case 403:
      Swal.fire({
        icon: "error",
        title: "Prohibido",
        text:
          error?.response?.data?.msg ??
          "No tienes permiso para acceder a este recurso, contacta al administrador del sistema",
      });
      break;

    case 404:
      Swal.fire({
        icon: "error",
        title: "Recurso no encontrado",
        text:
          error?.response?.data?.msg ??
          "No se encontro el recurso, intenta recargar la pagina",
      });
      break;

    case 500:
      Swal.fire({
        icon: "error",
        title: "Error de Servidor",
        text:
          error?.response?.data?.msg ??
          "Ha ocurrido un error de nuestro lado, reportalo lo antes posible",
      });
      break;

    default:
      Swal.fire({
        icon: "error",
        title: "Reporta el siguiente error",
        text: JSON.stringify(error),
      });
  }
};
