
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl shadow-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 flex items-center justify-center">
                <Icon name="KeyRound" className="w-12 h-12 text-primary" />
             </div>
            <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>Enter your email address below and we&apos;ll send you a link to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
             <Link href="/login" className="font-medium text-primary hover:underline">
                Back to Login
              </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
