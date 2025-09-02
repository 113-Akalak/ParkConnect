import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "wouter";
import { mockActivities, mockUser } from "@/lib/mock-data";

interface ActivityDetailProps {
  params: {
    id: string;
  };
}

export default function ActivityDetail({ params }: ActivityDetailProps) {
  const [, setLocation] = useLocation();
  
  // Find activity by ID (in real app, this would come from API)
  const activity = mockActivities.find(a => a.id === params.id) || mockActivities[0];
  
  const isRegistered = true; // Mock registration status
  const registeredUsers = [
    { id: "1", name: "จิม", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
    { id: "2", name: "แนน", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" },
    { id: "3", name: "ต้อม", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
    { id: "4", name: "มินท์", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" },
  ];

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "วันนี้";
    if (date.toDateString() === tomorrow.toDateString()) return "พรุ่งนี้";
    
    return date.toLocaleDateString('th-TH', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  const getActivityTypeIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      running: "fas fa-running",
      cycling: "fas fa-biking", 
      yoga: "fas fa-om",
      workshop: "fas fa-graduation-cap"
    };
    return iconMap[type] || "fas fa-calendar";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colorMap: { [key: string]: string } = {
      easy: "text-green-500 bg-green-100 dark:bg-green-900",
      medium: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
      hard: "text-red-500 bg-red-100 dark:bg-red-900"
    };
    return colorMap[difficulty] || "text-gray-500 bg-gray-100";
  };

  return (
    <div className="pb-32">
      {/* Header with Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary to-secondary">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=390&h=256" 
          alt={activity.title}
          className="w-full h-full object-cover"
          data-testid="img-activity-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
          onClick={() => setLocation('/activities')}
          data-testid="button-back-activities"
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        
        {/* Share & Favorite */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
            data-testid="button-share-activity"
          >
            <i className="fas fa-share-alt"></i>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40"
            data-testid="button-favorite-activity"
          >
            <i className="fas fa-heart"></i>
          </Button>
        </div>
        
        {/* Activity Icon & Type */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <i className={`${getActivityTypeIcon(activity.type)} text-white text-xl`}></i>
            </div>
            <div>
              <Badge className={`${getDifficultyColor(activity.difficulty)} font-medium`} data-testid="badge-difficulty">
                ระดับ{activity.difficulty === 'easy' ? 'ง่าย' : activity.difficulty === 'medium' ? 'ปานกลาง' : 'ยาก'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Activity Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2" data-testid="text-activity-title">{activity.title}</h1>
          <p className="text-muted-foreground mb-4" data-testid="text-activity-description">{activity.description}</p>
          
          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-calendar text-primary"></i>
                <span className="text-sm font-medium text-card-foreground">วันที่</span>
              </div>
              <p className="font-semibold text-card-foreground" data-testid="text-activity-date">
                {formatDate(new Date(activity.dateTime))}
              </p>
              <p className="text-sm text-muted-foreground" data-testid="text-activity-time">
                {formatTime(new Date(activity.dateTime))} - {formatTime(new Date(new Date(activity.dateTime).getTime() + activity.duration * 60000))}
              </p>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span className="text-sm font-medium text-card-foreground">สถานที่</span>
              </div>
              <p className="font-semibold text-card-foreground" data-testid="text-activity-location">{activity.location}</p>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-primary" data-testid="button-view-on-map">
                ดูในแผนที่
              </Button>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-clock text-primary"></i>
                <span className="text-sm font-medium text-card-foreground">ระยะเวลา</span>
              </div>
              <p className="font-semibold text-card-foreground" data-testid="text-activity-duration">{activity.duration} นาที</p>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <i className="fas fa-users text-primary"></i>
                <span className="text-sm font-medium text-card-foreground">ผู้เข้าร่วม</span>
              </div>
              <p className="font-semibold text-card-foreground" data-testid="text-activity-participants">
                {activity.currentParticipants || 0}/{activity.maxParticipants} คน
              </p>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div 
                  className="bg-primary rounded-full h-2" 
                  style={{ width: `${((activity.currentParticipants || 0) / activity.maxParticipants) * 100}%` }}
                  data-testid="progress-participants"
                ></div>
              </div>
            </Card>
          </div>
          
          {/* Price */}
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-tag text-primary"></i>
                <span className="font-medium text-card-foreground">ค่าใช้จ่าย</span>
              </div>
              <div className="text-right">
                {activity.price === 0 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" data-testid="badge-free">
                    ฟรี
                  </Badge>
                ) : (
                  <span className="text-xl font-bold text-card-foreground" data-testid="text-activity-price">{activity.price} บาท</span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Registered Participants */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">ผู้เข้าร่วม ({registeredUsers.length} คน)</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {registeredUsers.map((user, index) => (
              <div key={user.id} className="flex flex-col items-center min-w-[60px]" data-testid={`participant-${index}`}>
                <Avatar className="w-12 h-12 mb-1">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-center text-muted-foreground">{user.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center min-w-[60px]">
              <div className="w-12 h-12 border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center mb-1">
                <i className="fas fa-plus text-muted-foreground"></i>
              </div>
              <span className="text-xs text-center text-muted-foreground">เชิญเพื่อน</span>
            </div>
          </div>
        </div>

        {/* What to Bring / Requirements */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">สิ่งที่ต้องเตรียม</h3>
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="text-card-foreground">เสื้อผ้าสำหรับออกกำลังกาย</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="text-card-foreground">ขวดน้ำส่วนตัว</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span className="text-card-foreground">ผ้าเช็ดหน้า</span>
              </div>
              {activity.type === 'yoga' && (
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-green-500"></i>
                  <span className="text-card-foreground">เสื่อโยคะ (หรือจะมีให้ยืม)</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Instructor/Organizer */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">ผู้ดำเนินการ</h3>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=48&h=48&fit=crop&crop=face" alt="ครูโยคะ" />
                <AvatarFallback>ครู</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-card-foreground" data-testid="text-instructor-name">
                  {activity.type === 'yoga' ? 'ครูปิ่น - โยคะเซราปี' : 
                   activity.type === 'running' ? 'โค้ชเอ - นักวิ่งมาราธอน' :
                   activity.type === 'cycling' ? 'พี่บิ๊ก - ไซคลิสต์' : 'ทีมงานสวน'}
                </p>
                <p className="text-sm text-muted-foreground">ประสบการณ์ 5+ ปี</p>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-view-instructor">
                ดูโปรไฟล์
              </Button>
            </div>
          </Card>
        </div>

        {/* Rules & Guidelines */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">กฎและข้อแนะนำ</h3>
          <Card className="p-4">
            <div className="space-y-2 text-sm text-card-foreground">
              <p>• มาถึงก่อนเวลา 10 นาที</p>
              <p>• สวมใส่เสื้อผ้าเหมาะสมสำหรับกิจกรรม</p>
              <p>• ปฏิบัติตามคำแนะนำของผู้ดำเนินการ</p>
              <p>• หากมีอาการป่วยให้แจ้งผู้ดำเนินการ</p>
              {activity.type === 'running' && <p>• ควรอุ่นร่างกายก่อนวิ่ง</p>}
              {activity.type === 'yoga' && <p>• ไม่ควรรับประทานอาหารมื้อหนักก่อนเข้าร่วม 2 ชั่วโมง</p>}
            </div>
          </Card>
        </div>

        {/* Weather Info for Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">สภาพอากาศช่วงกิจกรรม</h3>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-sun text-2xl text-yellow-500"></i>
                <div>
                  <p className="font-semibold text-card-foreground" data-testid="text-weather-for-activity">28°C • แจ่มใส</p>
                  <p className="text-sm text-muted-foreground">เหมาะสำหรับกิจกรรมกลางแจ้ง</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setLocation('/weather')} data-testid="button-view-full-weather">
                ดูเพิ่มเติม
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] px-6">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-lg">
          {isRegistered ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <i className="fas fa-check-circle"></i>
                <span className="font-medium" data-testid="text-registration-confirmed">คุณลงทะเบียนแล้ว</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" data-testid="button-cancel-registration">
                  ยกเลิกการลงทะเบียน
                </Button>
                <Button className="flex-1" data-testid="button-add-to-calendar">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  เพิ่มในปฏิทิน
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-card-foreground">
                  {activity.price === 0 ? 'ฟรี' : `${activity.price} บาท`}
                </span>
                <span className="text-sm text-muted-foreground" data-testid="text-spots-remaining">
                  เหลือที่ว่าง {activity.maxParticipants - (activity.currentParticipants || 0)} ที่
                </span>
              </div>
              <Button className="w-full" size="lg" data-testid="button-register-now">
                <i className="fas fa-user-plus mr-2"></i>
                ลงทะเบียนเลย
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}