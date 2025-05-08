
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/icons";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    // Placeholder for actual login logic
    console.log("Login data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // Mock successful login
    if (data.email === "doctor@example.com" && data.password === "password") {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      localStorage.setItem("isAuthenticated", "true"); // Mock auth state
      router.push("/"); // Redirect to dashboard
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
       localStorage.removeItem("isAuthenticated");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Icon name="Mail" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Email" {...field} className="pl-10"/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                   <Icon name="KeyRound" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input type="password" placeholder="Password" {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button variant="link" size="sm" asChild className="p-0 text-sm">
            <Link href="/forgot-password">Forgot your password?</Link>
          </Button>
        </div>
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Logging In..." : "LOG IN"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" asChild className="p-0">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </p>
      </form>
    </Form>
  );
}

