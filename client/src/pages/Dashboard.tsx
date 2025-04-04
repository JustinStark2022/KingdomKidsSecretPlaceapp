import React, { useEffect } from "react";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import ChildDashboard from "@/components/dashboard/ChildDashboard";
import useAuth from "@/hooks/useAuth"; 
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const Dashboard: React.FC = () => {
  const { currentUser, isLoading, isError, fetchUser } = useAuth(); // Include fetchUser in the hook's return values
  const [, navigate] = useLocation();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (isError) {
      navigate('/login'); // Navigate to login if there’s an error fetching user
    }
  }, [isError, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40 mt-2" />
      </div>
    );
  }

  // Error state
  if (isError) {
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
            // Retry fetching user
            fetchUser();
          }}
        >
          Try Again
        </Button>
      </Alert>
    );
  }

  // If user is not authenticated or user data is invalid
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

  // Render appropriate dashboard based on user type
  return (
    <>
      {currentUser.role === "parent" ? (
        <ParentDashboard />
      ) : (
        <ChildDashboard childId={currentUser.id} />
      )}
    </>
  );
};

export default Dashboard;