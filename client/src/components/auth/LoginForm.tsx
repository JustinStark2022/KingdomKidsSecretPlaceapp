import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Logo from "@/components/ui/logo"; // updated path

// 🧠 Define the login schema locally
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await apiRequest("POST", "/api/auth/login", data);

      if (response.ok) {
        toast({
          title: "Login successful",
          description: "Welcome back to Kingdom Kids Secret Place",
        });
        setLocation("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
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
          <p className="text-center text-muted-foreground mt-6 mb-2 font-serif italic">
            "Jesus said, 'Let the little children come to me'" - Matthew 19:14
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="username"
                className="pl-10"
                {...register("username")}
              />
            </div>
            {errors.username && (
              <p className="text-destructive text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => setLocation("/signup")}>
              Sign up
            </Button>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Teaching children about Jesus Christ, <br />
          the Way, the Truth, and the Life
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
