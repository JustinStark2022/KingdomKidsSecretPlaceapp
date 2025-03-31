import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User, ScriptureProgress, BibleLesson } from "@shared/schema";
import { BookOpen, MessageSquare, Calendar, GraduationCap, Award, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChildDashboardProps {
  childId?: number;
}

type ChildDashboardData = {
  user: User;
  scriptureProgress: ScriptureProgress[];
  recentLessons: BibleLesson[];
  dailyDevotional: {
    title: string;
    verse: string;
    content: string;
  };
  gameTime: {
    earned: number;
    available: number;
    total: number;
  };
};

const ChildDashboard: React.FC<ChildDashboardProps> = ({ childId }) => {
  // Fetch child dashboard data
  const { data, isLoading } = useQuery<ChildDashboardData>({
    queryKey: ['/api/dashboard/child', childId],
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-primary neon-text">Welcome,</span>{" "}
          {isLoading ? (
            <Skeleton className="h-7 w-32 inline-block" />
          ) : (
            data?.user.displayName || "Child"
          )}!
        </h2>
        <p className="text-muted-foreground">Let's learn about Jesus today!</p>
      </div>

      {/* Daily Devotional Section */}
      <section>
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Today's Devotional</h3>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <>
                <h4 className="font-semibold text-primary mb-1">{data?.dailyDevotional.title}</h4>
                <p className="text-sm italic mb-2 font-serif">"{data?.dailyDevotional.verse}"</p>
                <p className="text-sm text-muted-foreground">{data?.dailyDevotional.content}</p>
                <div className="mt-3">
                  <Link href="/devotionals/today">
                    <Button size="sm">Read More</Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Game Time and Progress Section */}
      <section>
        <Card className="shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">Your Game Time</h3>
              <div className="text-sm font-semibold">
                {isLoading ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <span className="text-primary">{data?.gameTime.available} minutes available</span>
                )}
              </div>
            </div>
            
            <div className="bg-muted/20 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Game time progress</span>
                <span className="text-xs text-primary">
                  {isLoading ? "..." : `${data?.gameTime.earned || 0}/${data?.gameTime.total} mins earned`}
                </span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ 
                    width: isLoading ? "0%" : 
                    `${data?.gameTime.total ? (data?.gameTime.earned / data?.gameTime.total) * 100 : 0}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Complete Bible lessons and memorize scripture to earn more game time!
              </p>
            </div>
            
            <div className="flex justify-between">
              <Link href="/lessons">
                <Button variant="outline" size="sm" className="flex items-center">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  Bible Lessons
                </Button>
              </Link>
              <Link href="/bible/memorize">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Star className="mr-1 h-4 w-4" />
                  Scripture Challenge
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Activities Section */}
      <section>
        <h3 className="text-xl font-bold text-primary neon-text mb-4">Activities</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/bible">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Bible Reader</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Explore God's Word in kid-friendly language
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/prayer">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Prayer Journal</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Write down your prayers and thoughts
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/devotionals">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Devotionals</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Daily stories and lessons from the Bible
                </p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/lessons">
            <Card className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <GraduationCap className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-semibold">Bible Lessons</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Learn and earn rewards through fun Bible activities
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Scripture Memorization Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary neon-text">Your Scripture Progress</h3>
          <Link href="/bible/memorize">
            <Button variant="link" className="text-primary">View All</Button>
          </Link>
        </div>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-60" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : data?.scriptureProgress && data.scriptureProgress.length > 0 ? (
              <div className="space-y-4">
                {data.scriptureProgress.slice(0, 3).map((scripture) => (
                  <div key={scripture.id} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{scripture.scriptureReference}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {scripture.content}
                      </p>
                    </div>
                    <Link href={`/bible/memorize/${scripture.id}`}>
                      <Button 
                        size="sm" 
                        variant={scripture.memorized ? "outline" : "default"}
                        className={scripture.memorized ? "text-green-500" : ""}
                      >
                        {scripture.memorized ? (
                          <>
                            <Award className="mr-1 h-4 w-4" />
                            Completed
                          </>
                        ) : (
                          "Practice"
                        )}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No scripture memorization tasks yet!</p>
                <Link href="/bible/memorize/new">
                  <Button className="mt-2">Start Memorizing</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ChildDashboard;
