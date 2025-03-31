import React from "react";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import ChildDashboard from "@/components/dashboard/ChildDashboard";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Dashboard: React.FC = () => {
  // Fetch current user
  const { data: currentUser, isLoading, error } = useQuery<User>({
    queryKey: ['/api/auth/me'],
  });
  
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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          There was a problem loading your dashboard. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-primary neon-text">Welcome</span> to Kingdom Kids!
          </h2>
          <p className="text-muted-foreground mb-6">Your Christian parental control app with scripture learning</p>
          
          <p>Your dashboard is loading. If nothing appears after a few moments, please sign in again.</p>
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
