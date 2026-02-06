import { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { useAnnouncements, useCreateAnnouncement, useSummarizeEmail } from "@/hooks/use-announcements";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Loader2, Sparkles, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAnnouncementSchema } from "@shared/schema";
import { z } from "zod";

const schema = insertAnnouncementSchema;
type FormValues = z.infer<typeof schema>;

export default function Announcements() {
  const { data: announcements, isLoading } = useAnnouncements();
  const createMutation = useCreateAnnouncement();
  const summarizeMutation = useSummarizeEmail();
  
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [emailText, setEmailText] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      category: "General",
      priority: "normal",
      source: "Student Body"
    }
  });

  const handleSummarize = () => {
    if (!emailText) return;
    summarizeMutation.mutate(emailText, {
      onSuccess: (data) => {
        form.setValue("content", data.summary);
        form.setValue("category", data.category);
        form.setValue("priority", data.priority as any);
        // Maybe extract title from first line or let user set it
        form.setValue("title", "AI Summarized Update");
      }
    });
  };

  const onSubmit = (data: FormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setCreateOpen(false);
        form.reset();
        setEmailText("");
      }
    });
  };

  return (
    <PageContainer
      title="Announcements"
      description="Stay updated with campus news."
      action={
        <Dialog open={isCreateOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 shadow-lg">
              <Plus className="w-4 h-4" /> Post Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Announcement</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* AI Summarizer Section */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-border/50">
                <Label className="flex items-center gap-2 mb-2 text-primary">
                  <Sparkles className="w-4 h-4" /> 
                  AI Mail Summarizer
                </Label>
                <Textarea 
                  placeholder="Paste a long email here to auto-generate the announcement..." 
                  className="mb-2 h-24 text-sm"
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                />
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={handleSummarize}
                  disabled={summarizeMutation.isPending || !emailText}
                >
                  {summarizeMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
                  Summarize & Fill Form
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or write manually</span>
                </div>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input {...form.register("title")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input {...form.register("source")} placeholder="e.g. Dean's Office" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea {...form.register("content")} className="h-32" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input {...form.register("category")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select onValueChange={(val) => form.setValue("priority", val)} defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" disabled={createMutation.isPending} className="w-full">
                  {createMutation.isPending ? "Posting..." : "Post Announcement"}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-4 max-w-3xl mx-auto">
        {isLoading ? (
           [1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />)
        ) : announcements?.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <div className="flex gap-2 text-xs text-muted-foreground">
                    <span>{format(new Date(item.date || new Date()), "PPP")}</span>
                    <span>•</span>
                    <span>{item.source}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                     {item.priority}
                   </Badge>
                   <Badge variant="outline">{item.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
