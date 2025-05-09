
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const patientSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  identificationNumber: z.string().min(5, { message: "Identification number must be at least 5 characters." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required."}),
  age: z.number().optional(), // Optional as it can be calculated
});

export const parentSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  age: z.union([z.number().int().positive().optional(), z.string().optional()]).optional(),
  address: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number').or(z.literal('')).optional(),
  occupation: z.string().optional(),
});

export const appointmentSchema = z.object({
  appointmentDate: z.date({ required_error: "Appointment date is required." }),
  appointmentTime: z.string().min(1, {message: "Appointment time is required."}), // Could use a more specific time format validation
  fileNumber: z.string().min(1, { message: "File number is required." }),
  insuranceName: z.string().optional(),
  pediatricianName: z.string().optional(),
  referringPerson: z.string().optional(),
});

export const anthropometricSchema = z.object({
  weight: z.union([z.number().positive("Weight must be positive.").optional(), z.string().optional()]).optional(),
  height: z.union([
    z.number().positive("Height must be positive.").min(1, "Height is required for critical validation."),
    z.string().min(1, "Height is required for critical validation.").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {message: "Height must be a positive number."})
  ]).optional(),
  temperature: z.union([z.number().optional(), z.string().optional()]).optional(), // Celsius
  cardiacFrequency: z.union([z.number().positive("Cardiac frequency must be positive.").optional(), z.string().optional()]).optional(), // Beats per minute
  oxygenSaturation: z.union([z.number().positive("Oxygen saturation must be positive.").min(0).max(100).optional(), z.string().optional()]).optional(), // Percentage
});

export const medicalEvaluationSchema = z.object({
  reasonForConsultation: z.string().min(1, { message: "Reason for consultation is required." }),
  currentIllnessDescription: z.string().min(1, { message: "Current illness description is required." }),
  upperDigestiveSymptoms: z.string().optional(),
  lowerDigestiveSymptoms: z.string().optional(),
  bowelHabits: z.string().optional(),
  anthropometrics: anthropometricSchema,
  generalObservations: z.string().optional(),
  systemsReview: z.string().optional(),
  perinatalHistory: z.string().optional(),
  nutritionHistory: z.string().optional(),
  developmentHistory: z.string().optional(),
  immunizations: z.string().optional(),
  personalMedicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  objectiveExamination: z.string().optional(), // Physical examination
  paraclinicalTests: z.string().optional(),
  diagnosticImpressions: z.string().min(1, { message: "Diagnostic impressions are required." }),
  actionPlan: z.string().min(1, { message: "Action plan is required." }),
});


export const labExamFileSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string(),
  fileUrl: z.string().url(),
  uploadedAt: z.date(),
  category: z.enum(['lab', 'imaging']),
});

export const evaluationSchema = z.object({
  appointmentDetails: appointmentSchema,
  patientData: patientSchema,
  motherData: parentSchema,
  fatherData: parentSchema,
  medicalEvaluation: medicalEvaluationSchema,
  labExams: z.array(labExamFileSchema).optional(),
});

export type EvaluationFormValues = z.infer<typeof evaluationSchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
