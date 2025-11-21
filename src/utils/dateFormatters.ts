import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Date formatting utilities
 * Centralized date formatting functions
 */

export const formatAppointmentDate = (date: Date, time: string): string => {
  return `${format(date, "EEEE d 'de' MMMM", { locale: es })} a las ${time}`;
};

export const formatDateOnly = (date: Date): string => {
  return format(date, "EEEE d 'de' MMMM", { locale: es });
};

export const formatDateISO = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
