import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DevotionalCard from "@/components/scripture/DevotionalCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Heart, BarChart4, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

type Devotional = {
  id: number;
  title: string;
  verse: string;
  reference: string;
  content: string;
  date: string;
  image?: string;
  tags: string[];
};

const Devotionals: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  
  // Fetch devotionals
  const { data: devotionals, isLoading } = useQuery<Devotional[]>({
    queryKey: ['/api/devotionals'],
  });
  
  const filteredDevotionals = devotionals?.filter(devotional => 
    devotional.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    devotional.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    devotional.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleFavorite = (devotionalId: number) => {
    setFavorites(prev => 
      prev.includes(devotionalId) 
        ? prev.filter(id => id !== devotionalId)
        : [...prev, devotionalId]
    );
  };
  
  const handleShare = (devotional: Devotional) => {
    // In a real implementation, this would open a share dialog
    alert(`Sharing: ${devotional.title}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-primary neon-text">Daily</span> Devotionals
        </h1>
        <p className="text-muted-foreground">Daily Bible readings and devotional content</p>
      </div>
      
      {selectedDevotional ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedDevotional.title}</h2>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(selectedDevotional.date), "MMMM d, yyyy")}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedDevotional(null)}
              >
                Back to List
              </Button>
            </div>
            
            {selectedDevotional.image && (
              <div className="mb-6">
                <img 
                  src={selectedDevotional.image} 
                  alt={selectedDevotional.title}
                  className="w-full rounded-md object-cover max-h-80"
                />
              </div>
            )}
            
            <div className="p-4 bg-muted/10 border rounded-md mb-6">
              <p className="text-lg font-serif italic">
                "{selectedDevotional.verse}" - {selectedDevotional.reference}
              </p>
            </div>
            
            <div className="mb-6 space-y-4">
              {selectedDevotional.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => toggleFavorite(selectedDevotional.id)}
                  className={favorites.includes(selectedDevotional.id) ? "text-primary" : ""}
                >
                  <Heart 
                    className={`mr-2 h-4 w-4 ${favorites.includes(selectedDevotional.id) ? "fill-primary" : ""}`} 
                  />
                  {favorites.includes(selectedDevotional.id) ? "Saved" : "Save for Later"}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare(selectedDevotional)}
                >
                  Share
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedDevotional.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devotionals..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 self-end">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{filteredDevotionals?.length || 0}</span> devotionals
              </p>
              <Button variant="outline" size="sm">
                <BarChart4 className="h-4 w-4 mr-2" />
                Progress
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Today's Devotional</h2>
            
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : devotionals && devotionals.length > 0 ? (
              <DevotionalCard
                title={devotionals[0].title}
                date={format(new Date(devotionals[0].date), "MMMM d, yyyy")}
                verse={devotionals[0].verse}
                reference={devotionals[0].reference}
                content={devotionals[0].content}
                imageSrc={devotionals[0].image}
                isFavorite={favorites.includes(devotionals[0].id)}
                onToggleFavorite={() => toggleFavorite(devotionals[0].id)}
                onShare={() => handleShare(devotionals[0])}
                onReadMore={() => setSelectedDevotional(devotionals[0])}
                className="bg-card/50 border-primary"
              />
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No devotionals available</p>
                </CardContent>
              </Card>
            )}
            
            <h2 className="text-xl font-bold mt-8">Recent Devotionals</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : filteredDevotionals && filteredDevotionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevotionals.slice(1).map(devotional => (
                  <DevotionalCard
                    key={devotional.id}
                    title={devotional.title}
                    date={format(new Date(devotional.date), "MMMM d, yyyy")}
                    verse={devotional.verse}
                    reference={devotional.reference}
                    content={devotional.content}
                    imageSrc={devotional.image}
                    isFavorite={favorites.includes(devotional.id)}
                    onToggleFavorite={() => toggleFavorite(devotional.id)}
                    onShare={() => handleShare(devotional)}
                    onReadMore={() => setSelectedDevotional(devotional)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No devotionals match your search</p>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Devotionals;
