import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: "/", icon: "fas fa-home", label: "หน้าหลัก" },
  { path: "/map", icon: "fas fa-map", label: "แผนที่" },
  { path: "/activities", icon: "fas fa-calendar-alt", label: "กิจกรรม" },
  { path: "/community", icon: "fas fa-users", label: "ชุมชน" },
  { path: "/profile", icon: "fas fa-user", label: "โปรไฟล์" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border pt-3 pb-8 flex justify-around z-50">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all cursor-pointer",
            location === item.path
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setLocation(item.path)}
          data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
        >
          <i className={`${item.icon} text-lg`}></i>
          <span className="text-xs font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
