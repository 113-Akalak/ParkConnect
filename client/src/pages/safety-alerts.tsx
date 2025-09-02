import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useLocation } from "wouter";
import { useState } from "react";

export default function SafetyAlerts() {
  const [, setLocation] = useLocation();
  const [emergencyContactsEnabled, setEmergencyContactsEnabled] = useState(true);
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const safetyAlerts = [
    {
      id: "alert-1",
      type: "warning",
      icon: "fas fa-exclamation-triangle",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
      title: "พื้นที่เส้นทางวิ่งเปียก",
      message: "ฝนตกเมื่อเช้า เส้นทางบางจุดอาจลื่น ควรระวังขณะวิ่ง",
      location: "เส้นทางวิ่ง A กม.ที่ 1.5",
      time: "30 นาทีที่แล้ว",
      isActive: true
    },
    {
      id: "alert-2", 
      type: "maintenance",
      icon: "fas fa-tools",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
      title: "ปิดปรับปรุงห้องน้ำชั่วคราว",
      message: "ห้องน้ำอาคาร B ปิดซ่อมแซมระบบประปา เปิดใหม่พรุ่งนี้",
      location: "อาคารบริการ B",
      time: "2 ชั่วโมงที่แล้ว",
      isActive: true
    },
    {
      id: "alert-3",
      type: "info",
      icon: "fas fa-info-circle",
      color: "text-green-600", 
      bgColor: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
      title: "เพิ่มไฟส่องสว่างใหม่",
      message: "ติดตั้งไฟ LED เพิ่มบนเส้นทางวิ่งเย็น เพื่อความปลอดภัย",
      location: "เส้นทางวิ่ง B",
      time: "1 วันที่แล้ว",
      isActive: false
    }
  ];

  const emergencyContacts = [
    {
      name: "ฉุกเฉิน",
      number: "191",
      description: "สายด่วนตำรวจ กู้ชีพ ดับเพลิง",
      icon: "fas fa-ambulance",
      color: "text-red-500"
    },
    {
      name: "สำนักงานสวน",
      number: "02-123-4567",
      description: "เจ้าหน้าที่ดูแลสวน 24 ชม.",
      icon: "fas fa-building",
      color: "text-blue-500"
    },
    {
      name: "รักษาความปลอดภัย",
      number: "02-123-4568",
      description: "ยามรักษาความปลอดภัยในสวน",
      icon: "fas fa-shield-alt",
      color: "text-green-500"
    }
  ];

  const safetyTips = [
    {
      icon: "fas fa-lightbulb",
      title: "วิ่งในเวลากลางคืน",
      tip: "สวมเสื้อผ้าสีสว่าง ใช้ไฟฉายหรือแว่นไฟ"
    },
    {
      icon: "fas fa-tint",
      title: "ดื่มน้ำให้เพียงพอ",
      tip: "ดื่มน้ำทุก 15-20 นาที โดยเฉพาะช่วงอากาศร้อน"
    },
    {
      icon: "fas fa-user-friends",
      title: "ออกกำลังกายเป็นกลุ่ม",
      tip: "หากออกกำลังกายช่วงเย็น ควรไปเป็นกลุ่มเพื่อความปลอดภัย"
    }
  ];

  return (
    <div className="px-6 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation('/profile')}
          data-testid="button-back-profile"
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">ความปลอดภัย</h1>
      </div>

      {/* Emergency Button */}
      <Card className="p-4 mb-6 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <div className="text-center">
          <Button 
            size="lg" 
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            data-testid="button-emergency-call"
          >
            <i className="fas fa-phone mr-2 text-xl"></i>
            <span className="text-lg font-bold">ฉุกเฉิน 191</span>
          </Button>
          <p className="text-red-700 dark:text-red-300 text-sm mt-2">
            กดเพื่อโทรฉุกเฉิน หรือปัดลงเพื่อดูหมายเลขอื่น ๆ
          </p>
        </div>
      </Card>

      {/* Current Alerts */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">การแจ้งเตือนปัจจุบัน</h3>
        <div className="space-y-3">
          {safetyAlerts.filter(alert => alert.isActive).map((alert, index) => (
            <Card key={alert.id} className={`p-4 ${alert.bgColor}`} data-testid={`card-alert-${index}`}>
              <div className="flex items-start gap-3">
                <i className={`${alert.icon} ${alert.color} text-lg mt-1`}></i>
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground mb-1" data-testid={`text-alert-title-${index}`}>
                    {alert.title}
                  </h4>
                  <p className="text-sm text-card-foreground mb-2" data-testid={`text-alert-message-${index}`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span data-testid={`text-alert-location-${index}`}>
                      <i className="fas fa-map-marker-alt mr-1"></i> {alert.location}
                    </span>
                    <span data-testid={`text-alert-time-${index}`}>
                      <i className="fas fa-clock mr-1"></i> {alert.time}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" data-testid={`button-view-on-map-${index}`}>
                  ดูในแผนที่
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">หมายเลขฉุกเฉิน</h3>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-4" data-testid={`card-emergency-contact-${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className={`${contact.icon} ${contact.color}`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground" data-testid={`text-contact-name-${index}`}>
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-contact-description-${index}`}>
                      {contact.description}
                    </p>
                  </div>
                </div>
                <Button data-testid={`button-call-${index}`}>
                  <i className="fas fa-phone mr-1"></i>
                  {contact.number}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">การตั้งค่าความปลอดภัย</h3>
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-bell text-muted-foreground"></i>
                <div>
                  <span className="text-card-foreground font-medium">การแจ้งเตือนความปลอดภัย</span>
                  <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเมื่อมีเหตุการณ์สำคัญ</p>
                </div>
              </div>
              <Switch 
                checked={alertsEnabled} 
                onCheckedChange={setAlertsEnabled}
                data-testid="switch-safety-alerts"
              />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-muted-foreground"></i>
                <div>
                  <span className="text-card-foreground font-medium">แชร์ตำแหน่งขณะออกกำลังกาย</span>
                  <p className="text-sm text-muted-foreground">ให้เพื่อนติดตามได้เพื่อความปลอดภัย</p>
                </div>
              </div>
              <Switch 
                checked={locationSharingEnabled} 
                onCheckedChange={setLocationSharingEnabled}
                data-testid="switch-location-sharing"
              />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-user-friends text-muted-foreground"></i>
                <div>
                  <span className="text-card-foreground font-medium">ผู้ติดต่อฉุกเฉิน</span>
                  <p className="text-sm text-muted-foreground">ตั้งค่าคนที่จะแจ้งในกรณีฉุกเฉิน</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" data-testid="button-manage-emergency-contacts">
                จัดการ
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">เคล็ดลับความปลอดภัย</h3>
        <div className="space-y-3">
          {safetyTips.map((tip, index) => (
            <Card key={index} className="p-4" data-testid={`card-safety-tip-${index}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <i className={`${tip.icon} text-green-500`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1" data-testid={`text-tip-title-${index}`}>
                    {tip.title}
                  </h4>
                  <p className="text-sm text-muted-foreground" data-testid={`text-tip-description-${index}`}>
                    {tip.tip}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lighting Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">สถานะไฟส่องสว่าง</h3>
        <div className="space-y-3">
          {[
            { zone: "เส้นทางวิ่ง A", status: "ปกติ", color: "bg-green-100 text-green-800", lastCheck: "5 นาทีที่แล้ว" },
            { zone: "เส้นทางวิ่ง B", status: "ปกติ", color: "bg-green-100 text-green-800", lastCheck: "5 นาทีที่แล้ว" },
            { zone: "ลานจอดรถหลัก", status: "ปกติ", color: "bg-green-100 text-green-800", lastCheck: "10 นาทีที่แล้ว" },
            { zone: "สนามเด็กเล่น", status: "ซ่อมแซม", color: "bg-yellow-100 text-yellow-800", lastCheck: "30 นาทีที่แล้ว" }
          ].map((light, index) => (
            <Card key={index} className="p-3" data-testid={`card-lighting-${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <i className="fas fa-lightbulb text-yellow-500"></i>
                  <div>
                    <span className="font-medium text-card-foreground" data-testid={`text-zone-name-${index}`}>
                      {light.zone}
                    </span>
                    <p className="text-xs text-muted-foreground" data-testid={`text-last-check-${index}`}>
                      ตรวจสอบ: {light.lastCheck}
                    </p>
                  </div>
                </div>
                <Badge className={light.color} data-testid={`badge-light-status-${index}`}>
                  {light.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Issue */}
      <Card className="p-4 mb-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-flag text-red-500 text-xl"></i>
          </div>
          <h4 className="font-semibold text-card-foreground mb-2">พบปัญหาด้านความปลอดภัย?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            แจ้งปัญหาให้เจ้าหน้าที่ทราบเพื่อแก้ไขอย่างรวดเร็ว
          </p>
          <Button variant="outline" className="w-full" data-testid="button-report-safety-issue">
            <i className="fas fa-flag mr-2"></i>
            แจ้งปัญหาความปลอดภัย
          </Button>
        </div>
      </Card>

      {/* Safety Checklist */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">เช็คลิสต์ก่อนออกกำลังกาย</h3>
        <Card className="p-4">
          <div className="space-y-3">
            {[
              "ตรวจสอบสภาพอากาศ",
              "เตรียมน้ำดื่มเพียงพอ",
              "แจ้งเพื่อน/ครอบครัวว่าจะไปออกกำลังกาย",
              "ตรวจสอบเส้นทางและไฟส่องสว่าง",
              "นำโทรศัพท์ที่แบตเตอรี่เต็ม"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3" data-testid={`checklist-item-${index}`}>
                <div className="w-5 h-5 border-2 border-primary rounded flex items-center justify-center">
                  <i className="fas fa-check text-primary text-xs"></i>
                </div>
                <span className="text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}