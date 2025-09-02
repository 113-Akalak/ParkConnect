import { Card } from "@/components/ui/card";
import { mockUser, mockWeather, mockParkInfo, mockActivities, mockPosts } from "@/lib/mock-data";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const todayActivity = mockActivities.find(activity => {
    const today = new Date();
    const activityDate = new Date(activity.dateTime);
    return activityDate.toDateString() === today.toDateString();
  });

  const recentPost = mockPosts[0];

  return (
    <div className="pb-32">
      {/* Hero Section with Weather */}
      <div className="weather-gradient px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-greeting">สวัสดี {mockUser.name.split(' ')[0]}! 👋</h1>
            <p className="text-white/80" data-testid="text-daily-message">วันนี้เป็นวันที่ดีสำหรับออกกำลังกาย</p>
          </div>
          <img 
            src={mockUser.profileImage!} 
            alt={mockUser.name} 
            className="w-12 h-12 rounded-full border-2 border-white" 
            data-testid="img-user-avatar"
          />
        </div>
        
        <div 
          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 cursor-pointer hover:bg-white/30 transition-colors"
          onClick={() => setLocation('/weather')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className={`${mockWeather.icon} text-2xl`} data-testid="icon-weather"></i>
              <div>
                <p className="text-lg font-semibold" data-testid="text-temperature">{mockWeather.temperature}°C</p>
                <p className="text-sm text-white/80" data-testid="text-weather-condition">{mockWeather.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80" data-testid="text-park-hours">เปิด: {mockParkInfo.openTime} - {mockParkInfo.closeTime}</p>
              <p className="text-xs text-white/60" data-testid="text-weather-update">{mockWeather.lastUpdate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">การเข้าใช้ด่วน</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => setLocation('/map')}
            data-testid="card-navigate-map"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <i className="fas fa-route text-primary"></i>
            </div>
            <h3 className="font-semibold text-card-foreground">แผนที่สวน</h3>
            <p className="text-sm text-muted-foreground">เส้นทางวิ่ง และสิ่งอำนวยความสะดวก</p>
          </Card>
          
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => setLocation('/facilities')}
            data-testid="card-parking-info"
          >
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
              <i className="fas fa-parking text-secondary"></i>
            </div>
            <h3 className="font-semibold text-card-foreground">ที่จอดรถ</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-parking-available">เหลือ {mockParkInfo.parkingAvailable} ที่</p>
          </Card>
          
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => setLocation('/activities')}
            data-testid="card-view-activities"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-3">
              <i className="fas fa-calendar text-accent"></i>
            </div>
            <h3 className="font-semibold text-card-foreground">กิจกรรมวันนี้</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-today-activity">
              {todayActivity ? `${todayActivity.title} ${new Date(todayActivity.dateTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}` : 'ไม่มีกิจกรรม'}
            </p>
          </Card>
          
          <Card 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow" 
            onClick={() => setLocation('/community')}
            data-testid="card-find-friends"
          >
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center mb-3">
              <i className="fas fa-users text-green-500"></i>
            </div>
            <h3 className="font-semibold text-card-foreground">หาเพื่อนวิ่ง</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-current-runners">{mockParkInfo.currentRunners} คนกำลังวิ่งอยู่</p>
          </Card>
        </div>
      </div>

      {/* Today's Activities */}
      {todayActivity && (
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">กิจกรรมแนะนำ</h2>
            <button 
              className="text-primary text-sm font-medium"
              onClick={() => setLocation('/activities')}
              data-testid="button-view-all-activities"
            >
              ดูทั้งหมด
            </button>
          </div>
          
          <div className="activity-gradient rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold" data-testid="text-featured-activity-title">{todayActivity.title}</h3>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-xs" data-testid="text-activity-time">
                {new Date(todayActivity.dateTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-white/80 text-sm mb-3" data-testid="text-activity-description">{todayActivity.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="fas fa-user-friends text-sm"></i>
                <span className="text-sm" data-testid="text-activity-participants">{todayActivity.currentParticipants}/{todayActivity.maxParticipants} คน</span>
              </div>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium" data-testid="button-register-activity">
                ลงทะเบียน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Community Posts */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">กิจกรรมจากเพื่อน</h2>
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={recentPost.user.profileImage!} 
                alt={recentPost.user.name} 
                className="w-10 h-10 rounded-full" 
                data-testid="img-post-user-avatar"
              />
              <div className="flex-1">
                <p className="font-medium text-card-foreground" data-testid="text-post-user-name">{recentPost.user.name}</p>
                <p className="text-xs text-muted-foreground" data-testid="text-post-time">15 นาทีที่แล้ว</p>
              </div>
              <i className="fas fa-heart text-red-500" data-testid="icon-post-liked"></i>
            </div>
            {recentPost.imageUrl && (
              <img 
                src={recentPost.imageUrl} 
                alt="วิ่งเช้าในสวน" 
                className="w-full h-40 object-cover rounded-xl mb-3" 
                data-testid="img-post-content"
              />
            )}
            <p className="text-sm text-card-foreground" data-testid="text-post-content">{recentPost.content}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span data-testid="text-post-likes"><i className="fas fa-heart mr-1"></i> {recentPost.likes}</span>
              <span data-testid="text-post-comments"><i className="fas fa-comment mr-1"></i> {recentPost.comments}</span>
              <span data-testid="button-post-share"><i className="fas fa-share mr-1"></i> แชร์</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
