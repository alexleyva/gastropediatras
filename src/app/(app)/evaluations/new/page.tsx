import { EvaluationForm } from "@/components/evaluations/evaluation-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEvaluationPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Card className="w-full mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">New Patient Evaluation</CardTitle>
          <CardDescription>
            Complete the form below to record a new pediatric gastroenterology evaluation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EvaluationForm />
        </CardContent>
      </Card>
    </div>
  );
}
