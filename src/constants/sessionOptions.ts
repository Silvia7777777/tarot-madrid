import { Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Session Options Configuration
 * Available session types for booking
 */

export interface SessionOption {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: LucideIcon;
}

export const SESSION_OPTIONS: SessionOption[] = [
  {
    id: "30-min",
    title: "30 Minutos",
    description: "Lectura enfocada",
    price: "40€",
    icon: Clock,
  },
  {
    id: "50-min",
    title: "50 Minutos",
    description: "Lectura profunda",
    price: "50€",
    icon: Clock,
  },
];
