import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useState } from "react";

export default function FacilityLocator() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  
  const categories = ["ทั้งหมด", "ที่จอดรถ", "น้ำดื่ม", "ห้องน้ำ", "สนามเด็ก", "ที่พัก"];
  
  const facilities = [
    {
      id: "parking-1",
      name: "ลานจอดรถหลัก",
      type: "ที่จอดรถ",
      icon: "fas fa-parking",
      color: "text-green-500",
      status: "ว่าง",
      statusColor: "bg-green-100 text-green-800",
      distance: "50 ม.",
      spaces: "24/100 ที่",
      features: ["มีหลังคา", "กล้องวงจร", "24 ชม."],
      description: "ลานจอดรถหลักติดประตูทางเข้า มีหลังคาครอบ และระบบรักษาความปลอดภัย"
    },
    {
      id: "parking-2", 
      name: "ลานจอดรถด้านหลัง",
      type: "ที่จอดรถ",
      icon: "fas fa-parking",
      color: "text-yellow-500",
      status: "เกือบเต็ม",
      statusColor: "bg-yellow-100 text-yellow-800",
      distance: "200 ม.",
      spaces: "8/50 ที่",
      features: ["กลางแจ้ง", "ใกล้เส้นทางวิ่ง"],
      description: "ลานจอดรถรองใกล้กับจุดเริ่มต้นเส้นทางวิ่ง เหมาะกับนักวิ่งเช้า"
    },
    {
      id: "water-1",
      name: "จุดน้ำดื่มหลัก",
      type: "น้ำดื่ม", 
      icon: "fas fa-tint",
      color: "text-blue-500",
      status: "พร้อมใช้",
      statusColor: "bg-blue-100 text-blue-800",
      distance: "30 ม.",
      spaces: "4 ก๊อก",
      features: ["น้ำเย็น", "ฟิลเตอร์", "24 ชม."],
      description: "จุดน้ำดื่มหลักใกล้ลานออกกำลังกาย มีระบบกรองน้ำและเครื่องทำน้ำเย็น"
    },
    {
      id: "water-2",
      name: "จุดน้ำเส้นทางวิ่ง A",
      type: "น้ำดื่ม",
      icon: "fas fa-tint", 
      color: "text-blue-500",
      status: "พร้อมใช้",
      statusColor: "bg-blue-100 text-blue-800",
      distance: "500 ม.",
      spaces: "2 ก๊อก",
      features: ["เส้นทางวิ่ง", "มีเงา"],
      description: "จุดน้ำระหว่างเส้นทางวิ่งสายหลัก มีซุ้มไผ่ให้ร่มเงา"
    },
    {
      id: "restroom-1",
      name: "ห้องน้ำอาคารหลัก", 
      type: "ห้องน้ำ",
      icon: "fas fa-restroom",
      color: "text-purple-500",
      status: "สะอาด",
      statusColor: "bg-green-100 text-green-800",
      distance: "80 ม.",
      spaces: "8 ห้อง",
      features: ["แอร์", "คนพิการ", "เปลี่ยนผ้าอ้อม"],
      description: "ห้องน้ำหลักในอาคารบริการ มีเครื่องปรับอากาศและสิ่งอำนวยความสะดวกครบครัน"
    },
    {
      id: "playground-1",
      name: "สนามเด็กเล่นใหญ่",
      type: "สนามเด็ก",
      icon: "fas fa-child",
      color: "text-pink-500", 
      status: "เปิดใช้",
      statusColor: "bg-green-100 text-green-800",
      distance: "150 ม.",
      spaces: "50 เด็ก",
      features: ["อายุ 3-12 ปี", "พื้นยาง", "มีเงา"],
      description: "สนามเด็กเล่นหลักสำหรับเด็กอายุ 3-12 ปี มีอุปกรณ์เล่นหลากหลายและปลอดภัย"
    },
    {
      id: "rest-1",
      name: "ศาลาพักผ่อนริมบึง",
      type: "ที่พัก",
      icon: "fas fa-umbrella",
      color: "text-indigo-500",
      status: "ว่าง", 
      statusColor: "bg-green-100 text-green-800",
      distance: "300 ม.",
      spaces: "20 ที่นั่ง",
      features: ["วิวบึง", "ไฟฟ้า", "WiFi"],
      description: "ศาลาพักผ่อนริมบึงน้อย บรรยากาศร่มรื่น เหมาะสำหรับพักหลังออกกำลังกาย"
    }
  ];

  const filteredFacilities = selectedCategory === "ทั้งหมด" 
    ? facilities 
    : facilities.filter(facility => facility.type === selectedCategory);

  const getFacilityStats = (type: string) => {
    const typeFacilities = facilities.filter(f => f.type === type);
    return {
      total: typeFacilities.length,
      available: typeFacilities.filter(f => f.status === "ว่าง" || f.status === "พร้อมใช้" || f.status === "สะอาด").length
    };
  };

  return (
    <div className="px-6 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation('/map')}
          data-testid="button-back-map"
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">สิ่งอำนวยความสะดวก</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
          <Input 
            type="text" 
            placeholder="ค้นหาสิ่งอำนวยความสะดวก..." 
            className="pl-10"
            data-testid="input-search-facilities"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
              <i className="fas fa-parking text-green-500"></i>
            </div>
            <div>
              <p className="font-semibold text-card-foreground" data-testid="text-parking-stats">
                {getFacilityStats("ที่จอดรถ").available}/{getFacilityStats("ที่จอดรถ").total}
              </p>
              <p className="text-sm text-muted-foreground">ที่จอดรถพร้อมใช้</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <i className="fas fa-tint text-blue-500"></i>
            </div>
            <div>
              <p className="font-semibold text-card-foreground" data-testid="text-water-stats">
                {getFacilityStats("น้ำดื่ม").total}
              </p>
              <p className="text-sm text-muted-foreground">จุดน้ำดื่มทั้งหมด</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
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

      {/* Facilities List */}
      <div className="space-y-4">
        {filteredFacilities.map((facility, index) => (
          <Card key={facility.id} className="p-4" data-testid={`card-facility-${index}`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <i className={`${facility.icon} ${facility.color} text-lg`}></i>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-card-foreground" data-testid={`text-facility-name-${index}`}>
                    {facility.name}
                  </h3>
                  <Badge className={facility.statusColor} data-testid={`badge-facility-status-${index}`}>
                    {facility.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2" data-testid={`text-facility-description-${index}`}>
                  {facility.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span data-testid={`text-facility-distance-${index}`}>
                    <i className="fas fa-walking mr-1"></i> {facility.distance}
                  </span>
                  <span data-testid={`text-facility-capacity-${index}`}>
                    <i className="fas fa-users mr-1"></i> {facility.spaces}
                  </span>
                </div>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {facility.features.map((feature, featureIndex) => (
                    <Badge 
                      key={featureIndex} 
                      variant="outline" 
                      className="text-xs"
                      data-testid={`badge-feature-${index}-${featureIndex}`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button size="sm" data-testid={`button-navigate-${index}`}>
                  <i className="fas fa-directions mr-1"></i>
                  นำทาง
                </Button>
                <Button variant="ghost" size="sm" data-testid={`button-report-${index}`}>
                  <i className="fas fa-flag mr-1"></i>
                  แจ้งปัญหา
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="p-4 mt-6 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <div className="flex items-center gap-3 mb-2">
          <i className="fas fa-phone text-red-600"></i>
          <h4 className="font-semibold text-red-800 dark:text-red-200">ติดต่อฉุกเฉิน</h4>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300 mb-2">
          หากพบปัญหาหรือต้องการความช่วยเหลือ
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-red-600 border-red-300" data-testid="button-call-emergency">
            <i className="fas fa-phone mr-1"></i>
            โทร 191
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-300" data-testid="button-call-park-office">
            <i className="fas fa-building mr-1"></i>
            สำนักงานสวน
          </Button>
        </div>
      </Card>
    </div>
  );
}