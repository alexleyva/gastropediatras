
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
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// SVG components for icons not in lucide-react or for specific styling
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.13-3.13C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.36 12.32c-.26-3.08-2.74-4.98-5.48-5a4.8 4.8 0 00-1.6.29 5.08 5.08 0 00-3.4 2.43c-1.3 2.12-.78 5.2 1.16 6.91.86.79 1.83 1.24 3.09 1.2a4.49 4.49 0 003.1-1.25c.13-.13.24-.27.35-.41a.56.56 0 00.08-.18c.8-1.24.97-2.9.3-4.02zm-4.12 4.19c-.76.76-1.93.91-2.98.4-1.05-.51-1.82-1.4-2.1-2.63s.2-2.55 1.17-3.27c.75-.56 1.87-.63 2.85-.22s1.72 1.31 2.07 2.53c.09.3.15.6.18.91a3.33 3.33 0 01-.19 1.28zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);


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

  const socialLogins = [
    { name: "Google", icon: <GoogleIcon className="h-5 w-5" /> },
    { name: "LinkedIn", icon: <Icon name="Linkedin" /> },
    { name: "GitHub", icon: <Icon name="Github" /> },
    { name: "Facebook", icon: <Icon name="Facebook" /> },
    { name: "Twitter", icon: <Icon name="Twitter" /> },
    { name: "Apple", icon: <AppleIcon className="h-5 w-5" /> },
  ];


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

        <div className="relative my-6">
          <Separator />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
            Or continue with
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {socialLogins.map((social) => (
            <Button key={social.name} variant="outline" type="button" className="w-full" title={`Sign in with ${social.name}`}>
              {social.icon}
              <span className="sr-only">{social.name}</span>
            </Button>
          ))}
        </div>

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
