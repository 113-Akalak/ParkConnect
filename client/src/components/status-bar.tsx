export default function StatusBar() {
  const currentTime = new Date().toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="status-bar h-11 bg-gradient-to-r from-primary to-secondary flex items-center justify-between px-5 text-white text-sm font-semibold">
      <span data-testid="text-current-time">{currentTime}</span>
      <span data-testid="text-app-name">สวนธนบุรีรมย์</span>
      <div className="flex items-center gap-1">
        <i className="fas fa-signal text-xs" data-testid="icon-signal"></i>
        <i className="fas fa-wifi text-xs" data-testid="icon-wifi"></i>
        <i className="fas fa-battery-three-quarters text-xs" data-testid="icon-battery"></i>
      </div>
    </div>
  );
}
