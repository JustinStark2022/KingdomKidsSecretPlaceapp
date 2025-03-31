import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, insertUserSchema, type InsertUser } from "@shared/schema";
import bcrypt from "bcryptjs";
import session from "express-session";

// Session is now defined in types/express-session.d.ts

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      // Access the request body directly
      const { username, password, email, isParent, displayName, parentId } = req.body;
      
      // Validate using zod schema
      insertUserSchema.parse({
        username,
        password,
        email,
        isParent,
        displayName,
        parentId
      });
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ error: "Username already exists" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user with hashed password
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        email,
        isParent,
        displayName,
        parentId
      });
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Access the request body directly
      const { username, password } = req.body;
      
      // Validate using zod schema
      loginSchema.parse({ username, password });
      
      // Find user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      // Set user in session
      if (req.session) {
        req.session.userId = user.id;
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      // Check if user is authenticated
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // Find user by ID
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    } else {
      res.status(200).json({ message: "Already logged out" });
    }
  });
  
  // Dashboard routes
  app.get("/api/dashboard/summary", async (req: Request, res: Response) => {
    try {
      // Check if user is authenticated
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // For now, return mock data
      const summary = {
        pendingAlerts: 3,
        scriptureProgressPercent: 65,
        lessonsCompleted: 12,
        totalLessons: 20,
        prayerEntries: 8,
        childUsers: [
          {
            id: 2,
            username: "timmy",
            displayName: "Timmy",
            email: "timmy@example.com",
            isParent: false,
            parentId: req.session.userId
          },
          {
            id: 3,
            username: "sarah",
            displayName: "Sarah",
            email: "sarah@example.com",
            isParent: false,
            parentId: req.session.userId
          }
        ]
      };
      
      res.status(200).json(summary);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  app.get("/api/dashboard/child", async (req: Request, res: Response) => {
    try {
      // Check if user is authenticated
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      // Get user
      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return child dashboard data
      const childDashboardData = {
        user,
        scriptureProgress: [
          {
            id: 1,
            userId: user.id,
            scriptureReference: "John 3:16",
            content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
            memorized: true,
            completedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            userId: user.id,
            scriptureReference: "Psalm 23:1",
            content: "The Lord is my shepherd, I lack nothing.",
            memorized: false,
            completedAt: null,
            createdAt: new Date().toISOString()
          }
        ],
        recentLessons: [
          {
            id: 1,
            title: "The Good Samaritan",
            description: "Learn about helping others through the parable of the Good Samaritan",
            content: "Jesus told this story to teach us to love and help everyone, even people who are different from us.",
            scriptureReference: "Luke 10:25-37",
            difficulty: "easy",
            timeEstimate: 15,
            rewardMinutes: 10,
            createdAt: new Date().toISOString()
          }
        ],
        dailyDevotional: {
          title: "Being Kind Like Jesus",
          verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
          content: "Jesus wants us to be kind to everyone we meet. Think about ways you can show kindness today, like sharing your toys or saying something nice to a friend."
        },
        gameTime: {
          earned: 45,
          available: 30,
          total: 60
        }
      };
      
      res.status(200).json(childDashboardData);
    } catch (error) {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  });
  
  // Add additional API routes for other features
  app.get("/api/alerts/recent", (req: Request, res: Response) => {
    // For now, return some example data
    const recentAlerts = [
      {
        id: 1,
        userId: 1,
        type: "game_request",
        message: "Timmy wants to play Minecraft",
        handled: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        userId: 1,
        type: "friend_request",
        message: "Sarah received a friend request from JohnDoe",
        handled: true,
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json(recentAlerts);
  });
  
  app.get("/api/friend-requests", (req: Request, res: Response) => {
    const friendRequests = [
      {
        id: 1,
        childId: 2,
        childName: "Timmy",
        requestorName: "JohnDoe123",
        platform: "Roblox",
        status: "pending",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        childId: 3,
        childName: "Sarah",
        requestorName: "GamerGirl22",
        platform: "Minecraft",
        status: "approved",
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json(friendRequests);
  });
  
  app.get("/api/games/monitoring", (req: Request, res: Response) => {
    const gameAnalyses = [
      {
        id: 1,
        childId: 2,
        childName: "Timmy",
        gameName: "Fortnite",
        gameContent: "Battle Royale shooter game",
        contentWarnings: "Mild cartoon violence",
        esrbRating: "Teen",
        timeSpentMinutes: 45,
        approved: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        childId: 2,
        childName: "Timmy",
        gameName: "Minecraft",
        gameContent: "Building and exploration game",
        contentWarnings: "None",
        esrbRating: "Everyone",
        timeSpentMinutes: 60,
        approved: null,
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json(gameAnalyses);
  });
  
  // Notifications mock endpoint
  app.get("/api/notifications/unread", (req: Request, res: Response) => {
    res.status(200).json({ count: 3 });
  });
  
  // Bible API endpoints
  app.get("/api/bible/versions", (req: Request, res: Response) => {
    const versions = [
      {
        id: "kjv",
        name: "King James Version",
        description: "Traditional, classic translation from 1611"
      },
      {
        id: "niv",
        name: "New International Version",
        description: "Clear, modern translation"
      },
      {
        id: "icb",
        name: "International Children's Bible",
        description: "Written for children with simple vocabulary"
      },
      {
        id: "nlt",
        name: "New Living Translation",
        description: "Easy-to-understand, conversational style"
      }
    ];
    
    res.status(200).json(versions);
  });
  
  app.get("/api/bible/books", (req: Request, res: Response) => {
    const books = [
      { id: "Genesis", name: "Genesis", chapters: 50 },
      { id: "Exodus", name: "Exodus", chapters: 40 },
      { id: "Leviticus", name: "Leviticus", chapters: 27 },
      { id: "Numbers", name: "Numbers", chapters: 36 },
      { id: "Deuteronomy", name: "Deuteronomy", chapters: 34 },
      { id: "Joshua", name: "Joshua", chapters: 24 },
      { id: "Judges", name: "Judges", chapters: 21 },
      { id: "Ruth", name: "Ruth", chapters: 4 },
      { id: "1Samuel", name: "1 Samuel", chapters: 31 },
      { id: "2Samuel", name: "2 Samuel", chapters: 24 },
      { id: "Matthew", name: "Matthew", chapters: 28 },
      { id: "Mark", name: "Mark", chapters: 16 },
      { id: "Luke", name: "Luke", chapters: 24 },
      { id: "John", name: "John", chapters: 21 },
      { id: "Acts", name: "Acts", chapters: 28 },
      { id: "Romans", name: "Romans", chapters: 16 },
      { id: "1Corinthians", name: "1 Corinthians", chapters: 16 },
      { id: "2Corinthians", name: "2 Corinthians", chapters: 13 },
      { id: "Galatians", name: "Galatians", chapters: 6 }
    ];
    
    res.status(200).json(books);
  });
  
  app.get("/api/bible/content/:version/:book/:chapter", (req: Request, res: Response) => {
    const { book, chapter } = req.params;
    
    // For demonstration, we'll create a sample chapter
    const verses = [];
    // Number of verses depends on the book and chapter
    const verseCount = chapter === "1" && book === "Genesis" ? 31 : 25;
    
    for (let i = 1; i <= verseCount; i++) {
      verses.push({
        verse: i,
        text: `This is verse ${i} of ${book} chapter ${chapter}. This would be the actual Bible text in a production environment.`
      });
    }
    
    // Sample for Genesis 1:1
    if (book === "Genesis" && chapter === "1") {
      verses[0] = {
        verse: 1,
        text: "In the beginning God created the heavens and the earth."
      };
    }
    
    const content = {
      book,
      chapter: parseInt(chapter),
      verses
    };
    
    res.status(200).json(content);
  });
  
  app.get("/api/bible/search", (req: Request, res: Response) => {
    const { q, version } = req.query;
    
    if (!q || typeof q !== 'string' || q.length < 3) {
      return res.status(400).json({ error: "Search query must be at least 3 characters" });
    }
    
    // For demonstration, return sample search results
    const results = [
      {
        reference: "John 3:16",
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
      },
      {
        reference: "Genesis 1:1",
        text: "In the beginning God created the heavens and the earth."
      },
      {
        reference: "Psalm 23:1",
        text: "The Lord is my shepherd, I lack nothing."
      },
      {
        reference: "Matthew 5:16",
        text: "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
      }
    ];
    
    res.status(200).json({ query: q, version, results });
  });
  
  // Scripture memorization endpoints
  app.get("/api/scripture/progress", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Return sample scripture progress data
    const scriptures = [
      {
        id: 1,
        userId: req.session.userId,
        scriptureReference: "John 3:16",
        content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        memorized: true,
        progress: 100,
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        userId: req.session.userId,
        scriptureReference: "Psalm 23:1",
        content: "The Lord is my shepherd, I lack nothing.",
        memorized: false,
        progress: 60,
        completedAt: null,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        userId: req.session.userId,
        scriptureReference: "Proverbs 3:5-6",
        content: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        memorized: false,
        progress: 25,
        completedAt: null,
        createdAt: new Date().toISOString()
      }
    ];
    
    res.status(200).json(scriptures);
  });
  
  app.put("/api/scripture/progress/:id", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const { id } = req.params;
    const { progress, memorized } = req.body;
    
    // In a real app, this would update the database
    // For now, just return success
    res.status(200).json({ 
      id: parseInt(id), 
      progress, 
      memorized,
      userId: req.session.userId 
    });
  });
  
  // Prayer Journal endpoints
  app.get("/api/prayer-journal", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    // Return sample prayer journal entries
    const entries = [
      {
        id: 1,
        userId: req.session.userId,
        title: "My Prayer for Family",
        content: "Dear God, please watch over my family today. Help us to be kind to one another and to show love in everything we do. Thank you for blessing us with each other.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
      },
      {
        id: 2,
        userId: req.session.userId,
        title: "School Test Prayer",
        content: "Heavenly Father, I'm nervous about my test tomorrow. Please help me to remember what I've studied and to stay calm. Thank you for giving me the ability to learn and grow.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        id: 3,
        userId: req.session.userId,
        title: "Prayer for a Friend",
        content: "God, my friend Sarah is feeling sad today. Please comfort her and show her your love. Help me to be a good friend to her and to share your light.",
        createdAt: new Date().toISOString() // Today
      }
    ];
    
    res.status(200).json(entries);
  });
  
  app.post("/api/prayer-journal", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    
    // In a real app, this would save to the database
    // For now, return a mock success response
    res.status(201).json({
      id: Math.floor(Math.random() * 1000) + 10, // Random ID
      userId: req.session.userId,
      title,
      content,
      createdAt: new Date().toISOString()
    });
  });
  
  app.put("/api/prayer-journal/:id", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    
    // In a real app, this would update the database
    // For now, return success
    res.status(200).json({
      id: parseInt(id),
      userId: req.session.userId,
      title,
      content,
      updatedAt: new Date().toISOString()
    });
  });
  
  app.delete("/api/prayer-journal/:id", (req: Request, res: Response) => {
    // Check if user is authenticated
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const { id } = req.params;
    
    // In a real app, this would delete from the database
    // For now, return success
    res.status(200).json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
