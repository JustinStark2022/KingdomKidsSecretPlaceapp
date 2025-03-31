import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Clock, 
  Calendar, 
  AlarmClock, 
  BarChart, 
  BookOpen, 
  Gamepad,
  Plus,
  Smartphone,
  Laptop,
  Monitor,
  Pencil
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@shared/schema";

interface ScreenTimeData {
  user: User;
  dailyLimits: {
    total: number;
    gaming: number;
    social: number;
    educational: number;
  };
  usageToday: {
    total: number;
    gaming: number;
    social: number;
    educational: number;
  };
  timeRewards: {
    fromScripture: number;
    fromLessons: number;
    fromChores: number;
  };
  schedule: {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    enabled: boolean;
  }[];
  blockedApps: {
    id: number;
    name: string;
    category: string;
    blocked: boolean;
  }[];
}

const ScreenTimeControls: React.FC = () => {
  const { toast } = useToast();
  const [selectedChild, setSelectedChild] = useState<string>("1");
  const [newSchedule, setNewSchedule] = useState({
    dayOfWeek: "monday",
    startTime: "08:00",
    endTime: "21:00"
  });
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  // Fetch children
  const { data: children, isLoading: childrenLoading } = useQuery<User[]>({
    queryKey: ['/api/users/children'],
  });
  
  // Fetch screen time data
  const { data: screenTimeData, isLoading } = useQuery<ScreenTimeData>({
    queryKey: ['/api/screen-time', selectedChild],
    enabled: !!selectedChild
  });
  
  // Update screen time mutation
  const updateScreenTimeMutation = useMutation({
    mutationFn: async (data: { type: string; value: number }) => {
      return apiRequest("PUT", `/api/screen-time/${selectedChild}/limits`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/screen-time', selectedChild] });
      toast({
        title: "Screen time updated",
        description: "New screen time limits have been set",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating screen time",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  // Add schedule mutation
  const addScheduleMutation = useMutation({
    mutationFn: async (data: { dayOfWeek: string; startTime: string; endTime: string }) => {
      return apiRequest("POST", `/api/screen-time/${selectedChild}/schedule`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/screen-time', selectedChild] });
      setScheduleDialogOpen(false);
      toast({
        title: "Schedule added",
        description: "New screen time schedule has been added",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding schedule",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  // Toggle app block mutation
  const toggleAppBlockMutation = useMutation({
    mutationFn: async ({ appId, blocked }: { appId: number; blocked: boolean }) => {
      return apiRequest("PUT", `/api/screen-time/${selectedChild}/app/${appId}`, { blocked });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/screen-time', selectedChild] });
    },
    onError: (error) => {
      toast({
        title: "Error updating app block",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  // Handle screen time update
  const handleScreenTimeUpdate = (type: string, value: number) => {
    updateScreenTimeMutation.mutate({ type, value });
  };
  
  // Handle adding new schedule
  const handleAddSchedule = () => {
    addScheduleMutation.mutate(newSchedule);
  };
  
  // Handle toggling app block
  const handleToggleAppBlock = (appId: number, blocked: boolean) => {
    toggleAppBlockMutation.mutate({ appId, blocked });
  };
  
  const getDayLabel = (day: string) => {
    const days: { [key: string]: string } = {
      'monday': 'Mon',
      'tuesday': 'Tue',
      'wednesday': 'Wed',
      'thursday': 'Thu',
      'friday': 'Fri',
      'saturday': 'Sat',
      'sunday': 'Sun'
    };
    return days[day.toLowerCase()] || day;
  };
  
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  const calculatePercentage = (used: number, limit: number): number => {
    if (limit === 0) return 0;
    return Math.min(Math.round((used / limit) * 100), 100);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-primary neon-text">Screen Time Controls</span>
        </h2>
        <p className="text-muted-foreground">Manage your child's device usage and set healthy limits</p>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="child-select">Select Child</Label>
              <Select 
                value={selectedChild} 
                onValueChange={setSelectedChild}
              >
                <SelectTrigger id="child-select">
                  <SelectValue placeholder="Select a child" />
                </SelectTrigger>
                <SelectContent>
                  {childrenLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : children && children.length > 0 ? (
                    children.map(child => (
                      <SelectItem key={child.id} value={child.id.toString()}>
                        {child.displayName || child.username}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none">No children found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </div>
            ) : screenTimeData ? (
              <div className="space-y-3">
                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Today's Screen Time: <span className="text-primary">{formatTime(screenTimeData.usageToday.total)}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Limit: {formatTime(screenTimeData.dailyLimits.total)} 
                        {screenTimeData.timeRewards.fromScripture > 0 && 
                          ` (+${formatTime(screenTimeData.timeRewards.fromScripture)} bonus from activities)`}
                      </p>
                    </div>
                    <div className="h-16 w-16 relative">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          className="stroke-muted/30" 
                          strokeWidth="3" 
                        />
                        <circle 
                          cx="18" 
                          cy="18" 
                          r="16" 
                          fill="none" 
                          className="stroke-primary" 
                          strokeWidth="3" 
                          strokeDasharray="100" 
                          strokeDashoffset={100 - calculatePercentage(screenTimeData.usageToday.total, screenTimeData.dailyLimits.total + screenTimeData.timeRewards.fromScripture + screenTimeData.timeRewards.fromLessons)}
                          strokeLinecap="round" 
                        />
                        <text 
                          x="18" 
                          y="18" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          className="text-xs font-medium"
                        >
                          {calculatePercentage(screenTimeData.usageToday.total, screenTimeData.dailyLimits.total + screenTimeData.timeRewards.fromScripture + screenTimeData.timeRewards.fromLessons)}%
                        </text>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="rounded-full bg-purple-500/20 p-2">
                          <Gamepad className="h-4 w-4 text-purple-500" />
                        </div>
                        <h4 className="font-medium">Gaming</h4>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Used</span>
                          <span>{formatTime(screenTimeData.usageToday.gaming)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Limit</span>
                          <span>{formatTime(screenTimeData.dailyLimits.gaming)}</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${calculatePercentage(screenTimeData.usageToday.gaming, screenTimeData.dailyLimits.gaming)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="rounded-full bg-blue-500/20 p-2">
                          <Smartphone className="h-4 w-4 text-blue-500" />
                        </div>
                        <h4 className="font-medium">Social</h4>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Used</span>
                          <span>{formatTime(screenTimeData.usageToday.social)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Limit</span>
                          <span>{formatTime(screenTimeData.dailyLimits.social)}</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${calculatePercentage(screenTimeData.usageToday.social, screenTimeData.dailyLimits.social)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="rounded-full bg-green-500/20 p-2">
                          <BookOpen className="h-4 w-4 text-green-500" />
                        </div>
                        <h4 className="font-medium">Educational</h4>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Used</span>
                          <span>{formatTime(screenTimeData.usageToday.educational)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Limit</span>
                          <span>{formatTime(screenTimeData.dailyLimits.educational)}</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${calculatePercentage(screenTimeData.usageToday.educational, screenTimeData.dailyLimits.educational)}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="limits">
        <TabsList className="mb-4">
          <TabsTrigger value="limits" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Time Limits
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="apps" className="flex items-center">
            <Smartphone className="mr-2 h-4 w-4" />
            Apps & Websites
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Time Rewards
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="limits">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Daily Time Limits</h3>
              
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : screenTimeData ? (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Total screen time per day</Label>
                      <span className="font-medium">{formatTime(screenTimeData.dailyLimits.total)}</span>
                    </div>
                    <Slider
                      defaultValue={[screenTimeData.dailyLimits.total]}
                      max={720}
                      step={15}
                      onValueChange={(value) => handleScreenTimeUpdate('total', value[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Gaming time per day</Label>
                      <span className="font-medium">{formatTime(screenTimeData.dailyLimits.gaming)}</span>
                    </div>
                    <Slider
                      defaultValue={[screenTimeData.dailyLimits.gaming]}
                      max={240}
                      step={15}
                      onValueChange={(value) => handleScreenTimeUpdate('gaming', value[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Social media time per day</Label>
                      <span className="font-medium">{formatTime(screenTimeData.dailyLimits.social)}</span>
                    </div>
                    <Slider
                      defaultValue={[screenTimeData.dailyLimits.social]}
                      max={240}
                      step={15}
                      onValueChange={(value) => handleScreenTimeUpdate('social', value[0])}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Educational content time per day</Label>
                      <span className="font-medium">{formatTime(screenTimeData.dailyLimits.educational)}</span>
                    </div>
                    <Slider
                      defaultValue={[screenTimeData.dailyLimits.educational]}
                      max={360}
                      step={15}
                      onValueChange={(value) => handleScreenTimeUpdate('educational', value[0])}
                    />
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Screen Time Schedule</h3>
                <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Screen Time Schedule</DialogTitle>
                      <DialogDescription>
                        Set up scheduled screen time for specific days and hours
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="day-of-week">Day of Week</Label>
                        <Select 
                          value={newSchedule.dayOfWeek} 
                          onValueChange={(value) => setNewSchedule({ ...newSchedule, dayOfWeek: value })}
                        >
                          <SelectTrigger id="day-of-week">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                            <SelectItem value="sunday">Sunday</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={newSchedule.startTime}
                            onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={newSchedule.endTime}
                            onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSchedule} disabled={addScheduleMutation.isPending}>
                        {addScheduleMutation.isPending ? "Adding..." : "Add Schedule"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : screenTimeData && screenTimeData.schedule.length > 0 ? (
                <div className="space-y-3">
                  {screenTimeData.schedule.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center">
                          <div className={`h-full w-12 flex items-center justify-center ${item.enabled ? "bg-primary" : "bg-muted"}`}>
                            <span className="font-bold text-sm">{getDayLabel(item.dayOfWeek)}</span>
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  <AlarmClock className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {item.startTime} - {item.endTime}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Devices will only work during these hours
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch 
                                  checked={item.enabled} 
                                  onCheckedChange={(checked) => {
                                    // Update schedule enabled state
                                    // Implementation needed
                                  }}
                                />
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">No schedules set</h4>
                  <p className="text-muted-foreground mb-4">
                    Create a schedule to define when your child can use devices
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setScheduleDialogOpen(true)}
                  >
                    Add Your First Schedule
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="apps">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Manage Apps & Websites</h3>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : screenTimeData && screenTimeData.blockedApps.length > 0 ? (
                <div className="space-y-3">
                  {screenTimeData.blockedApps.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-muted/20 p-2">
                          {app.category === 'gaming' && <Gamepad className="h-5 w-5 text-purple-500" />}
                          {app.category === 'social' && <Smartphone className="h-5 w-5 text-blue-500" />}
                          {app.category === 'educational' && <BookOpen className="h-5 w-5 text-green-500" />}
                          {app.category === 'entertainment' && <Monitor className="h-5 w-5 text-yellow-500" />}
                          {app.category === 'other' && <Laptop className="h-5 w-5 text-gray-500" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{app.name}</h4>
                          <p className="text-xs text-muted-foreground capitalize">{app.category}</p>
                        </div>
                      </div>
                      <Switch 
                        checked={!app.blocked} 
                        onCheckedChange={(checked) => handleToggleAppBlock(app.id, !checked)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-md bg-muted/10">
                  <Smartphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium mb-2">No apps detected yet</h4>
                  <p className="text-muted-foreground mb-4">
                    Apps and websites used by your child will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Screen Time Rewards</h3>
              <p className="text-muted-foreground mb-6">
                Motivate your child with additional screen time rewards for completing activities
              </p>
              
              {isLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : screenTimeData ? (
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-green-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-green-500/20 p-3">
                          <BookOpen className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Scripture Memorization</h4>
                          <p className="text-sm text-muted-foreground">For each verse memorized</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h5 className="font-medium text-green-600">{formatTime(screenTimeData.timeRewards.fromScripture)}</h5>
                        <p className="text-xs text-muted-foreground">earned so far</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-blue-500/20 p-3">
                          <Graduation className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Bible Lessons</h4>
                          <p className="text-sm text-muted-foreground">For each lesson completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h5 className="font-medium text-blue-600">{formatTime(screenTimeData.timeRewards.fromLessons)}</h5>
                        <p className="text-xs text-muted-foreground">earned so far</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-purple-500/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-purple-500/20 p-3">
                          <BarChart className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Chores & Responsibilities</h4>
                          <p className="text-sm text-muted-foreground">For completing assigned tasks</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h5 className="font-medium text-purple-600">{formatTime(screenTimeData.timeRewards.fromChores)}</h5>
                        <p className="text-xs text-muted-foreground">earned so far</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/10 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Total bonus time earned</h4>
                      <p className="text-sm text-muted-foreground">Additional to daily limits</p>
                    </div>
                    <div className="text-right">
                      <h5 className="font-medium text-xl text-primary">{formatTime(
                        screenTimeData.timeRewards.fromScripture +
                        screenTimeData.timeRewards.fromLessons +
                        screenTimeData.timeRewards.fromChores
                      )}</h5>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScreenTimeControls;
