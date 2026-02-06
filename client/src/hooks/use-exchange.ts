import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { 
  InsertLostAndFoundItem, 
  InsertMarketplaceItem,
  InsertRide
} from "@shared/schema";

// --- Lost & Found ---
export function useLostAndFound() {
  return useQuery({
    queryKey: [api.lostAndFound.list.path],
    queryFn: async () => {
      const res = await fetch(api.lostAndFound.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch items");
      return api.lostAndFound.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLostAndFound() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLostAndFoundItem) => {
      const res = await fetch(api.lostAndFound.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to report item");
      return api.lostAndFound.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.lostAndFound.list.path] });
      toast({ title: "Reported", description: "Item has been listed" });
    },
  });
}

// --- Marketplace ---
export function useMarketplace() {
  return useQuery({
    queryKey: [api.marketplace.list.path],
    queryFn: async () => {
      const res = await fetch(api.marketplace.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch marketplace");
      return api.marketplace.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateMarketplaceItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMarketplaceItem) => {
      const res = await fetch(api.marketplace.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to list item");
      return api.marketplace.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.marketplace.list.path] });
      toast({ title: "Listed", description: "Item is now for sale" });
    },
  });
}

// --- Rides ---
export function useRides() {
  return useQuery({
    queryKey: [api.rides.list.path],
    queryFn: async () => {
      const res = await fetch(api.rides.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch rides");
      return api.rides.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateRide() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRide) => {
      const res = await fetch(api.rides.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to schedule ride");
      return api.rides.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.rides.list.path] });
      toast({ title: "Scheduled", description: "Ride created successfully" });
    },
  });
}
