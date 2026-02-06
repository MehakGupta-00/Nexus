import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Mess from "@/pages/Mess";
import Announcements from "@/pages/Announcements";
import LostFound from "@/pages/LostFound";
import Chat from "@/pages/Chat";
import NotFound from "@/pages/not-found";
import { Loader2 } from "lucide-react";

// Placeholder components for routes not fully implemented in this generation step
const Placeholder = ({ title }: { title: string }) => (
  <div className="md:pl-64 p-8">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">This module is coming soon.</p>
  </div>
);

function AuthenticatedApp() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/mess" component={Mess} />
        <Route path="/announcements" component={Announcements} />
        <Route path="/lost-found" component={LostFound} />
        <Route path="/chat" component={Chat} />
        
        {/* Placeholders for remaining routes */}
        <Route path="/marketplace">
          <Placeholder title="Marketplace" />
        </Route>
        <Route path="/rides">
          <Placeholder title="Rides" />
        </Route>
        <Route path="/map">
          <Placeholder title="Campus Map" />
        </Route>
        <Route path="/academics">
          <Placeholder title="Academic Cockpit" />
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/api/login" component={() => { window.location.href = "/api/login"; return null; }} />
        {/* Redirect any other path to landing */}
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    );
  }

  return <AuthenticatedApp />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
