import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertMessMenu } from "@shared/schema";

export function useMessMenu(date?: string) {
  return useQuery({
    queryKey: [api.mess.list.path, date],
    queryFn: async () => {
      const url = date 
        ? `${api.mess.list.path}?date=${date}` 
        : api.mess.list.path;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch mess menu");
      return api.mess.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMessMenu() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessMenu) => {
      const validated = api.mess.create.input.parse(data);
      const res = await fetch(api.mess.create.path, {
        method: api.mess.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create menu");
      }
      return api.mess.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.mess.list.path] });
      toast({ title: "Success", description: "Menu added successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  });
}
