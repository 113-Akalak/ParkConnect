import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import { useState } from "react";
import { mockUser } from "@/lib/mock-data";

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const [selectedActivityType, setSelectedActivityType] = useState("");
  const [postContent, setPostContent] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activityTypes = [
    { value: "running", label: "วิ่ง", icon: "fas fa-running", color: "text-green-500" },
    { value: "cycling", label: "ปั่นจักรยาน", icon: "fas fa-biking", color: "text-blue-500" },
    { value: "yoga", label: "โยคะ", icon: "fas fa-om", color: "text-purple-500" },
    { value: "general", label: "ทั่วไป", icon: "fas fa-comment", color: "text-gray-500" }
  ];

  const photoTemplates = [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", 
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=200&fit=crop"
  ];

  const handleSubmit = () => {
    // In real app, this would call API to create post
    console.log("Creating post:", {
      content: postContent,
      activityType: selectedActivityType,
      distance,
      duration,
      image: selectedImage
    });
    setLocation('/community');
  };

  return (
    <div className="px-6 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLocation('/community')}
            data-testid="button-back-community"
          >
            <i className="fas fa-arrow-left"></i>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">สร้างโพสต์</h1>
        </div>
        <Button 
          onClick={handleSubmit}
          disabled={!postContent.trim()}
          data-testid="button-publish-post"
        >
          โพสต์
        </Button>
      </div>

      {/* User Info */}
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-3">
          <img 
            src={mockUser.profileImage!} 
            alt={mockUser.name} 
            className="w-12 h-12 rounded-full" 
            data-testid="img-create-post-avatar"
          />
          <div>
            <p className="font-semibold text-card-foreground" data-testid="text-posting-as">{mockUser.name}</p>
            <p className="text-sm text-muted-foreground">แชร์ในชุมชนสวนธนบุรีรมย์</p>
          </div>
        </div>
      </Card>

      {/* Post Content */}
      <Card className="p-4 mb-6">
        <Textarea
          placeholder="แชร์ประสบการณ์การออกกำลังกายของคุณ..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="min-h-[100px] border-none shadow-none resize-none text-base"
          data-testid="textarea-post-content"
        />
      </Card>

      {/* Activity Type Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-foreground">ประเภทกิจกรรม</h3>
        <div className="grid grid-cols-2 gap-3">
          {activityTypes.map((type) => (
            <Card 
              key={type.value}
              className={`p-3 cursor-pointer transition-all ${
                selectedActivityType === type.value 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => setSelectedActivityType(type.value)}
              data-testid={`card-activity-type-${type.value}`}
            >
              <div className="flex items-center gap-2">
                <i className={`${type.icon} ${type.color} text-lg`}></i>
                <span className="font-medium text-card-foreground">{type.label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Details (for running/cycling) */}
      {(selectedActivityType === "running" || selectedActivityType === "cycling") && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-foreground">รายละเอียดกิจกรรม</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">ระยะทาง (กม.)</label>
              <Input
                type="number"
                placeholder="0.0"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                data-testid="input-distance"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">เวลา (นาที)</label>
              <Input
                type="number"
                placeholder="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                data-testid="input-duration"
              />
            </div>
          </div>
        </div>
      )}

      {/* Photo Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-foreground">เพิ่มรูปภาพ</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-24 border-dashed border-2 flex flex-col items-center gap-2"
            data-testid="button-take-photo"
          >
            <i className="fas fa-camera text-xl text-muted-foreground"></i>
            <span className="text-sm">ถ่ายรูป</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 border-dashed border-2 flex flex-col items-center gap-2"
            data-testid="button-choose-photo"
          >
            <i className="fas fa-image text-xl text-muted-foreground"></i>
            <span className="text-sm">เลือกรูป</span>
          </Button>
        </div>
        
        {/* Photo Templates */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">หรือเลือกรูปแบบ</p>
          <div className="grid grid-cols-2 gap-2">
            {photoTemplates.map((template, index) => (
              <img
                key={index}
                src={template}
                alt={`Template ${index + 1}`}
                className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                  selectedImage === template ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(selectedImage === template ? null : template)}
                data-testid={`img-template-${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Post Options */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-foreground">ตัวเลือกเพิ่มเติม</h3>
        <div className="space-y-3">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-user-friends text-primary"></i>
                <span className="text-card-foreground">เชิญเพื่อนมาร่วมกิจกรรม</span>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-invite-friends">
                เชิญ
              </Button>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span className="text-card-foreground">แท็กสถานที่</span>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-tag-location">
                เพิ่ม
              </Button>
            </div>
          </Card>
          
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-hashtag text-primary"></i>
                <span className="text-card-foreground">เพิ่มแฮชแท็ก</span>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-add-hashtags">
                เพิ่ม
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Popular Hashtags */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-foreground">แฮชแท็กยอดนิยม</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "#สวนธนบุรีรมย์", "#วิ่งเช้า", "#โยคะในสวน", "#ปั่นจักรยาน", 
            "#สุขภาพดี", "#ออกกำลังกาย", "#ชุมชนนักวิ่ง", "#wellness"
          ].map((hashtag, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              data-testid={`badge-hashtag-${index}`}
            >
              {hashtag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}