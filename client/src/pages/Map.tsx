import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Info } from "lucide-react";

export default function Map() {
  const landmarks = [
    { name: "Main Gate", type: "Entry", description: "Primary entrance to IIT Ropar campus" },
    { name: "Super Academic Block", type: "Academic", description: "Main academic building housing departments and labs" },
    { name: "Admin Block", type: "Administration", description: "Central administrative offices" },
    { name: "Central Library", type: "Academic", description: "Main resource center" },
    { name: "Hostel Jupiter", type: "Residential", description: "Student accommodation" },
    { name: "Hostel Neptune", type: "Residential", description: "Student accommodation" },
    { name: "Sports Complex", type: "Leisure", description: "Facilities for various sports and activities" },
    { name: "Utility Center", type: "Service", description: "Banks, shops, and essential services" }
  ];

  return (
    <div className="md:pl-64 p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Campus Map</h1>
          <p className="text-muted-foreground text-lg italic">Explore the IIT Ropar Permanent Campus</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 overflow-hidden border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Interactive View
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 aspect-video relative bg-muted/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3422.8466657904324!2d76.50508107577383!3d30.98555627446416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390554d458603615%3A0x633190a427a19280!2sIndian%20Institute%20of%20Technology%20Ropar!5e0!3m2!1sen!2sin!4v1707214567890!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/10 shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Key Landmarks
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {landmarks.map((landmark, idx) => (
                  <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{landmark.name}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary/70 px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        {landmark.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {landmark.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-primary text-primary-foreground p-6">
            <h3 className="text-xl font-bold mb-2">Navigation Tip</h3>
            <p className="opacity-90 text-sm">Use the map above to find directions between hostels and academic blocks. Zoom in to see building labels and entrances clearly.</p>
          </Card>
          <Card className="bg-accent text-accent-foreground p-6">
            <h3 className="text-xl font-bold mb-2">Accessibility</h3>
            <p className="opacity-90 text-sm">All main walkways in IIT Ropar are ramp-accessible. Battery-operated shuttles are available from the Main Gate to the hostels.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
