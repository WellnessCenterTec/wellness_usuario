
function agregarCeroDelante(valor: number) {
    return valor < 10 ? `0${valor}` : valor;
}

export function formatearHora(fecha: Date | null) {
    if (fecha != null) {
      const fechaNew = new Date(fecha);
      const horas = fechaNew.getHours();
      const minutos = fechaNew.getMinutes();
      const segundos = fechaNew.getSeconds();
      const horaFormateada = `${agregarCeroDelante(horas)}:${agregarCeroDelante(
        minutos
      )}`;

      return horaFormateada;
    } else {
      return "Fecha inválida";
    }
}

export function formatearFecha(fecha: Date | null) {
    const opcionesPorDefecto: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    if (fecha != null) {
      const fechaNew = new Date(fecha);
      return fechaNew.toLocaleDateString("es-ES", opcionesPorDefecto);
    } else {
      return "Fecha inválida";
    }
  }