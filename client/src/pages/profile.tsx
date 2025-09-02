import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mockUser, mockUserActivities, mockAchievements } from "@/lib/mock-data";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const formatActivityType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      running: "วิ่ง",
      cycling: "ปั่นจักรยาน", 
      yoga: "โยคะ"
    };
    return typeMap[type] || type;
  };

  const getActivityIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      running: "fas fa-running text-green-500",
      cycling: "fas fa-biking text-secondary",
      yoga: "fas fa-om text-accent"
    };
    return iconMap[type] || "fas fa-activity";
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return "วันนี้";
    if (date.toDateString() === yesterday.toDateString()) return "เมื่อวาน";
    
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffDays} วันที่แล้ว`;
  };

  return (
    <div className="px-6 py-6 pb-32">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={mockUser.profileImage!} 
            alt={mockUser.name} 
            className="w-20 h-20 rounded-full border-4 border-white" 
            data-testid="img-profile-avatar"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold" data-testid="text-user-name">{mockUser.name}</h2>
            <p className="text-white/80" data-testid="text-member-since">สมาชิกตั้งแต่ {mockUser.createdAt ? new Date(mockUser.createdAt).toLocaleDateString('th-TH', { month: 'short', year: 'numeric' }) : 'ไม่ทราบ'}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs">นักวิ่งประจำ</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs" data-testid="text-user-level">ระดับ {mockUser.level}</span>
            </div>
          </div>
          <Button variant="secondary" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" data-testid="button-settings">
            <i className="fas fa-cog"></i>
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-total-runs">{mockUser.totalRuns}</div>
            <div className="text-white/80 text-sm">วิ่งทั้งหมด</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-total-distance">{Math.round((mockUser.totalDistance || 0) / 1000)}</div>
            <div className="text-white/80 text-sm">กม. สะสม</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-total-friends">{mockUser.totalFriends}</div>
            <div className="text-white/80 text-sm">เพื่อน</div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">กิจกรรมล่าสุด</h3>
        <div className="space-y-3">
          {mockUserActivities.map((activity, index) => (
            <Card key={activity.id} className="p-4" data-testid={`card-user-activity-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <i className={getActivityIcon(activity.activityType)}></i>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground" data-testid={`text-activity-type-${index}`}>
                      {formatActivityType(activity.activityType)}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-activity-date-${index}`}>
                      {activity.completedAt ? formatDate(new Date(activity.completedAt)) : 'ไม่ทราบ'} • {activity.completedAt ? new Date(activity.completedAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.distance ? (
                    <>
                      <p className="font-semibold text-card-foreground" data-testid={`text-activity-distance-${index}`}>
                        {(activity.distance / 1000).toFixed(1)} กม.
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-activity-duration-${index}`}>
                        {Math.floor(activity.duration / 60)}:{(activity.duration % 60).toString().padStart(2, '0')}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-card-foreground" data-testid={`text-activity-duration-${index}`}>{activity.duration} นาที</p>
                      <p className="text-sm text-muted-foreground">เข้าร่วม</p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">ความสำเร็จ</h3>
        <div className="grid grid-cols-4 gap-3">
          {mockAchievements.map((achievement) => (
            <Card key={achievement.id} className="p-3 text-center" data-testid={`card-achievement-${achievement.id}`}>
              <div className={`w-10 h-10 bg-${achievement.color}/10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                <i className={`${achievement.icon} text-${achievement.color}`}></i>
              </div>
              <p className="text-xs text-muted-foreground" data-testid={`text-achievement-name-${achievement.id}`}>{achievement.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Settings */}
      <div className="space-y-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-bell text-muted-foreground"></i>
              <span className="text-card-foreground">การแจ้งเตือน</span>
            </div>
            <Switch 
              checked={notificationsEnabled} 
              onCheckedChange={setNotificationsEnabled}
              data-testid="switch-notifications"
            />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-moon text-muted-foreground"></i>
              <span className="text-card-foreground">โหมดมืด</span>
            </div>
            <Switch 
              checked={darkModeEnabled} 
              onCheckedChange={setDarkModeEnabled}
              data-testid="switch-dark-mode"
            />
          </div>
        </Card>
        
        <Card 
          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors" 
          onClick={() => setLocation('/safety')}
          data-testid="card-privacy-settings"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-shield-alt text-muted-foreground"></i>
              <span className="text-card-foreground">ความปลอดภัย</span>
            </div>
            <i className="fas fa-chevron-right text-muted-foreground"></i>
          </div>
        </Card>
        
        <Card 
          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors" 
          onClick={() => setLocation('/help')}
          data-testid="card-help"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-question-circle text-muted-foreground"></i>
              <span className="text-card-foreground">ช่วยเหลือ</span>
            </div>
            <i className="fas fa-chevron-right text-muted-foreground"></i>
          </div>
        </Card>
      </div>
    </div>
  );
}
