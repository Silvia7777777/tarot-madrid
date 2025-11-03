import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaturdayTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

const SaturdayTimePicker = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: SaturdayTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Solo permitir sábados
  const disabledDays = [
    { dayOfWeek: [0, 1, 2, 3, 4, 5] }, // Todos excepto sábado (6)
    { before: new Date() }, // No permitir fechas pasadas
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
      // No cerrar el popover automáticamente para que puedan seleccionar la hora
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeChange(time);
    setIsOpen(false); // Cerrar después de seleccionar hora
  };

  return (
    <div className="space-y-2">
      <Label className="text-secondary font-body">
        <CalendarIcon className="inline w-4 h-4 mr-2" />
        Fecha y hora
      </Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-background/50 border-border/50",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate && selectedTime ? (
              <span>
                {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las {selectedTime}
              </span>
            ) : selectedDate ? (
              format(selectedDate, "EEEE d 'de' MMMM", { locale: es })
            ) : (
              "Selecciona un sábado disponible"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            initialFocus
            className="pointer-events-auto"
          />

          {selectedDate && (
            <div className="p-4 border-t border-border/50 bg-card/50">
              <Label className="text-sm font-semibold mb-3 block">
                Horarios disponibles:
              </Label>
              <RadioGroup value={selectedTime} onValueChange={handleTimeSelect}>
                <div className="space-y-2">
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 border-2 rounded-lg transition-all cursor-pointer",
                      selectedTime === "12:00"
                        ? "border-accent bg-accent/10"
                        : "border-border/50 hover:border-accent/50 hover:bg-accent/5"
                    )}
                    onClick={() => handleTimeSelect("12:00")}
                  >
                    <RadioGroupItem value="12:00" id="time-12" />
                    <Label
                      htmlFor="time-12"
                      className="flex-1 cursor-pointer font-body"
                    >
                      🕐 12:00 PM - Mediodía
                    </Label>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-3 p-3 border-2 rounded-lg transition-all cursor-pointer",
                      selectedTime === "16:00"
                        ? "border-accent bg-accent/10"
                        : "border-border/50 hover:border-accent/50 hover:bg-accent/5"
                    )}
                    onClick={() => handleTimeSelect("16:00")}
                  >
                    <RadioGroupItem value="16:00" id="time-16" />
                    <Label
                      htmlFor="time-16"
                      className="flex-1 cursor-pointer font-body"
                    >
                      🕓 16:00 PM - Tarde
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SaturdayTimePicker;
