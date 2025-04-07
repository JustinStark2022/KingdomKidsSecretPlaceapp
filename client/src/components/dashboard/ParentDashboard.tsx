// Updated: components/dashboard/ParentDashboard.tsx
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

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">Parental Overview</h2>
          {summary ? (
            <ul className="space-y-2">
              <li><Check className="inline w-4 h-4 mr-1" /> {summary.lessonsCompleted}/{summary.totalLessons} Lessons Completed</li>
              <li><BookOpen className="inline w-4 h-4 mr-1" /> {summary.scriptureProgressPercent}% Scripture Memorized</li>
              <li><MessageSquare className="inline w-4 h-4 mr-1" /> {summary.prayerEntries} Prayer Entries</li>
              <li><Users className="inline w-4 h-4 mr-1" /> {summary.childUsers.length} Linked Children</li>
            </ul>
          ) : (
            <Skeleton className="h-20" />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;

