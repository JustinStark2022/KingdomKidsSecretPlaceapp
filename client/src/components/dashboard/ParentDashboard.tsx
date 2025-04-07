// components/dashboard/ParentDashboard.tsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameAnalysis from "@/components/monitoring/GameAnalysis";
import ChatMonitoring from "@/components/monitoring/ChatMonitoring";
import ScreenTimeControls from "@/components/monitoring/ScreenTimeControls";
import FriendRequests from "@/components/monitoring/FriendRequests";
import { useQuery } from "@tanstack/react-query";
import {
  Shield, MessageSquare, Clock, Users, Activity
} from "lucide-react";

const ParentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-primary neon-text">Parental</span> Monitoring
        </h1>
        <p className="text-muted-foreground">
          Monitor and manage your child's online activities
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Game Analysis
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Monitoring
          </TabsTrigger>
          <TabsTrigger value="screen-time" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Screen Time
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Friend Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("games")}>
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 text-primary mx-auto mb-4 bg-primary/20 p-4 rounded-full" />
                <h3 className="text-xl font-bold mb-2">Game Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Review game content and approve or block access
                </p>
                <Button>View Game Analysis</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("chat")}>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4 bg-primary/20 p-4 rounded-full" />
                <h3 className="text-xl font-bold mb-2">Chat Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor conversations and protect against harmful content
                </p>
                <Button>View Chat Logs</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("screen-time")}>
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4 bg-primary/20 p-4 rounded-full" />
                <h3 className="text-xl font-bold mb-2">Screen Time Controls</h3>
                <p className="text-muted-foreground mb-4">
                  Set limits and create healthy screen time schedules
                </p>
                <Button>Manage Screen Time</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setActiveTab("friends")}>
              <CardContent className="p-6 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-4 bg-primary/20 p-4 rounded-full" />
                <h3 className="text-xl font-bold mb-2">Friend Requests</h3>
                <p className="text-muted-foreground mb-4">
                  Review and approve your child's friend connections
                </p>
                <Button>Manage Friend Requests</Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Getting Started</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <p>
                  Welcome to the Kingdom Kids Parental Monitoring dashboard! Here, you can monitor and manage your child's digital experience to ensure it aligns with your family's Christian values.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Shield className="h-5 w-5 text-primary mr-2" />
                      Content Protection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Kingdom Kids analyzes game content, chat messages, and online activities to protect your child from inappropriate content.
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      Screen Time Management
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set daily limits, schedule device access hours, and reward biblical learning with extra screen time.
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <MessageSquare className="h-5 w-5 text-primary mr-2" />
                      Chat Monitoring
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      AI-powered chat analysis flags potentially harmful conversations while respecting privacy.
                    </p>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      Friend Approval
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Review and approve your child's friend requests before they can connect.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <GameAnalysis />
        </TabsContent>
        <TabsContent value="chat">
          <ChatMonitoring />
        </TabsContent>
        <TabsContent value="screen-time">
          <ScreenTimeControls />
        </TabsContent>
        <TabsContent value="friends">
          <FriendRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
