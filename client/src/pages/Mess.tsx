import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { useMessMenu, useCreateMessMenu } from "@/hooks/use-mess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, addDays } from "date-fns";
import { Plus, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessMenuSchema } from "@shared/schema";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const schema = insertMessMenuSchema.extend({
  items: z.string().transform(str => str.split(',').map(s => s.trim()).filter(Boolean)),
  date: z.coerce.date(),
});

type FormValues = z.infer<typeof schema>;

export default function Mess() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: menu, isLoading } = useMessMenu(format(selectedDate, "yyyy-MM-dd"));
  const [isCreateOpen, setCreateOpen] = useState(false);
  const createMutation = useCreateMessMenu();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      dayOfWeek: format(new Date(), "EEEE"),
      mealType: "Breakfast",
      items: [],
      rating: 0,
      votes: 0
    }
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data as any, {
      onSuccess: () => {
        setCreateOpen(false);
        form.reset();
      }
    });
  };

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  return (
    <PageContainer
      title="Mess Menu"
      description="What's cooking today?"
      action={
        <Dialog open={isCreateOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-4 h-4" /> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Mess Menu Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" {...form.register("date")} />
              </div>
              <div className="space-y-2">
                <Label>Day of Week</Label>
                <Input {...form.register("dayOfWeek")} placeholder="e.g. Monday" />
              </div>
              <div className="space-y-2">
                <Label>Meal Type</Label>
                <Select onValueChange={(val) => form.setValue("mealType", val)} defaultValue="Breakfast">
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Items (comma separated)</Label>
                <Textarea {...form.register("items" as any)} placeholder="Rice, Dal, Paneer..." />
              </div>
              <Button type="submit" disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Menu"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Date Selector */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
        {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
          const date = addDays(new Date(), offset);
          const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          return (
            <button
              key={offset}
              onClick={() => setSelectedDate(date)}
              className={`
                flex flex-col items-center min-w-[4.5rem] p-3 rounded-xl border transition-all
                ${isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105" 
                  : "bg-card hover:border-primary/50 text-muted-foreground"}
              `}
            >
              <span className="text-xs font-medium uppercase">{format(date, "EEE")}</span>
              <span className="text-lg font-bold">{format(date, "d")}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mealTypes.map((type) => {
          const meal = menu?.find(m => m.mealType === type);
          
          return (
            <Card key={type} className={`h-full border-t-4 ${meal ? 'border-t-green-500' : 'border-t-gray-200'}`}>
              <CardHeader>
                <CardTitle className="text-lg">{type}</CardTitle>
                <CardDescription>
                  {meal ? `${meal.calories || 'N/A'} kcal` : "Not updated"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                  </div>
                ) : meal ? (
                  <ul className="space-y-2">
                    {meal.items?.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Menu not available yet.</p>
                )}
                
                {meal && (
                   <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {meal.rating || 0}/5
                    </div>
                    <div>{meal.votes || 0} votes</div>
                   </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
