import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockActivities } from "@/lib/mock-data";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Activities() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  
  const categories = ["ทั้งหมด", "วิ่ง", "โยคะ", "ปั่นจักรยาน", "เวิร์คช็อป"];
  
  const filteredActivities = selectedCategory === "ทั้งหมด" 
    ? mockActivities 
    : mockActivities.filter(activity => {
        const categoryMap: { [key: string]: string } = {
          "วิ่ง": "running",
          "โยคะ": "yoga", 
          "ปั่นจักรยาน": "cycling",
          "เวิร์คช็อป": "workshop"
        };
        return activity.type === categoryMap[selectedCategory];
      });

  const todayActivity = mockActivities.find(activity => {
    const today = new Date();
    const activityDate = new Date(activity.dateTime);
    return activityDate.toDateString() === today.toDateString();
  });

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "วันนี้";
    if (date.toDateString() === tomorrow.toDateString()) return "พรุ่งนี้";
    
    return date.toLocaleDateString('th-TH', { weekday: 'long' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="px-6 py-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">กิจกรรม & อีเวนต์</h1>
        <Button size="sm" data-testid="button-create-activity">
          <i className="fas fa-plus mr-1"></i> สร้างกิจกรรม
        </Button>
      </div>

      {/* Activity Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
            data-testid={`button-category-${category}`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Today's Featured Activity */}
      {todayActivity && (
        <div className="activity-gradient rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">วันนี้</Badge>
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">แนะนำ</Badge>
          </div>
          <h2 className="text-xl font-bold mb-2" data-testid="text-featured-title">{todayActivity.title}</h2>
          <p className="text-white/80 mb-4" data-testid="text-featured-description">{todayActivity.description}</p>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <i className="fas fa-clock"></i>
              <span data-testid="text-featured-time">{formatTime(new Date(todayActivity.dateTime))} - {formatTime(new Date(new Date(todayActivity.dateTime).getTime() + todayActivity.duration * 60000))}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-map-marker-alt"></i>
              <span data-testid="text-featured-location">{todayActivity.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="fas fa-users"></i>
              <span data-testid="text-featured-participants">{todayActivity.currentParticipants}/{todayActivity.maxParticipants} คน</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="bg-white text-accent hover:bg-white/90 flex-1" data-testid="button-register-featured">
              ลงทะเบียนเลย
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" data-testid="button-share-featured">
              <i className="fas fa-share-alt"></i>
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" data-testid="button-favorite-featured">
              <i className="fas fa-heart"></i>
            </Button>
          </div>
        </div>
      )}

      {/* Upcoming Activities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">กิจกรรมสัปดาห์นี้</h3>
        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <Card key={activity.id} className="p-4" data-testid={`card-activity-${index}`}>
              <div className="flex items-start gap-4">
                <div className="text-center min-w-[60px]">
                  <div className="text-primary text-sm font-medium" data-testid={`text-activity-date-${index}`}>
                    {formatDate(new Date(activity.dateTime))}
                  </div>
                  <div className="text-2xl font-bold text-card-foreground" data-testid={`text-activity-day-${index}`}>
                    {new Date(activity.dateTime).getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground" data-testid={`text-activity-month-${index}`}>
                    {new Date(activity.dateTime).toLocaleDateString('th-TH', { month: 'short' })}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-card-foreground" data-testid={`text-activity-title-${index}`}>{activity.title}</h4>
                    <Badge variant={activity.price === 0 ? "secondary" : "destructive"} data-testid={`badge-activity-price-${index}`}>
                      {activity.price === 0 ? "ฟรี" : `${activity.price}฿`}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`text-activity-description-${index}`}>{activity.description}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span data-testid={`text-activity-time-${index}`}><i className="fas fa-clock mr-1"></i> {formatTime(new Date(activity.dateTime))}</span>
                    <span data-testid={`text-activity-participants-${index}`}><i className="fas fa-users mr-1"></i> {activity.currentParticipants}/{activity.maxParticipants} คน</span>
                    <span data-testid={`text-activity-type-${index}`}>
                      <i className={`fas ${activity.type === 'running' ? 'fa-running' : activity.type === 'cycling' ? 'fa-biking' : activity.type === 'yoga' ? 'fa-om' : 'fa-graduation-cap'} mr-1`}></i>
                      {activity.type === 'running' ? 'วิ่ง' : activity.type === 'cycling' ? 'ปั่น' : activity.type === 'yoga' ? 'โยคะ' : 'เวิร์คช็อป'}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation(`/activities/${activity.id}`)}
                  data-testid={`button-join-activity-${index}`}
                >
                  {activity.type === 'workshop' ? 'ลงทะเบียน' : 'เข้าร่วม'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* My Registered Activities */}
      {todayActivity && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">กิจกรรมที่คุณลงทะเบียน</h3>
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 activity-gradient rounded-xl flex items-center justify-center">
                <i className="fas fa-om text-white"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-card-foreground" data-testid="text-registered-activity-title">{todayActivity.title}</h4>
                <p className="text-sm text-muted-foreground" data-testid="text-registered-activity-time">
                  วันนี้ • {formatTime(new Date(todayActivity.dateTime))} - {formatTime(new Date(new Date(todayActivity.dateTime).getTime() + todayActivity.duration * 60000))}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary" data-testid="text-registration-status">ลงทะเบียนแล้ว</div>
                <div className="text-xs text-muted-foreground" data-testid="text-time-remaining">อีก 8 ชั่วโมง</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" data-testid="button-cancel-registration">ยกเลิก</Button>
              <Button 
                size="sm" 
                className="flex-1" 
                onClick={() => setLocation(`/activities/${todayActivity.id}`)}
                data-testid="button-view-details"
              >
                ดูรายละเอียด
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
