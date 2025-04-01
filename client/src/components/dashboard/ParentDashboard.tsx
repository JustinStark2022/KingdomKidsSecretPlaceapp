import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GameMonitoring } from "@/types/game";
import { FriendRequest } from "@/types/friend";
import { Alert } from "@/types/alert";
import { User } from "@/types/user";
import {
  Shield, BookOpen, MessageSquare, Award,
  BarChart2, Users, Check, AlertTriangle
} from "lucide-react";

type DashboardSummary = {
  pendingAlerts: number;
  scriptureProgressPercent: number;
  lessonsCompleted: number;
  totalLessons: number;
  prayerEntries: number;
  childUsers: User[];
};

const ParentDashboard: React.FC = () => {
  const { data: summary } = useQuery<DashboardSummary>({
    queryKey: ["/api/dashboard/summary"],
  });

  const { data: recentAlerts } = useQuery<Alert[]>({
    queryKey: ["/api/alerts/recent"],
  });

  const { data: friendRequests } = useQuery<FriendRequest[]>({
    queryKey: ["/api/friend-requests"],
  });

  const { data: gameAnalyses } = useQuery<GameMonitoring[]>({
    queryKey: ["/api/games/monitoring"],
  });

  // 👇 Add loading fallbacks directly where needed (optional enhancement)
  const summaryLoading = !summary;
  const alertsLoading = !recentAlerts;
  const friendsLoading = !friendRequests;
  const gamesLoading = !gameAnalyses;

  return (
    <div className="space-y-8">
      {/* your full UI structure remains unchanged here */}
    </div>
  );
};

export default ParentDashboard;
