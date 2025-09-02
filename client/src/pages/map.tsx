import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockRunningRoutes, mockParkInfo } from "@/lib/mock-data";
import { useLocation } from "wouter";

export default function Map() {
  const [, setLocation] = useLocation();

  return (
    <div className="pb-32">
      <div className="map-container h-96 relative">
        {/* Park map background with running trails */}
        <img
          src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4np-UuTQtmKm4Zp0dbbhENVUPB11s0lJXnLXcMIg0h93c4ynwcCnacSDyIcZ7E0D_3wwSEnYfSZb2YaJAHL99y5r_9MNP3Lm5hWSIJ0rwjVLSZWAox_aDlqkg-CNBRYr6n6qUSSAbg=s680-w680-h510-rw"
          alt="ภาพถ่ายทางอากาศของสวนสาธารณะ"
          className="w-full h-full object-cover"
          data-testid="img-park-map"
        />

        {/* Map Controls */}
        <div className="absolute top-4 left-4 right-4">
          <Card className="p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <i className="fas fa-search text-muted-foreground"></i>
              <Input
                type="text"
                placeholder="ค้นหาสถานที่..."
                className="flex-1 bg-transparent border-none shadow-none"
                data-testid="input-search-location"
              />
              <button
                className="text-primary"
                data-testid="button-voice-search"
              >
                <i className="fas fa-microphone"></i>
              </button>
            </div>
          </Card>
        </div>

        {/* Map Markers */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse"
            data-testid="marker-user-location"
          ></div>
        </div>

        <div className="absolute top-1/3 left-1/4">
          <div
            className="w-4 h-4 bg-secondary rounded-full border-2 border-white"
            data-testid="marker-water-station"
          ></div>
        </div>

        <div className="absolute bottom-1/3 right-1/4">
          <div
            className="w-4 h-4 bg-accent rounded-full border-2 border-white"
            data-testid="marker-restroom"
          ></div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-3 border border-border">
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-card-foreground">ตำแหน่งคุณ</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-card-foreground">น้ำดื่ม</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-card-foreground">ห้องน้ำ</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-card-foreground">ที่จอดรถ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Running Routes */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          เส้นทางแนะนำ
        </h2>
        <div className="space-y-3">
          {mockRunningRoutes.map((route, index) => (
            <Card key={route.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${index === 0 ? "bg-green-500/10" : "bg-accent/10"} rounded-xl flex items-center justify-center`}
                  >
                    <i
                      className={`fas ${index === 0 ? "fa-running text-green-500" : "fa-biking text-accent"}`}
                    ></i>
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-card-foreground"
                      data-testid={`text-route-name-${index}`}
                    >
                      {route.name}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid={`text-route-distance-${index}`}
                    >
                      {route.distance} กม. • {route.duration} นาที
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-medium ${index === 0 ? "text-green-500" : "text-accent"}`}
                    data-testid={`text-route-difficulty-${index}`}
                  >
                    {route.difficulty}
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`${i < route.rating ? "fas" : "far"} fa-star text-xs`}
                        data-testid={`star-rating-${index}-${i}`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span data-testid={`text-route-water-${index}`}>
                  <i className="fas fa-tint mr-1"></i> {route.waterStations}{" "}
                  จุดน้ำ
                </span>
                <span data-testid={`text-route-restroom-${index}`}>
                  <i className="fas fa-restroom mr-1"></i> {route.restrooms}{" "}
                  ห้องน้ำ
                </span>
                <span data-testid={`text-route-lighting-${index}`}>
                  <i
                    className={`fas ${route.hasLighting ? "fa-lightbulb" : "fa-moon"} mr-1`}
                  ></i>
                  {route.hasLighting ? "มีไฟ" : "ไม่มีไฟ"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  data-testid={`button-start-navigation-${index}`}
                >
                  เริ่มนำทาง
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/facilities")}
                  data-testid={`button-view-facilities-${index}`}
                >
                  <i className="fas fa-map-marker-alt"></i>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Facilities List */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          สิ่งอำนวยความสะดวก
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setLocation("/facilities")}
            data-testid="card-parking-facility"
          >
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-parking text-green-500"></i>
              <span className="font-medium text-card-foreground text-sm">
                ที่จอดรถ
              </span>
            </div>
            <p
              className="text-xs text-muted-foreground"
              data-testid="text-parking-status"
            >
              เหลือ {mockParkInfo.parkingAvailable}/{mockParkInfo.parkingTotal}{" "}
              ที่
            </p>
          </Card>

          <Card className="p-3" data-testid="card-water-facility">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-tint text-secondary"></i>
              <span className="font-medium text-card-foreground text-sm">
                จุดน้ำดื่ม
              </span>
            </div>
            <p
              className="text-xs text-muted-foreground"
              data-testid="text-water-stations"
            >
              {mockParkInfo.waterStations} จุดทั่วสวน
            </p>
          </Card>

          <Card className="p-3" data-testid="card-restroom-facility">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-restroom text-accent"></i>
              <span className="font-medium text-card-foreground text-sm">
                ห้องน้ำ
              </span>
            </div>
            <p
              className="text-xs text-muted-foreground"
              data-testid="text-restrooms"
            >
              {mockParkInfo.restrooms} จุด สะอาด
            </p>
          </Card>

          <Card className="p-3" data-testid="card-playground-facility">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-child text-purple-500"></i>
              <span className="font-medium text-card-foreground text-sm">
                สนามเด็กเล่น
              </span>
            </div>
            <p
              className="text-xs text-muted-foreground"
              data-testid="text-playgrounds"
            >
              {mockParkInfo.playgrounds} โซน ปลอดภัย
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
