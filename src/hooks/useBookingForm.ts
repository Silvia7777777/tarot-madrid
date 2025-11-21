import { useState } from "react";
import { toast } from "@/hooks/use-toast";

/**
 * Custom hook for booking form state and validation
 */

export interface BookingFormData {
  name: string;
  email: string;
  sessionType: string;
  selectedDate: Date | null;
  selectedTime: string;
}

export const useBookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    sessionType: "",
    selectedDate: null,
    selectedTime: "",
  });

  const updateFormData = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y email",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.sessionType) {
      toast({
        title: "Selecciona una sesión",
        description: "Elige el tipo de lectura que deseas",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.selectedDate || !formData.selectedTime) {
      toast({
        title: "Fecha requerida",
        description: "Por favor selecciona un sábado y una hora disponible",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      sessionType: "",
      selectedDate: null,
      selectedTime: "",
    });
  };

  return {
    formData,
    updateFormData,
    validateForm,
    resetForm,
  };
};
