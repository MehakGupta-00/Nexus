import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  Video, 
  MessageSquare,
  GraduationCap,
  MapPin,
  Info
} from "lucide-react";

interface TimetableSlot {
  time: string;
  subject: string;
  room: string;
  type: string;
}

interface WeeklyTimetable {
  [key: string]: TimetableSlot[];
}

export default function Academics() {
  const timetable: WeeklyTimetable = {
    Monday: [
      { time: "09:00 - 09:50", subject: "Data Structures", room: "L1", type: "Lecture" },
      { time: "10:00 - 10:50", subject: "Discrete Math", room: "L2", type: "Lecture" },
      { time: "14:00 - 16:50", subject: "Operating Systems Lab", room: "Lab 3", type: "Lab" },
    ],
    Tuesday: [
      { time: "09:00 - 09:50", subject: "Computer Networks", room: "L1", type: "Lecture" },
      { time: "11:00 - 11:50", subject: "Artificial Intelligence", room: "L3", type: "Lecture" },
      { time: "12:00 - 12:50", subject: "Soft Skills", room: "Seminar Hall", type: "Tutorial" },
    ],
    Wednesday: [
      { time: "09:00 - 09:50", subject: "Data Structures", room: "L1", type: "Lecture" },
      { time: "10:00 - 10:50", subject: "Discrete Math", room: "L2", type: "Lecture" },
      { time: "14:00 - 15:50", subject: "Club Activity", room: "Auditorium", type: "Event" },
    ],
    Thursday: [
      { time: "09:00 - 09:50", subject: "Computer Networks", room: "L1", type: "Lecture" },
      { time: "11:00 - 11:50", subject: "Artificial Intelligence", room: "L3", type: "Lecture" },
    ],
    Friday: [
      { time: "09:00 - 09:50", subject: "Data Structures", room: "L1", type: "Lecture" },
      { time: "10:00 - 10:50", subject: "Discrete Math", room: "L2", type: "Lecture" },
      { time: "14:00 - 16:50", subject: "DBMS Lab", room: "Lab 2", type: "Lab" },
    ]
  };

  const courses = [
    { 
      id: "CS201", 
      name: "Data Structures", 
      instructor: "Dr. Sharma",
      progress: 65,
      nextAssignment: "Balanced Trees Implementation",
      deadline: "Oct 15"
    },
    { 
      id: "CS202", 
      name: "Discrete Mathematics", 
      instructor: "Dr. Gupta",
      progress: 40,
      nextAssignment: "Graph Theory Quiz",
      deadline: "Oct 12"
    },
    { 
      id: "CS203", 
      name: "Operating Systems", 
      instructor: "Dr. Verma",
      progress: 80,
      nextAssignment: "Process Scheduling Simulation",
      deadline: "Oct 20"
    }
  ];

  const days = Object.keys(timetable);
  const currentDay = days[new Date().getDay() - 1] || "Monday";

  return (
    <div className="md:pl-64 p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-2">Academic Cockpit</h1>
          <p className="text-muted-foreground text-lg">Manage your courses, timetable, and learning resources.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timetable Section */}
          <Card className="lg:col-span-2 border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Weekly Timetable
                  </CardTitle>
                  <CardDescription>Auto-generated based on your course registration</CardDescription>
                </div>
                <Badge variant="outline" className="bg-background">Semester 1, 2026</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue={currentDay} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  {days.map(day => (
                    <TabsTrigger key={day} value={day}>{day.substring(0, 3)}</TabsTrigger>
                  ))}
                </TabsList>
                {days.map(day => (
                  <TabsContent key={day} value={day} className="space-y-4">
                    {timetable[day]?.map((slot: TimetableSlot, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center justify-center min-w-[100px] border-r pr-4 border-border/50">
                          <Clock className="w-4 h-4 text-muted-foreground mb-1" />
                          <span className="text-xs font-medium">{slot.time}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{slot.subject}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {slot.room}
                            </span>
                            <Badge variant="secondary" className="text-[10px] h-4 uppercase tracking-tighter">
                              {slot.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* LMS Quick Access */}
          <Card className="border-2 border-primary/10 shadow-lg h-fit">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                LMS Portal
              </CardTitle>
              <CardDescription>Learning Management System</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> My Courses
                </h4>
                {courses.map(course => (
                  <div key={course.id} className="group p-3 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-primary">{course.id}</p>
                        <p className="text-sm font-medium">{course.name}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-muted-foreground">Due {course.deadline}</span>
                      <span className="font-semibold">{course.progress}% done</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t space-y-3">
                <Button className="w-full flex items-center gap-2" variant="default">
                  <FileText className="w-4 h-4" /> Go to Full LMS Site
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="icon" className="w-full">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-full">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-full">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Academic Notice
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mid-semester feedback forms are now open on the LMS. Please ensure you submit them by Friday to help us improve your learning experience.
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/5 to-transparent">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Upcoming Exam
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discrete Mathematics Quiz 2 is scheduled for Monday, Oct 12th in L2. The syllabus covers Graph Theory and Logic.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
