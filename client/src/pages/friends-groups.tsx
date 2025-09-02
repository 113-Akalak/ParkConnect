import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useState } from "react";

export default function FriendsGroups() {
  const [, setLocation] = useLocation();
  
  const suggestedFriends = [
    {
      id: "1",
      name: "มายด์",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      level: 4,
      activity: "วิ่งเช้า 6 โมง",
      commonInterests: ["วิ่ง", "โยคะ"],
      distance: "2.3 กม.",
      mutualFriends: 3,
      lastActive: "1 ชม."
    },
    {
      id: "2", 
      name: "เบล",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332622e?w=40&h=40&fit=crop&crop=face",
      level: 5,
      activity: "ปั่นจักรยานเย็น",
      commonInterests: ["ปั่นจักรยาน", "workshop"],
      distance: "1.8 กม.",
      mutualFriends: 5,
      lastActive: "30 นาที"
    },
    {
      id: "3",
      name: "พลอย",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", 
      level: 6,
      activity: "โยคะทุกวันเสาร์",
      commonInterests: ["โยคะ", "สุขภาพ"],
      distance: "0.5 กม.",
      mutualFriends: 7,
      lastActive: "15 นาที"
    }
  ];

  const runningGroups = [
    {
      id: "group-1",
      name: "Morning Runners Club",
      description: "กลุ่มคนรักการวิ่งเช้า พบกันทุกวันอังคาร-พฤหัส",
      members: 24,
      avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop",
      schedule: "อังคาร, พฤหัส 6:00",
      difficulty: "ปานกลาง",
      isJoined: true
    },
    {
      id: "group-2", 
      name: "เพื่อนปั่นสายชิล",
      description: "ปั่นจักรยานแบบผ่อนคลาย ชมวิวใกล้สวน",
      members: 15,
      avatar: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=60&h=60&fit=crop",
      schedule: "เสาร์-อาทิตย์ 17:00",
      difficulty: "ง่าย",
      isJoined: false
    },
    {
      id: "group-3",
      name: "โยคะครอบครัว",
      description: "โยคะสำหรับทุกวัย เหมาะกับครอบครัวที่มีเด็ก",
      members: 18,
      avatar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop",
      schedule: "อาทิตย์ 8:00",
      difficulty: "ง่าย", 
      isJoined: false
    }
  ];

  return (
    <div className="px-6 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation('/community')}
          data-testid="button-back-community"
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">เพื่อน & กลุ่ม</h1>
      </div>

      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="friends" data-testid="tab-friends">ค้นหาเพื่อน</TabsTrigger>
          <TabsTrigger value="groups" data-testid="tab-groups">กลุ่มกิจกรรม</TabsTrigger>
        </TabsList>

        <TabsContent value="friends">
          {/* Search Friends */}
          <div className="mb-6">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
              <Input 
                type="text" 
                placeholder="ค้นหาเพื่อนใหม่..." 
                className="pl-10"
                data-testid="input-search-friends"
              />
            </div>
          </div>

          {/* Filter by Activity */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {["ทั้งหมด", "วิ่ง", "ปั่นจักรยาน", "โยคะ", "ใกล้บ้าน"].map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                data-testid={`button-filter-${filter}`}
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Suggested Friends */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">เพื่อนที่แนะนำ</h3>
            <div className="space-y-4">
              {suggestedFriends.map((friend, index) => (
                <Card key={friend.id} className="p-4" data-testid={`card-suggested-friend-${index}`}>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-card-foreground" data-testid={`text-friend-name-${index}`}>
                          {friend.name}
                        </p>
                        <Badge variant="outline" className="text-xs" data-testid={`badge-friend-level-${index}`}>
                          ระดับ {friend.level}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2" data-testid={`text-friend-activity-${index}`}>
                        {friend.activity}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span data-testid={`text-friend-distance-${index}`}>
                          <i className="fas fa-map-marker-alt mr-1"></i> {friend.distance}
                        </span>
                        <span data-testid={`text-mutual-friends-${index}`}>
                          <i className="fas fa-user-friends mr-1"></i> {friend.mutualFriends} เพื่อนร่วม
                        </span>
                        <span data-testid={`text-friend-active-${index}`}>
                          <i className="fas fa-clock mr-1"></i> {friend.lastActive}
                        </span>
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        {friend.commonInterests.map((interest, interestIndex) => (
                          <Badge 
                            key={interestIndex} 
                            variant="secondary" 
                            className="text-xs"
                            data-testid={`badge-interest-${index}-${interestIndex}`}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" data-testid={`button-add-friend-${index}`}>
                        <i className="fas fa-user-plus mr-1"></i>
                        เพิ่มเพื่อน
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`button-view-profile-${index}`}>
                        ดูโปรไฟล์
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Find by Interests */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">ค้นหาตามความสนใจ</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "วิ่งระยะไกล", icon: "fas fa-running", members: 45 },
                { name: "ปั่นท่องเที่ยว", icon: "fas fa-biking", members: 28 },
                { name: "โยคะเช้า", icon: "fas fa-om", members: 32 },
                { name: "เดินออกกำลังกาย", icon: "fas fa-walking", members: 67 }
              ].map((interest, index) => (
                <Card 
                  key={index} 
                  className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  data-testid={`card-interest-${index}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`${interest.icon} text-primary`}></i>
                    <span className="font-medium text-card-foreground text-sm">{interest.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{interest.members} คน</p>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          {/* My Groups */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">กลุ่มของฉัน</h3>
            <div className="space-y-4">
              {runningGroups.filter(group => group.isJoined).map((group, index) => (
                <Card key={group.id} className="p-4" data-testid={`card-my-group-${index}`}>
                  <div className="flex items-center gap-4">
                    <img 
                      src={group.avatar} 
                      alt={group.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-card-foreground" data-testid={`text-my-group-name-${index}`}>
                          {group.name}
                        </h4>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          สมาชิก
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span><i className="fas fa-users mr-1"></i> {group.members} คน</span>
                        <span><i className="fas fa-calendar mr-1"></i> {group.schedule}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-view-my-group-${index}`}>
                      ดูกลุ่ม
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommended Groups */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">กลุ่มแนะนำ</h3>
            <div className="space-y-4">
              {runningGroups.filter(group => !group.isJoined).map((group, index) => (
                <Card key={group.id} className="p-4" data-testid={`card-recommended-group-${index}`}>
                  <div className="flex items-start gap-4">
                    <img 
                      src={group.avatar} 
                      alt={group.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-card-foreground" data-testid={`text-group-name-${index}`}>
                          {group.name}
                        </h4>
                        <Badge variant="outline" data-testid={`badge-group-difficulty-${index}`}>
                          {group.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3" data-testid={`text-group-description-${index}`}>
                        {group.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span data-testid={`text-group-members-${index}`}>
                          <i className="fas fa-users mr-1"></i> {group.members} สมาชิก
                        </span>
                        <span data-testid={`text-group-schedule-${index}`}>
                          <i className="fas fa-calendar mr-1"></i> {group.schedule}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" data-testid={`button-join-group-${index}`}>
                          <i className="fas fa-user-plus mr-1"></i>
                          เข้าร่วมกลุ่ม
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-view-group-${index}`}>
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Create Group */}
          <Card className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50 transition-colors" data-testid="card-create-group">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-plus text-primary text-xl"></i>
              </div>
              <h4 className="font-semibold text-card-foreground mb-1">สร้างกลุ่มใหม่</h4>
              <p className="text-sm text-muted-foreground">รวมเพื่อนที่มีความสนใจเหมือนกัน</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] px-6">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
          <div className="flex gap-3">
            <Button className="flex-1" data-testid="button-find-nearby">
              <i className="fas fa-map-marker-alt mr-2"></i>
              หาคนใกล้เคียง
            </Button>
            <Button variant="outline" className="flex-1" data-testid="button-create-meetup">
              <i className="fas fa-calendar-plus mr-2"></i>
              นัดเจอ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}