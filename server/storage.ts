import { 
  type User, 
  type InsertUser, 
  type Activity, 
  type InsertActivity, 
  type Post, 
  type InsertPost, 
  type ActivityRegistration, 
  type InsertActivityRegistration,
  type UserActivity,
  type InsertUserActivity
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Activity operations
  getActivities(): Promise<Activity[]>;
  getActivity(id: string): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | undefined>;
  
  // Post operations
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePostLikes(id: string, likes: number): Promise<Post | undefined>;
  
  // Activity registration operations
  getActivityRegistrations(activityId: string): Promise<ActivityRegistration[]>;
  getUserRegistrations(userId: string): Promise<ActivityRegistration[]>;
  registerForActivity(registration: InsertActivityRegistration): Promise<ActivityRegistration>;
  unregisterFromActivity(userId: string, activityId: string): Promise<boolean>;
  
  // User activity tracking
  getUserActivities(userId: string): Promise<UserActivity[]>;
  createUserActivity(userActivity: InsertUserActivity): Promise<UserActivity>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private activities: Map<string, Activity>;
  private posts: Map<string, Post>;
  private activityRegistrations: Map<string, ActivityRegistration>;
  private userActivities: Map<string, UserActivity>;

  constructor() {
    this.users = new Map();
    this.activities = new Map();
    this.posts = new Map();
    this.activityRegistrations = new Map();
    this.userActivities = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      name: insertUser.name,
      email: insertUser.email,
      username: insertUser.username,
      profileImage: insertUser.profileImage || null,
      level: 1,
      totalRuns: 0,
      totalDistance: 0,
      totalFriends: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Activity operations
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(activity => activity.isActive);
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = {
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
      createdAt: new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }

  async updateActivity(id: string, updates: Partial<Activity>): Promise<Activity | undefined> {
    const activity = this.activities.get(id);
    if (!activity) return undefined;
    
    const updatedActivity = { ...activity, ...updates };
    this.activities.set(id, updatedActivity);
    return updatedActivity;
  }

  // Post operations
  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const post: Post = {
      id,
      content: insertPost.content,
      userId: insertPost.userId,
      imageUrl: insertPost.imageUrl || null,
      activityType: insertPost.activityType || null,
      distance: insertPost.distance || null,
      duration: insertPost.duration || null,
      likes: 0,
      comments: 0,
      createdAt: new Date()
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePostLikes(id: string, likes: number): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, likes };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  // Activity registration operations
  async getActivityRegistrations(activityId: string): Promise<ActivityRegistration[]> {
    return Array.from(this.activityRegistrations.values()).filter(
      reg => reg.activityId === activityId
    );
  }

  async getUserRegistrations(userId: string): Promise<ActivityRegistration[]> {
    return Array.from(this.activityRegistrations.values()).filter(
      reg => reg.userId === userId
    );
  }

  async registerForActivity(insertRegistration: InsertActivityRegistration): Promise<ActivityRegistration> {
    const id = randomUUID();
    const registration: ActivityRegistration = {
      ...insertRegistration,
      id,
      registeredAt: new Date()
    };
    this.activityRegistrations.set(id, registration);
    
    // Update activity participant count
    const activity = this.activities.get(insertRegistration.activityId);
    if (activity) {
      activity.currentParticipants = (activity.currentParticipants || 0) + 1;
      this.activities.set(activity.id, activity);
    }
    
    return registration;
  }

  async unregisterFromActivity(userId: string, activityId: string): Promise<boolean> {
    const registration = Array.from(this.activityRegistrations.values()).find(
      reg => reg.userId === userId && reg.activityId === activityId
    );
    
    if (!registration) return false;
    
    this.activityRegistrations.delete(registration.id);
    
    // Update activity participant count
    const activity = this.activities.get(activityId);
    if (activity && (activity.currentParticipants || 0) > 0) {
      activity.currentParticipants = (activity.currentParticipants || 0) - 1;
      this.activities.set(activity.id, activity);
    }
    
    return true;
  }

  // User activity tracking
  async getUserActivities(userId: string): Promise<UserActivity[]> {
    return Array.from(this.userActivities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => {
        const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
        const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
        return dateB - dateA;
      });
  }

  async createUserActivity(insertUserActivity: InsertUserActivity): Promise<UserActivity> {
    const id = randomUUID();
    const userActivity: UserActivity = {
      id,
      duration: insertUserActivity.duration,
      userId: insertUserActivity.userId,
      activityType: insertUserActivity.activityType,
      distance: insertUserActivity.distance || null,
      completedAt: new Date()
    };
    this.userActivities.set(id, userActivity);
    return userActivity;
  }
}

export const storage = new MemStorage();
