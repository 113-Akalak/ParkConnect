import { Activity, Post, User, UserActivity } from "@shared/schema";

export const mockUser: User = {
  id: "user-1",
  username: "praew",
  email: "praew@example.com",
  name: "แพรว วงศ์สุข",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&h=80",
  level: 5,
  totalRuns: 127,
  totalDistance: 856000, // 856 km in meters
  totalFriends: 42,
  createdAt: new Date("2024-01-15"),
};

export const mockWeather = {
  temperature: 28,
  condition: "แจ่มใส",
  icon: "fas fa-sun",
  lastUpdate: "5 นาทีที่แล้ว"
};

export const mockParkInfo = {
  openTime: "05:00",
  closeTime: "22:00",
  parkingAvailable: 24,
  parkingTotal: 100,
  waterStations: 12,
  restrooms: 6,
  playgrounds: 3,
  currentRunners: 12
};

export const mockActivities: Activity[] = [
  {
    id: "activity-1",
    title: "โยคะสุขภาพในสวน",
    description: "ผ่อนคลายร่างกายและจิตใจท่ามกลางธรรมชาติ พร้อมครูโยคะมืออาชีพ",
    type: "yoga",
    dateTime: new Date("2025-03-14T18:00:00"),
    duration: 90,
    location: "ลานหญ้าใหญ่",
    maxParticipants: 20,
    currentParticipants: 15,
    price: 0,
    difficulty: "easy",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "activity-2",
    title: "Morning Run 5K",
    description: "วิ่งเช้าสดชื่นร่วมกับเพื่อนใหม่",
    type: "running",
    dateTime: new Date("2025-03-15T06:00:00"),
    duration: 35,
    location: "เส้นทางวิ่งหลัก",
    maxParticipants: 30,
    currentParticipants: 25,
    price: 0,
    difficulty: "medium",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "activity-3",
    title: "เวิร์คช็อปสุขภาพครอบครัว",
    description: "เรียนรู้การดูแลสุขภาพแบบครอบครัว",
    type: "workshop",
    dateTime: new Date("2025-03-16T09:00:00"),
    duration: 120,
    location: "ศาลาอเนกประสงค์",
    maxParticipants: 15,
    currentParticipants: 12,
    price: 50,
    difficulty: "easy",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "activity-4",
    title: "ปั่นจักรยานท่องเที่ยว",
    description: "ปั่นชมความงามของสวนและแหล่งท่องเที่ยวใกล้เคียง",
    type: "cycling",
    dateTime: new Date("2025-03-17T16:00:00"),
    duration: 45,
    location: "ประตูทางเข้าหลัก",
    maxParticipants: 12,
    currentParticipants: 8,
    price: 0,
    difficulty: "medium",
    isActive: true,
    createdAt: new Date(),
  },
];

export const mockPosts: (Post & { user: User })[] = [
  {
    id: "post-1",
    userId: "user-2",
    content: "เสร็จแล้ว! วิ่ง 7K เช้านี้ รู้สึกสดชื่นมาก 🏃‍♀️✨ ใครมาวิ่งด้วยกันพรุ่งนี้มั้ยครับ?",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&h=200",
    activityType: "running",
    distance: 7200,
    duration: 35,
    likes: 23,
    comments: 5,
    createdAt: new Date("2025-03-14T07:15:00"),
    user: {
      id: "user-2",
      username: "jim",
      email: "jim@example.com",
      name: "จิม",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      level: 3,
      totalRuns: 89,
      totalDistance: 445000,
      totalFriends: 28,
      createdAt: new Date("2024-06-10"),
    }
  },
  {
    id: "post-2",
    userId: "user-3",
    content: "มีใครอยากมาปั่นจักรยานร่วมกันไหม? เตรียมจัดกลุ่มปั่นเย็นนี้ 🚴‍♂️",
    imageUrl: null,
    activityType: "cycling",
    distance: null,
    duration: null,
    likes: 15,
    comments: 8,
    createdAt: new Date("2025-03-14T13:00:00"),
    user: {
      id: "user-3",
      username: "tom",
      email: "tom@example.com",
      name: "ต้อม",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      level: 4,
      totalRuns: 156,
      totalDistance: 720000,
      totalFriends: 35,
      createdAt: new Date("2024-03-20"),
    }
  },
  {
    id: "post-3",
    userId: "user-4",
    content: "เช้านี้ฝึกโยคะที่ลานหญ้า บรรยากาศดีมาก ขอบคุณทุกคนที่มาร่วมกัน 🧘‍♀️💚",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=350&h=200",
    activityType: "yoga",
    distance: null,
    duration: 90,
    likes: 45,
    comments: 18,
    createdAt: new Date("2025-03-14T09:30:00"),
    user: {
      id: "user-4",
      username: "nan",
      email: "nan@example.com",
      name: "แนน",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      level: 6,
      totalRuns: 203,
      totalDistance: 1020000,
      totalFriends: 67,
      createdAt: new Date("2023-11-05"),
    }
  }
];

export const mockRunningRoutes = [
  {
    id: "route-1",
    name: "เส้นทางผู้เริ่มต้น",
    distance: 2.5,
    duration: 25,
    difficulty: "ง่าย",
    rating: 4,
    waterStations: 3,
    restrooms: 2,
    hasLighting: true,
    isShaded: false,
  },
  {
    id: "route-2",
    name: "เส้นทางจักรยาน",
    distance: 5.2,
    duration: 20,
    difficulty: "ปานกลาง",
    rating: 5,
    waterStations: 4,
    restrooms: 3,
    hasLighting: true,
    isShaded: true,
  }
];

export const mockUserActivities: UserActivity[] = [
  {
    id: "user-activity-1",
    userId: "user-1",
    activityType: "running",
    distance: 5200,
    duration: 26,
    completedAt: new Date("2025-03-14T06:30:00"),
  },
  {
    id: "user-activity-2",
    userId: "user-1",
    activityType: "yoga",
    distance: null,
    duration: 90,
    completedAt: new Date("2025-03-13T18:00:00"),
  },
  {
    id: "user-activity-3",
    userId: "user-1",
    activityType: "cycling",
    distance: 12800,
    duration: 45,
    completedAt: new Date("2025-03-11T16:30:00"),
  },
];

export const mockCommunityStats = {
  totalMembers: 1247,
  monthlyActivities: 156,
  todayRunners: 89,
};

export const mockAchievements = [
  { id: 1, name: "วิ่ง 100K", icon: "fas fa-medal", color: "yellow-500", unlocked: true },
  { id: 2, name: "Streak 30", icon: "fas fa-fire", color: "purple-500", unlocked: true },
  { id: 3, name: "ชาเลนจ์ 5", icon: "fas fa-trophy", color: "green-500", unlocked: true },
  { id: 4, name: "สุขภาพดี", icon: "fas fa-heart", color: "blue-500", unlocked: true },
];
