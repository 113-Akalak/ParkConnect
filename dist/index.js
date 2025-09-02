// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  activities;
  posts;
  activityRegistrations;
  userActivities;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.activities = /* @__PURE__ */ new Map();
    this.posts = /* @__PURE__ */ new Map();
    this.activityRegistrations = /* @__PURE__ */ new Map();
    this.userActivities = /* @__PURE__ */ new Map();
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = {
      id,
      name: insertUser.name,
      email: insertUser.email,
      username: insertUser.username,
      profileImage: insertUser.profileImage || null,
      level: 1,
      totalRuns: 0,
      totalDistance: 0,
      totalFriends: 0,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, user);
    return user;
  }
  // Activity operations
  async getActivities() {
    return Array.from(this.activities.values()).filter((activity) => activity.isActive);
  }
  async getActivity(id) {
    return this.activities.get(id);
  }
  async createActivity(insertActivity) {
    const id = randomUUID();
    const activity = {
      id,
      title: insertActivity.title,
      type: insertActivity.type,
      duration: insertActivity.duration,
      dateTime: insertActivity.dateTime,
      description: insertActivity.description,
      location: insertActivity.location,
      maxParticipants: insertActivity.maxParticipants,
      difficulty: insertActivity.difficulty,
      price: insertActivity.price || null,
      currentParticipants: 0,
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }
  async updateActivity(id, updates) {
    const activity = this.activities.get(id);
    if (!activity) return void 0;
    const updatedActivity = { ...activity, ...updates };
    this.activities.set(id, updatedActivity);
    return updatedActivity;
  }
  // Post operations
  async getPosts() {
    return Array.from(this.posts.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }
  async getPost(id) {
    return this.posts.get(id);
  }
  async createPost(insertPost) {
    const id = randomUUID();
    const post = {
      id,
      content: insertPost.content,
      userId: insertPost.userId,
      imageUrl: insertPost.imageUrl || null,
      activityType: insertPost.activityType || null,
      distance: insertPost.distance || null,
      duration: insertPost.duration || null,
      likes: 0,
      comments: 0,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.posts.set(id, post);
    return post;
  }
  async updatePostLikes(id, likes) {
    const post = this.posts.get(id);
    if (!post) return void 0;
    const updatedPost = { ...post, likes };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }
  // Activity registration operations
  async getActivityRegistrations(activityId) {
    return Array.from(this.activityRegistrations.values()).filter(
      (reg) => reg.activityId === activityId
    );
  }
  async getUserRegistrations(userId) {
    return Array.from(this.activityRegistrations.values()).filter(
      (reg) => reg.userId === userId
    );
  }
  async registerForActivity(insertRegistration) {
    const id = randomUUID();
    const registration = {
      ...insertRegistration,
      id,
      registeredAt: /* @__PURE__ */ new Date()
    };
    this.activityRegistrations.set(id, registration);
    const activity = this.activities.get(insertRegistration.activityId);
    if (activity) {
      activity.currentParticipants = (activity.currentParticipants || 0) + 1;
      this.activities.set(activity.id, activity);
    }
    return registration;
  }
  async unregisterFromActivity(userId, activityId) {
    const registration = Array.from(this.activityRegistrations.values()).find(
      (reg) => reg.userId === userId && reg.activityId === activityId
    );
    if (!registration) return false;
    this.activityRegistrations.delete(registration.id);
    const activity = this.activities.get(activityId);
    if (activity && (activity.currentParticipants || 0) > 0) {
      activity.currentParticipants = (activity.currentParticipants || 0) - 1;
      this.activities.set(activity.id, activity);
    }
    return true;
  }
  // User activity tracking
  async getUserActivities(userId) {
    return Array.from(this.userActivities.values()).filter((activity) => activity.userId === userId).sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return dateB - dateA;
    });
  }
  async createUserActivity(insertUserActivity) {
    const id = randomUUID();
    const userActivity = {
      id,
      duration: insertUserActivity.duration,
      userId: insertUserActivity.userId,
      activityType: insertUserActivity.activityType,
      distance: insertUserActivity.distance || null,
      completedAt: /* @__PURE__ */ new Date()
    };
    this.userActivities.set(id, userActivity);
    return userActivity;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  level: integer("level").default(1),
  totalRuns: integer("total_runs").default(0),
  totalDistance: integer("total_distance").default(0),
  // in meters
  totalFriends: integer("total_friends").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  // running, cycling, yoga, workshop
  dateTime: timestamp("date_time").notNull(),
  duration: integer("duration").notNull(),
  // in minutes
  location: text("location").notNull(),
  maxParticipants: integer("max_participants").notNull(),
  currentParticipants: integer("current_participants").default(0),
  price: integer("price").default(0),
  // in Thai Baht
  difficulty: text("difficulty").notNull(),
  // easy, medium, hard
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  activityType: text("activity_type"),
  // running, cycling, yoga
  distance: integer("distance"),
  // in meters
  duration: integer("duration"),
  // in minutes
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  createdAt: timestamp("created_at").defaultNow()
});
var activityRegistrations = pgTable("activity_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  activityId: varchar("activity_id").notNull().references(() => activities.id),
  registeredAt: timestamp("registered_at").defaultNow()
});
var userActivities = pgTable("user_activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(),
  // running, cycling, yoga
  distance: integer("distance"),
  // in meters for running/cycling
  duration: integer("duration").notNull(),
  // in minutes
  completedAt: timestamp("completed_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
  currentParticipants: true
});
var insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  likes: true,
  comments: true
});
var insertActivityRegistrationSchema = createInsertSchema(activityRegistrations).omit({
  id: true,
  registeredAt: true
});
var insertUserActivitySchema = createInsertSchema(userActivities).omit({
  id: true,
  completedAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/weather", async (req, res) => {
    const weatherData = {
      temperature: 28,
      condition: "\u0E41\u0E08\u0E48\u0E21\u0E43\u0E2A",
      icon: "fas fa-sun",
      lastUpdate: "5 \u0E19\u0E32\u0E17\u0E35\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
      humidity: 65,
      windSpeed: 8
    };
    res.json(weatherData);
  });
  app2.get("/api/park-info", async (req, res) => {
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
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities2 = await storage.getActivities();
      res.json(activities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  app2.get("/api/activities/:id", async (req, res) => {
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
  app2.post("/api/activities", async (req, res) => {
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
  app2.get("/api/posts", async (req, res) => {
    try {
      const posts2 = await storage.getPosts();
      res.json(posts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  app2.post("/api/posts", async (req, res) => {
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
  app2.patch("/api/posts/:id/like", async (req, res) => {
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
  app2.post("/api/activities/:id/register", async (req, res) => {
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
  app2.delete("/api/activities/:id/register", async (req, res) => {
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
  app2.get("/api/users/:id/registrations", async (req, res) => {
    try {
      const registrations = await storage.getUserRegistrations(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user registrations" });
    }
  });
  app2.get("/api/users/:id/activities", async (req, res) => {
    try {
      const userActivities2 = await storage.getUserActivities(req.params.id);
      res.json(userActivities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user activities" });
    }
  });
  app2.post("/api/users/:id/activities", async (req, res) => {
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
  app2.get("/api/community/stats", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "4000", 10);
  server.listen({
    port,
    host: "127.0.0.1",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
