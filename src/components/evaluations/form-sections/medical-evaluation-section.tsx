
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface MedicalEvaluationSectionProps {
  control: Control<EvaluationFormValues>;
}

export function MedicalEvaluationSection({ control }: MedicalEvaluationSectionProps) {
  return (
    <SectionCard title="Medical Evaluation" iconName="Stethoscope" description="Detailed clinical information and patient history.">
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Clinical Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md bg-background/50">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.reasonForConsultation"
              label="Reason for Consultation"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Describe the main reason for the visit..." rows={3} />}
              className="md:col-span-2"
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.currentIllnessDescription"
              label="Description of Current Illness"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Detailed description of the current illness..." rows={4} />}
              className="md:col-span-2"
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.upperDigestiveSymptoms"
              label="Upper Digestive Symptoms"
              renderInput={(field) => <Textarea {...field} placeholder="e.g., Nausea, vomiting, reflux..." rows={2} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.lowerDigestiveSymptoms"
              label="Lower Digestive Symptoms"
              renderInput={(field) => <Textarea {...field} placeholder="e.g., Bloating, abdominal pain, flatulence..." rows={2} />}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Additional Data &amp; Measurements</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.bowelHabits"
              label="Bowel Habits"
              renderInput={(field) => <Textarea {...field} placeholder="e.g., Regularity of bowel movements, consistency..." rows={2} />}
            />
            <div>
              <h5 className="text-md font-medium mb-2 text-foreground">Anthropometric Measurements</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.weight"
                  label="Weight (kg)"
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="e.g., 25.5" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.height"
                  label="Height (cm)"
                  required
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="e.g., 120.0" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.bloodPressure"
                  label="Blood Pressure"
                  renderInput={(field) => <Input {...field} placeholder="e.g., 110/70" />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.temperature"
                  label="Temperature (°C)"
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="e.g., 36.5" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Patient History</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            {(['perinatalHistory', 'nutritionHistory', 'developmentHistory', 'immunizations', 'personalMedicalHistory', 'familyMedicalHistory'] as const).map((historyField) => (
                <FormInputWrapper
                  key={historyField}
                  control={control}
                  name={`medicalEvaluation.${historyField}`}
                  label={historyField.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} // Format label nicely
                  renderInput={(field) => <Textarea {...field} placeholder={`Details about ${historyField.toLowerCase().replace('history', ' history')}...`} rows={3} />}
                />
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Examination &amp; Plan</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.generalObservations"
              label="General Observations"
              renderInput={(field) => <Textarea {...field} placeholder="General observations about the patient..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.systemsReview"
              label="Current Systems Review"
              renderInput={(field) => <Textarea {...field} placeholder="Review of current systems..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.objectiveExamination"
              label="Objective (Physical Examination)"
              renderInput={(field) => <Textarea {...field} placeholder="Describe the physical examination findings..." rows={4} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.paraclinicalTests"
              label="Paraclinical Tests"
              renderInput={(field) => <Textarea {...field} placeholder="Details of any paraclinical tests performed or ordered..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.diagnosticImpressions"
              label="Diagnostic Impressions"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Summarize diagnostic impressions..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.actionPlan"
              label="Action Plan"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Outline the action plan..." rows={4} />}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
