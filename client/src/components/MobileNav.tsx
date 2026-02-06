import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden fixed top-4 right-4 z-50 bg-card shadow-md">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 border-r-0">
        <div className="[&>div]:relative [&>div]:flex [&>div]:w-full [&>div]:border-none [&>div]:h-full [&>div]:static">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
