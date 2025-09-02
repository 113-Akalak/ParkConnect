import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockPosts, mockCommunityStats } from "@/lib/mock-data";
import { useLocation } from "wouter";

export default function Community() {
  const [, setLocation] = useLocation();
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes} นาทีที่แล้ว`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diffMinutes / 1440)} วันที่แล้ว`;
  };

  return (
    <div className="px-6 py-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">ชุมชน</h1>
        <Button 
          size="icon" 
          onClick={() => setLocation('/create-post')}
          data-testid="button-create-post"
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white mb-6">
        <h2 className="text-lg font-semibold mb-4">สถิติชุมชน</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-total-members">{mockCommunityStats.totalMembers.toLocaleString()}</div>
            <div className="text-white/80 text-sm">สมาชิก</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-monthly-activities">{mockCommunityStats.monthlyActivities}</div>
            <div className="text-white/80 text-sm">กิจกรรมเดือนนี้</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" data-testid="text-today-runners">{mockCommunityStats.todayRunners}</div>
            <div className="text-white/80 text-sm">คนวิ่งวันนี้</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="h-auto p-4 text-left justify-start" 
          onClick={() => setLocation('/friends')}
          data-testid="button-find-running-friends"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
            <i className="fas fa-users text-primary"></i>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">หาเพื่อนวิ่ง</h3>
            <p className="text-sm text-muted-foreground">ค้นหาเพื่อนที่มีไลฟ์สไตล์ใกล้เคียง</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto p-4 text-left justify-start" data-testid="button-view-challenges">
          <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-2">
            <i className="fas fa-trophy text-accent"></i>
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">ชาเลนจ์</h3>
            <p className="text-sm text-muted-foreground">เข้าร่วมการแข่งขันและชิงรางวัล</p>
          </div>
        </Button>
      </div>

      {/* Community Feed */}
      <div className="space-y-4 mb-6">
        {mockPosts.map((post, index) => (
          <Card key={post.id} className="p-4" data-testid={`card-post-${index}`}>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={post.user.profileImage!} 
                alt={post.user.name} 
                className="w-10 h-10 rounded-full" 
                data-testid={`img-post-user-avatar-${index}`}
              />
              <div className="flex-1">
                <p className="font-medium text-card-foreground" data-testid={`text-post-user-name-${index}`}>{post.user.name}</p>
                <p className="text-xs text-muted-foreground" data-testid={`text-post-time-${index}`}>
                  {post.createdAt ? formatTimeAgo(new Date(post.createdAt)) : 'เมื่อไหร่'} • สวนธนบุรีรมย์
                </p>
              </div>
              <Button variant="ghost" size="icon" data-testid={`button-post-menu-${index}`}>
                <i className="fas fa-ellipsis-h"></i>
              </Button>
            </div>
            
            <p className="text-card-foreground mb-3" data-testid={`text-post-content-${index}`}>{post.content}</p>
            
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt="รูปกิจกรรม" 
                className="w-full h-40 object-cover rounded-xl mb-3" 
                data-testid={`img-post-image-${index}`}
              />
            )}
            
            {post.activityType === 'cycling' && index === 1 && (
              <div className="bg-muted rounded-xl p-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <i className="fas fa-biking text-white text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground text-sm">กลุ่มปั่นจักรยานเย็น</p>
                    <p className="text-xs text-muted-foreground">วันนี้ 17:00 • 10 กม.</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-auto p-0 text-red-500 hover:text-red-600" data-testid={`button-like-post-${index}`}>
                  <i className="fas fa-heart mr-1"></i>
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid={`button-comment-post-${index}`}>
                  <i className="fas fa-comment mr-1"></i>
                  <span>{post.comments}</span>
                </Button>
                {post.activityType === 'cycling' && index === 1 ? (
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-primary hover:text-primary/80" data-testid={`button-join-group-${index}`}>
                    <i className="fas fa-user-plus mr-1"></i>
                    <span>เข้าร่วม</span>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid={`button-share-post-${index}`}>
                    <i className="fas fa-share mr-1"></i>
                    <span>แชร์</span>
                  </Button>
                )}
              </div>
              <span className="text-muted-foreground text-xs" data-testid={`text-post-activity-info-${index}`}>
                {post.activityType === 'running' && post.distance ? `${(post.distance / 1000).toFixed(1)} กม. • ${post.duration} นาที` :
                 post.activityType === 'cycling' && index === 1 ? '5/8 คน' :
                 post.activityType === 'yoga' ? 'โยคะเช้า' : ''}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Challenge Section */}
      <div className="bg-gradient-to-r from-accent to-red-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <i className="fas fa-trophy text-2xl"></i>
          <div>
            <h3 className="font-bold" data-testid="text-challenge-title">ชาเลนจ์เดือนมีนาคม</h3>
            <p className="text-white/80 text-sm" data-testid="text-challenge-description">วิ่งสะสม 100 กม. ใน 1 เดือน</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-2 mb-2">
          <div className="bg-white rounded-full h-2 w-3/4" data-testid="progress-challenge"></div>
        </div>
        <div className="flex justify-between text-sm">
          <span data-testid="text-challenge-progress">75.2 / 100 กม.</span>
          <span data-testid="text-challenge-remaining">เหลืออีก 10 วัน</span>
        </div>
      </div>
    </div>
  );
}
