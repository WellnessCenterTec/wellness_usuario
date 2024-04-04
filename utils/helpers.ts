
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

  export function generarIdUnico() {
    const timestamp = Date.now().toString(36); // Convertir la fecha actual a base 36
    const aleatorio = Math.random().toString(36).slice(2, 8); // Generar un número aleatorio en base 36 y tomar solo los primeros 6 caracteres
    return `${timestamp}-${aleatorio}`; // Unir ambos valores con un guión para formar el ID único
  }