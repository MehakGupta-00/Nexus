import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertAnnouncement } from "@shared/schema";

export function useAnnouncements() {
  return useQuery({
    queryKey: [api.announcements.list.path],
    queryFn: async () => {
      const res = await fetch(api.announcements.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch announcements");
      return api.announcements.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertAnnouncement) => {
      const validated = api.announcements.create.input.parse(data);
      const res = await fetch(api.announcements.create.path, {
        method: api.announcements.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to create announcement");
      return api.announcements.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.announcements.list.path] });
      toast({ title: "Posted", description: "Announcement shared with everyone" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to post announcement", variant: "destructive" });
    }
  });
}

export function useSummarizeEmail() {
  return useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch(api.announcements.summarize.path, {
        method: api.announcements.summarize.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Summarization failed");
      return api.announcements.summarize.responses[200].parse(await res.json());
    }
  });
}
