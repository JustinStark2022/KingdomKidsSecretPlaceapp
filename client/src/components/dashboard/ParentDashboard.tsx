import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GameMonitoring, FriendRequest, Alert, ScriptureProgress, User } from "@shared/schema";
import { Shield, BookOpen, MessageSquare, Award, BarChart2, Users, Check, AlertTriangle } from "lucide-react";

type DashboardSummary = {
  pendingAlerts: number;
  scriptureProgressPercent: number;
  lessonsCompleted: number;
  totalLessons: number;
  prayerEntries: number;
  childUsers: User[];
};

const ParentDashboard: React.FC = () => {
  // Fetch dashboard summary data
  const { data: summary, isLoading: summaryLoading } = useQuery<DashboardSummary>({
    queryKey: ['/api/dashboard/summary'],
  });
  
  // Fetch recent alerts
  const { data: recentAlerts, isLoading: alertsLoading } = useQuery<Alert[]>({
    queryKey: ['/api/alerts/recent'],
  });
  
  // Fetch friend requests
  const { data: friendRequests, isLoading: friendsLoading } = useQuery<FriendRequest[]>({
    queryKey: ['/api/friend-requests'],
  });

  // Fetch game analyses
  const { data: gameAnalyses, isLoading: gamesLoading } = useQuery<GameMonitoring[]>({
    queryKey: ['/api/games/monitoring'],
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-primary neon-text">Welcome Back</span>, Parent!
        </h2>
        <p className="text-muted-foreground">Monitor your child's activities and spiritual growth</p>
      </div>

      {/* Get Started Card (for new users) */}
      {!summaryLoading && summary && summary.childUsers.length === 0 ? (
        <Card className="bg-card rounded-xl shadow-md p-4 mb-8 text-center">
          <CardContent className="pt-4">
            <h3 className="font-bold text-xl mb-2">New to Kingdom Kids?</h3>
            <p className="text-muted-foreground mb-3">Set up your family's account and customize preferences</p>
            <Link href="/settings">
              <Button>Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      ) : null}

      {/* Monitor Activities Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary neon-text">Monitor activities</h3>
          <Link href="/monitoring">
            <Button variant="link" className="text-primary">View all</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Chat Monitoring Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b40?auto=format&fit=crop&w=600&h=300" 
                alt="Children using tablets" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h4 className="text-white font-semibold">Chat monitoring</h4>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Monitor conversations and detect concerning patterns
              </p>
              <div className="flex justify-between items-center text-xs">
                {friendsLoading ? (
                  <Skeleton className="h-4 w-40" />
                ) : (
                  <span className="text-purple-500 font-semibold">
                    {friendRequests?.filter(r => r.status === "pending").length || 0} friend requests pending
                  </span>
                )}
                <Link href="/monitoring/chat">
                  <Button variant="link" className="text-primary p-0 h-auto text-xs">Review</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Safety Settings Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=600&h=300" 
                alt="Child safety" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h4 className="text-white font-semibold">Safety settings</h4>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Configure content filters and approval alerts
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-green-500 font-semibold">All systems active</span>
                <Link href="/settings/safety">
                  <Button variant="link" className="text-primary p-0 h-auto text-xs">Configure</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scripture & Devotionals Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary neon-text">Scripture & Devotionals</h3>
          <Link href="/bible">
            <Button variant="link" className="text-primary">View all</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Bible Reader Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&h=300" 
                alt="Open Bible" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h4 className="text-white font-semibold">Bible Reader & Quizzes</h4>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Kid-friendly Bible readings with interactive quizzes
              </p>
              <div className="flex items-center text-xs space-x-2">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  Cool Prizes
                </span>
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  Scripture Fun
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* Prayer Journal Card */}
          <Card className="overflow-hidden shadow-md hover:shadow-lg transition">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515232389446-775346a929f5?auto=format&fit=crop&w=600&h=300" 
                alt="Prayer journal" 
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h4 className="text-white font-semibold">Prayer Devotionals</h4>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Daily devotionals and prayer journal for kids
              </p>
              <div className="flex items-center text-xs space-x-2">
                <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  New Content
                </span>
                <span className="bg-green-500 text-white px-2 py-1 rounded-full">
                  {summaryLoading ? "..." : `${summary?.prayerEntries || 0} Entries`}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Parental Tools Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary neon-text">Parental tools</h3>
          <Link href="/monitoring">
            <Button variant="link" className="text-primary">View all</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Friend Requests Tracking */}
          <Card className="p-4 shadow-md">
            <div className="flex items-center mb-3">
              <Users className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-semibold">Friend requests tracking</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Review and approve friend requests</p>
            <div className="flex justify-between items-center">
              {friendsLoading ? (
                <Skeleton className="h-4 w-28" />
              ) : (
                <span className="text-xs text-purple-500">
                  {friendRequests?.filter(r => r.status === "pending").length || 0} pending requests
                </span>
              )}
              <Link href="/monitoring/friends">
                <Button variant="link" className="text-primary p-0 h-auto text-sm">Review</Button>
              </Link>
            </div>
          </Card>
          
          {/* One-Click Approval */}
          <Card className="p-4 shadow-md">
            <div className="flex items-center mb-3">
              <Check className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-semibold">One-Click Approval & Blocking</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Quickly respond to content requests</p>
            <div className="flex justify-between items-center">
              {alertsLoading ? (
                <Skeleton className="h-4 w-28" />
              ) : (
                <span className="text-xs text-green-500">
                  {recentAlerts && recentAlerts.filter(a => !a.handled).length > 0 
                    ? `${recentAlerts.filter(a => !a.handled).length} pending approvals` 
                    : 'All clear'}
                </span>
              )}
              <Link href="/monitoring/approvals">
                <Button variant="link" className="text-primary p-0 h-auto text-sm">Settings</Button>
              </Link>
            </div>
          </Card>
          
          {/* Gaming Analysis */}
          <Card className="p-4 shadow-md">
            <div className="flex items-center mb-3">
              <BarChart2 className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-semibold">Gaming analysis</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Review game content and time spent</p>
            <div className="flex justify-between items-center">
              {gamesLoading ? (
                <Skeleton className="h-4 w-28" />
              ) : (
                <span className="text-xs text-yellow-500">
                  {gameAnalyses?.filter(g => g.approved === null).length || 0} new game{gameAnalyses?.filter(g => g.approved === null).length !== 1 ? 's' : ''} detected
                </span>
              )}
              <Link href="/monitoring/games">
                <Button variant="link" className="text-primary p-0 h-auto text-sm">Analyze</Button>
              </Link>
            </div>
          </Card>
          
          {/* Chat Monitoring */}
          <Card className="p-4 shadow-md">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-primary mr-2" />
              <h4 className="font-semibold">Chat monitoring</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">AI-powered chat safety monitoring</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-green-500">Protected</span>
              <Link href="/monitoring/chat">
                <Button variant="link" className="text-primary p-0 h-auto text-sm">View logs</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Child Progress Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary neon-text">Child's spiritual progress</h3>
          <Link href="/dashboard/progress">
            <Button variant="link" className="text-primary">Detailed view</Button>
          </Link>
        </div>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold">Scripture Memorization</h4>
                <p className="text-sm text-muted-foreground">
                  {summaryLoading ? (
                    <Skeleton className="h-4 w-40 mt-1" />
                  ) : (
                    `${summary?.scriptureProgressPercent || 0}% completed`
                  )}
                </p>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path 
                    className="stroke-current text-muted/20" 
                    fill="none" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path 
                    className="stroke-current text-primary" 
                    fill="none" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeDasharray={`${summaryLoading ? 0 : summary?.scriptureProgressPercent || 0}, 100`} 
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text 
                    x="18" 
                    y="20.5" 
                    className="text-xs font-semibold text-center" 
                    textAnchor="middle" 
                    fill="currentColor"
                  >
                    {summaryLoading ? "..." : `${summary?.scriptureProgressPercent || 0}%`}
                  </text>
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold">Bible Lessons Completed</h5>
                  <span className="text-xs text-primary">
                    {summaryLoading ? "..." : `${summary?.lessonsCompleted || 0}/${summary?.totalLessons || 0}`}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ 
                      width: summaryLoading ? "0%" : 
                        `${summary?.totalLessons ? 
                          (summary.lessonsCompleted / summary.totalLessons) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold">Prayer Journal Entries</h5>
                  <span className="text-xs text-primary">
                    {summaryLoading ? "..." : `${summary?.prayerEntries || 0} this month`}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ 
                      width: summaryLoading ? "0%" : 
                        `${Math.min((summary?.prayerEntries || 0) * 5, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Recent Achievements</h5>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-1 bg-muted/20 px-2 py-1 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs">Psalm 23 Memorized</span>
                </div>
                <div className="flex items-center space-x-1 bg-muted/20 px-2 py-1 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs">7-Day Prayer Streak</span>
                </div>
                <div className="flex items-center space-x-1 bg-muted/20 px-2 py-1 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-xs">Bible Quiz Champion</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ParentDashboard;
