
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface AppointmentSectionProps {
  control: Control<EvaluationFormValues>;
}

export function AppointmentSection({ control }: AppointmentSectionProps) {
  return (
    <SectionCard title="Appointment & File Information" iconName="CalendarDays" description="Enter details about the appointment and patient file.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormInputWrapper
          control={control}
          name="appointmentDetails.appointmentDate"
          label="Appointment Date"
          required
          renderInput={(field) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.appointmentTime"
          label="Appointment Time"
          required
          renderInput={(field) => (
            <div className="relative">
               <Input type="time" {...field} className="pr-10" />
               <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          )}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.fileNumber"
          label="File Number"
          required
          renderInput={(field) => <Input {...field} placeholder="e.g., PN-00123" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.insuranceName"
          label="Insurance Name"
          renderInput={(field) => <Input {...field} placeholder="e.g., HealthGuard Plus" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.pediatricianName"
          label="Pediatrician's Name"
          renderInput={(field) => <Input {...field} placeholder="e.g., Dr. Emily Carter" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.referringPerson"
          label="Referring Person"
          renderInput={(field) => <Input {...field} placeholder="e.g., Dr. John Smith or Self-referred" />}
        />
      </div>
    </SectionCard>
  );
}
