
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface ParentalDataSectionProps {
  control: Control<EvaluationFormValues>;
}

function ParentSubSection({ control, parentType }: { control: Control<EvaluationFormValues>; parentType: "motherData" | "fatherData" }) {
  const title = parentType === "motherData" ? "Mother's Details" : "Father's Details";
  return (
    <div className="space-y-4 p-4 border rounded-md bg-background/50">
       <h4 className="text-lg font-medium text-foreground">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputWrapper
          control={control}
          name={`${parentType}.fullName`}
          label="Full Name"
          required
          renderInput={(field) => <Input {...field} placeholder="e.g., Jane Doe" />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.age`}
          label="Age"
          renderInput={(field) => <Input type="number" {...field} placeholder="e.g., 35" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.address`}
          label="Address"
          renderInput={(field) => <Input {...field} placeholder="e.g., 123 Main St, Anytown" />}
          className="md:col-span-2"
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.phone`}
          label="Phone Number"
          renderInput={(field) => <Input type="tel" {...field} placeholder="e.g., (555) 123-4567" />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.occupation`}
          label="Occupation"
          renderInput={(field) => <Input {...field} placeholder="e.g., Teacher" />}
        />
      </div>
    </div>
  );
}


export function ParentalDataSection({ control }: ParentalDataSectionProps) {
  return (
    <SectionCard title="Parental Data" iconName="Users2" description="Collect information about the patient's parents or guardians.">
      <div className="space-y-8">
        <ParentSubSection control={control} parentType="motherData" />
        <ParentSubSection control={control} parentType="fatherData" />
      </div>
    </SectionCard>
  );
}
