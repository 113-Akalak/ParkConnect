import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StatusBar from "@/components/status-bar";
import BottomNavigation from "@/components/bottom-navigation";
import Home from "@/pages/home";
import Map from "@/pages/map";
import Activities from "@/pages/activities";
import Community from "@/pages/community";
import Profile from "@/pages/profile";
import WeatherDetail from "@/pages/weather-detail";
import ActivityDetail from "@/pages/activity-detail";
import FacilityLocator from "@/pages/facility-locator";
import CreatePost from "@/pages/create-post";
import FriendsGroups from "@/pages/friends-groups";
import SafetyAlerts from "@/pages/safety-alerts";
import HelpSupport from "@/pages/help-support";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/map" component={Map} />
      <Route path="/activities" component={Activities} />
      <Route path="/community" component={Community} />
      <Route path="/profile" component={Profile} />
      <Route path="/weather" component={WeatherDetail} />
      <Route path="/activities/:id" component={ActivityDetail} />
      <Route path="/facilities" component={FacilityLocator} />
      <Route path="/create-post" component={CreatePost} />
      <Route path="/friends" component={FriendsGroups} />
      <Route path="/safety" component={SafetyAlerts} />
      <Route path="/help" component={HelpSupport} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="app-container">
          <StatusBar />
          <main className="min-h-screen">
            <Router />
          </main>
          <BottomNavigation />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
