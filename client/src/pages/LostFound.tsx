import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { useLostAndFound, useCreateLostAndFound } from "@/hooks/use-exchange";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Search, MapPin, Tag, Plus, Image as ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLostAndFoundSchema } from "@shared/schema";
import { z } from "zod";

const schema = insertLostAndFoundSchema;
type FormValues = z.infer<typeof schema>;

export default function LostFound() {
  const { data: items, isLoading } = useLostAndFound();
  const createMutation = useCreateLostAndFound();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all, lost, found

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: "lost"
    }
  });

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateOpen(false);
        form.reset();
      }
    });
  };

  const filteredItems = items?.filter(item => 
    filter === "all" ? true : item.status === filter
  );

  return (
    <PageContainer
      title="Lost & Found"
      description="Reuniting items with their owners."
      action={
        <Dialog open={isCreateOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg">
              <Plus className="w-4 h-4" /> Report Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Lost or Found Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>I have...</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="lost" {...form.register("status")} className="accent-primary" />
                    <span>Lost something</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="found" {...form.register("status")} className="accent-primary" />
                    <span>Found something</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...form.register("title")} placeholder="e.g. Blue Hydro Flask" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea {...form.register("description")} placeholder="Details about the item..." />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input {...form.register("location")} placeholder="Where was it lost/found?" />
              </div>
              <div className="space-y-2">
                <Label>Contact Info</Label>
                <Input {...form.register("contactInfo")} placeholder="Phone or email" />
              </div>
              <div className="space-y-2">
                <Label>Image URL (Optional)</Label>
                <Input {...form.register("imageUrl")} placeholder="https://..." />
              </div>
              <Button type="submit" disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === "all" ? "default" : "outline"} 
          onClick={() => setFilter("all")}
          size="sm"
        >
          All Items
        </Button>
        <Button 
          variant={filter === "lost" ? "default" : "outline"} 
          onClick={() => setFilter("lost")}
          size="sm"
          className={filter === "lost" ? "bg-red-500 hover:bg-red-600" : ""}
        >
          Lost
        </Button>
        <Button 
          variant={filter === "found" ? "default" : "outline"} 
          onClick={() => setFilter("found")}
          size="sm"
          className={filter === "found" ? "bg-green-500 hover:bg-green-600" : ""}
        >
          Found
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />)
        ) : filteredItems?.map((item) => (
          <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-48 bg-muted relative">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge className={item.status === 'lost' ? 'bg-red-500' : 'bg-green-500'}>
                  {item.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <CardContent className="pt-4">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="w-4 h-4" />
                  {format(new Date(item.dateReported || new Date()), "MMM d, yyyy")}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
               <p className="text-xs font-mono text-muted-foreground truncate w-full">
                 Contact: {item.contactInfo || 'N/A'}
               </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
