import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Logo from "../ui/logo";
import { Checkbox } from "@/components/ui/checkbox";

// Self-contained insertUserSchema
const insertUserSchema = z.object({
  username: z.string().min(3, "Username is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  displayName: z.string().min(1, "Display name is required"),
  isParent: z.boolean(),
});

// Extended signup schema with password confirmation
const signupSchema = insertUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      isParent: true,
      displayName: ""
    }
  });

  const onSubmit = async (data: SignupData) => {
    try {
      setLoading(true);
      const { confirmPassword, ...userData } = data;

      const response = await apiRequest("POST", "/api/auth/signup", userData);

      if (response.ok) {
        toast({
          title: "Account created",
          description: "Welcome to Kingdom Kids Secret Place",
        });
        setLocation("/login");
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-card shadow-lg">
      <CardContent className="pt-6 px-8 pb-8">
        <div className="flex flex-col items-center mb-6">
          <Logo size="large" />
          <h2 className="text-xl font-semibold mt-2">Create an Account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="username" className="pl-10" {...register("username")} />
            </div>
            {errors.username && <p className="text-destructive text-sm">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" className="pl-10" {...register("email")} />
            </div>
            {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" {...register("displayName")} />
            {errors.displayName && <p className="text-destructive text-sm">{errors.displayName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" className="pl-10" {...register("password")} />
            </div>
            {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" type="password" className="pl-10" {...register("confirmPassword")} />
            </div>
            {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="isParent" {...register("isParent")} defaultChecked />
            <Label htmlFor="isParent" className="text-sm">I am registering as a parent</Label>
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => setLocation("/login")}>
              Sign in
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
