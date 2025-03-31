import React from "react";
import ParentDashboard from "@/components/dashboard/ParentDashboard";
import ChildDashboard from "@/components/dashboard/ChildDashboard";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard: React.FC = () => {
  // Fetch current user
  const { data: currentUser, isLoading } = useQuery<User>({
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
  
  // Render appropriate dashboard based on user type
  return (
    <>
      {currentUser?.isParent ? (
        <ParentDashboard />
      ) : (
        <ChildDashboard childId={currentUser?.id} />
      )}
    </>
  );
};

export default Dashboard;
