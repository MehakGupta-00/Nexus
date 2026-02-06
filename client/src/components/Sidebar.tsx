import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Megaphone, 
  Search, 
  ShoppingBag, 
  Car, 
  MapPin, 
  GraduationCap, 
  MessageSquare,
  LogOut,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { type: "label", name: "Daily Pulse" },
    { name: "Mess Menu", href: "/mess", icon: UtensilsCrossed },
    { name: "Announcements", href: "/announcements", icon: Megaphone },
    { type: "label", name: "Student Exchange" },
    { name: "Lost & Found", href: "/lost-found", icon: Search },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Rides", href: "/rides", icon: Car },
    { type: "label", name: "Explorer" },
    { name: "Campus Map", href: "/map", icon: MapPin },
    { type: "label", name: "Academic" },
    { name: "Academics", href: "/academics", icon: GraduationCap },
    { type: "label", name: "Assistant" },
    { name: "AI Chat", href: "/chat", icon: MessageSquare },
  ];

  return (
    <div className="w-64 border-r bg-card h-screen fixed left-0 top-0 hidden md:flex flex-col z-20">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Campus Nexus
        </h1>
        <p className="text-sm text-muted-foreground">Your digital campus</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1">
        {navItems.map((item, i) => {
          if (item.type === "label") {
            return (
              <div key={i} className="px-2 py-2 mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {item.name}
              </div>
            );
          }
          
          const Icon = item.icon!;
          const isActive = location === item.href;
          
          return (
            <Link key={i} href={item.href || "#"} className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t bg-card">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <UserCircle className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{user?.firstName || 'Student'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={() => logout()} 
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
