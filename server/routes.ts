import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertActivitySchema, insertPostSchema, insertActivityRegistrationSchema, insertUserActivitySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Weather API endpoint
  app.get("/api/weather", async (req, res) => {
    // Mock weather data - in production this would call a real weather API
    const weatherData = {
      temperature: 28,
      condition: "แจ่มใส",
      icon: "fas fa-sun",
      lastUpdate: "5 นาทีที่แล้ว",
      humidity: 65,
      windSpeed: 8
    };
    res.json(weatherData);
  });

  // Park information endpoint
  app.get("/api/park-info", async (req, res) => {
    const parkInfo = {
      openTime: "05:00",
      closeTime: "22:00",
      parkingAvailable: 24,
      parkingTotal: 100,
      waterStations: 12,
      restrooms: 6,
      playgrounds: 3,
      currentRunners: 12,
      facilities: [
        { type: "parking", count: 24, total: 100 },
        { type: "water", count: 12 },
        { type: "restroom", count: 6 },
        { type: "playground", count: 3 }
      ]
    };
    res.json(parkInfo);
  });

  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivity(req.params.id);
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // Posts endpoints  
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const validatedData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.patch("/api/posts/:id/like", async (req, res) => {
    try {
      const { likes } = req.body;
      const post = await storage.updatePostLikes(req.params.id, likes);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post likes" });
    }
  });

  // Activity registration endpoints
  app.post("/api/activities/:id/register", async (req, res) => {
    try {
      const { userId } = req.body;
      const registrationData = {
        userId,
        activityId: req.params.id
      };
      const validatedData = insertActivityRegistrationSchema.parse(registrationData);
      const registration = await storage.registerForActivity(validatedData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register for activity" });
    }
  });

  app.delete("/api/activities/:id/register", async (req, res) => {
    try {
      const { userId } = req.body;
      const success = await storage.unregisterFromActivity(userId, req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Registration not found" });
      }
      res.json({ message: "Successfully unregistered" });
    } catch (error) {
      res.status(500).json({ message: "Failed to unregister from activity" });
    }
  });

  app.get("/api/users/:id/registrations", async (req, res) => {
    try {
      const registrations = await storage.getUserRegistrations(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user registrations" });
    }
  });

  // User activity tracking endpoints
  app.get("/api/users/:id/activities", async (req, res) => {
    try {
      const userActivities = await storage.getUserActivities(req.params.id);
      res.json(userActivities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user activities" });
    }
  });

  app.post("/api/users/:id/activities", async (req, res) => {
    try {
      const validatedData = insertUserActivitySchema.parse({
        ...req.body,
        userId: req.params.id
      });
      const userActivity = await storage.createUserActivity(validatedData);
      res.status(201).json(userActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user activity" });
    }
  });

  // Community stats endpoint
  app.get("/api/community/stats", async (req, res) => {
    try {
      const stats = {
        totalMembers: 1247,
        monthlyActivities: 156,
        todayRunners: 89
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch community stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
