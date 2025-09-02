import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function WeatherDetail() {
  const [, setLocation] = useLocation();

  const weatherData = {
    current: {
      temperature: 28,
      condition: "แจ่มใส",
      icon: "fas fa-sun",
      humidity: 65,
      windSpeed: 8,
      uvIndex: 6,
      visibility: 10,
      airQuality: "ดี"
    },
    hourly: [
      { time: "06:00", temp: 25, icon: "fas fa-sun", rain: 0 },
      { time: "09:00", temp: 28, icon: "fas fa-sun", rain: 0 },
      { time: "12:00", temp: 32, icon: "fas fa-sun", rain: 5 },
      { time: "15:00", temp: 30, icon: "fas fa-cloud-sun", rain: 15 },
      { time: "18:00", temp: 27, icon: "fas fa-cloud", rain: 30 },
      { time: "21:00", temp: 24, icon: "fas fa-moon", rain: 10 }
    ],
    recommendations: [
      { 
        icon: "fas fa-running", 
        activity: "วิ่ง", 
        time: "06:00-08:00", 
        condition: "เหมาะมาก", 
        color: "text-green-500" 
      },
      { 
        icon: "fas fa-om", 
        activity: "โยคะ", 
        time: "17:00-19:00", 
        condition: "เหมาะ", 
        color: "text-blue-500" 
      },
      { 
        icon: "fas fa-biking", 
        activity: "ปั่นจักรยาน", 
        time: "18:00-20:00", 
        condition: "ระวังฝน", 
        color: "text-yellow-500" 
      }
    ]
  };

  return (
    <div className="px-6 py-6 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setLocation('/')}
          data-testid="button-back-home"
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">สภาพอากาศ</h1>
      </div>

      {/* Current Weather */}
      <div className="weather-gradient rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold" data-testid="text-current-temp">{weatherData.current.temperature}°C</h2>
            <p className="text-white/80" data-testid="text-current-condition">{weatherData.current.condition}</p>
            <p className="text-white/60 text-sm">สวนธนบุรีรมย์</p>
          </div>
          <i className={`${weatherData.current.icon} text-6xl`} data-testid="icon-current-weather"></i>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-tint text-blue-300"></i>
              <span className="text-sm">ความชื้น</span>
            </div>
            <p className="text-lg font-semibold" data-testid="text-humidity">{weatherData.current.humidity}%</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-wind text-blue-300"></i>
              <span className="text-sm">ลมแรง</span>
            </div>
            <p className="text-lg font-semibold" data-testid="text-wind-speed">{weatherData.current.windSpeed} กม/ชม</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-sun text-yellow-300"></i>
              <span className="text-sm">UV Index</span>
            </div>
            <p className="text-lg font-semibold" data-testid="text-uv-index">{weatherData.current.uvIndex}/10</p>
          </div>
          
          <div className="bg-white/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <i className="fas fa-leaf text-green-300"></i>
              <span className="text-sm">คุณภาพอากาศ</span>
            </div>
            <p className="text-lg font-semibold" data-testid="text-air-quality">{weatherData.current.airQuality}</p>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">พยากรณ์รายชั่วโมง</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {weatherData.hourly.map((hour, index) => (
            <Card key={index} className="p-3 min-w-[80px] text-center" data-testid={`card-hourly-${index}`}>
              <p className="text-xs text-muted-foreground mb-2" data-testid={`text-hour-${index}`}>{hour.time}</p>
              <i className={`${hour.icon} text-lg text-primary mb-2`}></i>
              <p className="font-semibold text-card-foreground" data-testid={`text-hour-temp-${index}`}>{hour.temp}°</p>
              <div className="flex items-center gap-1 mt-1">
                <i className="fas fa-cloud-rain text-blue-500 text-xs"></i>
                <span className="text-xs text-muted-foreground" data-testid={`text-hour-rain-${index}`}>{hour.rain}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Activity Recommendations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">แนะนำกิจกรรมตามสภาพอากาศ</h3>
        <div className="space-y-3">
          {weatherData.recommendations.map((rec, index) => (
            <Card key={index} className="p-4" data-testid={`card-recommendation-${index}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <i className={`${rec.icon} text-primary`}></i>
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground" data-testid={`text-rec-activity-${index}`}>{rec.activity}</p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-rec-time-${index}`}>เวลาแนะนำ: {rec.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${rec.color}`} data-testid={`text-rec-condition-${index}`}>{rec.condition}</p>
                  <Button variant="ghost" size="sm" data-testid={`button-view-rec-${index}`}>
                    ดูกิจกรรม
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weather Alerts */}
      <Card className="p-4 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
        <div className="flex items-center gap-3 mb-2">
          <i className="fas fa-exclamation-triangle text-yellow-600"></i>
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">คำเตือนสภาพอากาศ</h4>
        </div>
        <p className="text-sm text-yellow-700 dark:text-yellow-300" data-testid="text-weather-alert">
          มีโอกาสฝนตกเล็กน้อยในช่วงบ่าย (15:00-18:00) ควรเตรียมร่มหรือเสื้อกันฝน
        </p>
      </Card>
    </div>
  );
}