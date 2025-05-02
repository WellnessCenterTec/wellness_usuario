/**
 * Formatea una fecha en formato DD/MM/YYYY
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  /**
   * Formatea una hora en formato HH:MM
   */
  export function formatTime(date: Date): string {
    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
  
  /**
   * Formatea una fecha y hora en formato DD/MM/YYYY HH:MM
   */
  export function formatDateTime(date: Date): string {
    return `${formatDate(date)} ${formatTime(date)}`;
  }
  
  /**
   * Obtiene la fecha actual en formato ISO para inputs de tipo date
   */
  export function getCurrentDateForInput(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  /**
   * Obtiene una fecha futura sumando días a la fecha actual
   */
  export function getFutureDateForInput(daysToAdd: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }
  
  /**
   * Verifica si una fecha ya pasó
   */
  export function isDatePast(date: Date): boolean {
    const now = new Date();
    return date < now;
  }
  
  /**
   * Calcula la diferencia en días entre dos fechas
   */
  export function daysBetweenDates(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  