import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, BookOpen, Heart, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

type BibleVersion = {
  id: string;
  name: string;
  description: string;
};

type BibleBook = {
  id: string;
  name: string;
  chapters: number;
};

type BibleChapter = {
  book: string;
  chapter: number;
  verses: {
    verse: number;
    text: string;
  }[];
};

const BibleReader: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>("kjv");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch Bible versions
  const { data: versions, isLoading: versionsLoading } = useQuery<BibleVersion[]>({
    queryKey: ['/api/bible/versions'],
  });

  // Fetch Bible books
  const { data: books, isLoading: booksLoading } = useQuery<BibleBook[]>({
    queryKey: ['/api/bible/books', selectedVersion],
    enabled: !!selectedVersion,
  });

  // Fetch chapter content
  const { data: chapterContent, isLoading: chapterLoading } = useQuery<BibleChapter>({
    queryKey: ['/api/bible/content', selectedVersion, selectedBook, selectedChapter],
    enabled: !!selectedVersion && !!selectedBook && !!selectedChapter,
  });

  // Handle search
  const { data: searchResults, isLoading: searchLoading } = useQuery<any>({
    queryKey: ['/api/bible/search', searchQuery, selectedVersion],
    enabled: searchQuery.length > 2,
  });

  const toggleFavorite = (reference: string) => {
    setFavorites(prev => 
      prev.includes(reference) 
        ? prev.filter(ref => ref !== reference)
        : [...prev, reference]
    );
  };

  const saveVerse = async (reference: string, text: string) => {
    try {
      await fetch('/api/bible/save-verse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, text }),
      });
      alert('Verse saved to your journal!');
    } catch (error) {
      console.error('Error saving verse:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          <span className="text-primary neon-text">Bible Reader</span>
        </h2>
        <p className="text-muted-foreground">Explore the Word of God in kid-friendly translations</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="bible-version" className="block text-sm font-medium mb-1">
                Bible Version
              </label>
              <Select 
                value={selectedVersion} 
                onValueChange={setSelectedVersion}
              >
                <SelectTrigger id="bible-version">
                  <SelectValue placeholder="Select a version" />
                </SelectTrigger>
                <SelectContent>
                  {versionsLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : versions && versions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="bible-book" className="block text-sm font-medium mb-1">
                Book
              </label>
              <Select 
                value={selectedBook} 
                onValueChange={setSelectedBook}
                disabled={!selectedVersion || booksLoading}
              >
                <SelectTrigger id="bible-book">
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {booksLoading ? (
                    <SelectItem value="loading">Loading...</SelectItem>
                  ) : books && books.map(book => (
                    <SelectItem key={book.id} value={book.id}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="bible-chapter" className="block text-sm font-medium mb-1">
                Chapter
              </label>
              <Select 
                value={selectedChapter.toString()} 
                onValueChange={(value) => setSelectedChapter(parseInt(value))}
                disabled={!selectedBook || !books}
              >
                <SelectTrigger id="bible-chapter">
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  {books && selectedBook && books.find(b => b.id === selectedBook)?.chapters 
                    ? Array.from({ length: books.find(b => b.id === selectedBook)!.chapters }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        Chapter {i + 1}
                      </SelectItem>
                    ))
                    : <SelectItem value="1">Chapter 1</SelectItem>
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search the Bible..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="read">
        <TabsList className="mb-4">
          <TabsTrigger value="read" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Read
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="read">
          <Card>
            <CardContent className="p-6">
              {chapterLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : chapterContent ? (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {selectedBook} {selectedChapter}
                  </h3>
                  
                  <div className="space-y-2 text-lg leading-relaxed">
                    {chapterContent.verses.map((verse) => (
                      <div key={verse.verse} className="group relative">
                        <span className="text-primary font-semibold mr-2">{verse.verse}</span>
                        <span>{verse.text}</span>
                        
                        <div className="absolute right-0 top-0 hidden group-hover:flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(`${selectedBook} ${selectedChapter}:${verse.verse}`)}
                          >
                            <Heart
                              className={`h-4 w-4 ${
                                favorites.includes(`${selectedBook} ${selectedChapter}:${verse.verse}`)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => saveVerse(`${selectedBook} ${selectedChapter}:${verse.verse}`, verse.text)}
                          >
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      disabled={selectedChapter <= 1}
                      onClick={() => setSelectedChapter(prev => Math.max(1, prev - 1))}
                    >
                      Previous Chapter
                    </Button>
                    
                    <Button
                      variant="outline"
                      disabled={
                        !books ||
                        !selectedBook ||
                        selectedChapter >= (books.find(b => b.id === selectedBook)?.chapters || 1)
                      }
                      onClick={() => {
                        const maxChapters = books?.find(b => b.id === selectedBook)?.chapters || 1;
                        setSelectedChapter(prev => Math.min(maxChapters, prev + 1));
                      }}
                    >
                      Next Chapter
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Select a passage to read</h3>
                  <p className="text-muted-foreground">
                    Choose a book and chapter from the options above
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search">
          <Card>
            <CardContent className="p-6">
              {searchQuery.length < 3 ? (
                <div className="text-center py-6">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Search the Bible</h3>
                  <p className="text-muted-foreground">
                    Type at least 3 characters to search
                  </p>
                </div>
              ) : searchLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : searchResults && searchResults.results && searchResults.results.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Search Results for "{searchQuery}"
                  </h3>
                  
                  <div className="space-y-4">
                    {searchResults.results.map((result: any, index: number) => (
                      <div key={index} className="p-3 border rounded-md hover:border-primary">
                        <h4 className="font-semibold text-primary">
                          {result.reference}
                        </h4>
                        <p className="mt-1">{result.text}</p>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => {
                              const [book, chapterVerse] = result.reference.split(' ');
                              const [chapter] = chapterVerse.split(':');
                              setSelectedBook(book);
                              setSelectedChapter(parseInt(chapter));
                              setSearchQuery('');
                            }}
                          >
                            Go to passage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardContent className="p-6">
              {favorites.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold mb-4">Your Favorite Verses</h3>
                  
                  <div className="space-y-4">
                    {favorites.map((reference, index) => (
                      <div key={index} className="p-3 border rounded-md hover:border-primary">
                        <h4 className="font-semibold text-primary">{reference}</h4>
                        <div className="flex justify-end mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs mr-2"
                            onClick={() => {
                              const [book, chapterVerse] = reference.split(' ');
                              const [chapter] = chapterVerse.split(':');
                              setSelectedBook(book);
                              setSelectedChapter(parseInt(chapter));
                            }}
                          >
                            Go to passage
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-destructive"
                            onClick={() => toggleFavorite(reference)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground">
                    Mark verses as favorites while reading to save them here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BibleReader;
