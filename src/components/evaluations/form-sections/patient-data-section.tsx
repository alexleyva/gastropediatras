
"use client";

import type { Control, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, differenceInYears } from "date-fns";
import { CalendarDays } from "lucide-react";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";
import React from "react";


interface PatientDataSectionProps {
  control: Control<EvaluationFormValues>;
  setValue: UseFormSetValue<EvaluationFormValues>;
}

export function PatientDataSection({ control, setValue }: PatientDataSectionProps) {

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setValue("patientData.dateOfBirth", date, { shouldValidate: true });
    if (date) {
      const age = differenceInYears(new Date(), date);
      setValue("patientData.age", age, { shouldValidate: true });
    } else {
      setValue("patientData.age", undefined);
    }
  };


  return (
    <SectionCard title="Patient Data" iconName="User" description="Record the patient's personal information.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputWrapper
          control={control}
          name="patientData.fullName"
          label="Full Name"
          required
          renderInput={(field) => <Input {...field} placeholder="e.g., Alex Johnson" />}
        />
        <FormInputWrapper
          control={control}
          name="patientData.identificationNumber"
          label="Identification Number"
          required
          renderInput={(field) => <Input {...field} placeholder="e.g., ID123456789" />}
        />
        <FormInputWrapper
          control={control}
          name="patientData.dateOfBirth"
          label="Date of Birth"
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
                  onSelect={(date) => {
                    field.onChange(date); // Ensure RHF's onChange is called
                    handleDateOfBirthChange(date);
                  }}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FormInputWrapper
          control={control}
          name="patientData.age"
          label="Age (Years)"
          renderInput={(field) => (
            <Input 
              {...field} 
              type="number" 
              placeholder="Calculated automatically" 
              readOnly 
              value={field.value === undefined ? "" : field.value}
              className="bg-muted/50"
            />
          )}
        />
      </div>
    </SectionCard>
  );
}
