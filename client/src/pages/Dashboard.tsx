import React, { useEffect } from "react";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import ChildDashboard from "@/components/dashboard/ChildDashboard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  
  // Fetch current user with error handling
  const { 
    data: currentUser, 
    isLoading, 
    error, 
    isError, 
    refetch 
  } = useQuery<User>({
    queryKey: ['/api/auth/me'],
    retry: 1,
    staleTime: 0, // Ensure fresh data on mount
  });
  
  // Redirect if not authenticated
  useEffect(() => {
    if (isError && error instanceof Error && error.message.includes("401")) {
      // Redirect to login
      navigate('/login');
    }
  }, [isError, error, navigate]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-40 mt-2" />
        </div>
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  // Error state (not 401 errors, those are handled in useEffect)
  if (isError && !(error instanceof Error && error.message.includes("401"))) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          There was a problem loading your dashboard. Please try refreshing the page.
        </AlertDescription>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
            refetch();
          }}
        >
          Try Again
        </Button>
      </Alert>
    );
  }
  
  // User not found or authentication issue
  if (!currentUser) {
    return (
      <div className="space-y-6 p-6 border rounded-lg max-w-md mx-auto mt-8 bg-card">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary neon-text">Welcome</span> to Kingdom Kids!
          </h2>
          <p className="text-muted-foreground mb-6">Your Christian parental control app with scripture learning</p>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You are not currently signed in. Please sign in to access your dashboard.
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-4 mt-6">
            <Button 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/signup')}
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Render appropriate dashboard based on user type (default to child dashboard)
  return (
    <>
      {currentUser.isParent ? (
        <ParentDashboard />
      ) : (
        <ChildDashboard childId={currentUser.id} />
      )}
    </>
  );
};

export default Dashboard;
