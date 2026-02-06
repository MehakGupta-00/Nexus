import { PageContainer } from "@/components/PageContainer";
import { useAuth } from "@/hooks/use-auth";
import { useMessMenu } from "@/hooks/use-mess";
import { useAnnouncements } from "@/hooks/use-announcements";
import { useAcademicEvents } from "@/hooks/use-academic";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Utensils, Bell, CalendarClock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user } = useAuth();
  const today = format(new Date(), "yyyy-MM-dd");
  
  const { data: messMenu, isLoading: messLoading } = useMessMenu(today);
  const { data: announcements, isLoading: annLoading } = useAnnouncements();
  const { data: events, isLoading: eventsLoading } = useAcademicEvents();

  // Find today's meal based on time
  const hour = new Date().getHours();
  let currentMeal = "Breakfast";
  if (hour >= 10 && hour < 15) currentMeal = "Lunch";
  else if (hour >= 15 && hour < 18) currentMeal = "Snacks";
  else if (hour >= 18) currentMeal = "Dinner";

  const todaysMenu = messMenu?.find(m => m.mealType === currentMeal);

  return (
    <PageContainer
      title={`Hello, ${user?.firstName || 'Student'}!`}
      description="Here's what's happening on campus today."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Mess Menu Card */}
        <motion.div whileHover={{ y: -5 }} className="h-full">
          <Card className="h-full overflow-hidden border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-orange-50/50 dark:bg-orange-950/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-600" />
                  Mess Menu
                </CardTitle>
                <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-700 rounded-full dark:bg-orange-900 dark:text-orange-100">
                  {currentMeal}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {messLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : todaysMenu ? (
                <ul className="space-y-2">
                  {todaysMenu.items?.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                  {todaysMenu.items && todaysMenu.items.length > 4 && (
                    <li className="text-xs text-muted-foreground pl-3.5">+ more items</li>
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic">No menu posted for this meal.</p>
              )}
              <Link href="/mess" className="inline-flex items-center text-sm font-medium text-orange-600 mt-4 hover:underline">
                View Full Menu <ChevronRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Announcements Card */}
        <motion.div whileHover={{ y: -5 }} className="h-full">
          <Card className="h-full overflow-hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50/50 dark:bg-blue-950/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Latest Updates
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {annLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : announcements && announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.slice(0, 3).map((ann) => (
                    <div key={ann.id} className="border-b pb-2 last:border-0 last:pb-0">
                      <h4 className="font-medium text-sm truncate">{ann.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{ann.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No new announcements.</p>
              )}
              <Link href="/announcements" className="inline-flex items-center text-sm font-medium text-blue-600 mt-4 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events Card */}
        <motion.div whileHover={{ y: -5 }} className="h-full md:col-span-2 lg:col-span-1">
          <Card className="h-full overflow-hidden border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-purple-50/50 dark:bg-purple-950/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-purple-600" />
                  Schedule
                </CardTitle>
                <span className="text-xs font-medium text-muted-foreground">Today</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
               {eventsLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : events && events.length > 0 ? (
                <div className="space-y-3">
                  {events.slice(0, 3).map((evt) => (
                    <div key={evt.id} className="flex gap-3 items-start">
                      <div className="w-12 flex-shrink-0 text-center bg-purple-100 dark:bg-purple-900/50 rounded p-1">
                        <span className="block text-xs font-bold text-purple-700 dark:text-purple-300">
                          {new Date(evt.startTime).getDate()}
                        </span>
                        <span className="block text-[10px] uppercase text-purple-600 dark:text-purple-400">
                          {format(new Date(evt.startTime), "MMM")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{evt.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(evt.startTime), "h:mm a")} • {evt.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No upcoming events.</p>
              )}
              <Link href="/academics" className="inline-flex items-center text-sm font-medium text-purple-600 mt-4 hover:underline">
                Full Schedule <ChevronRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </PageContainer>
  );
}
