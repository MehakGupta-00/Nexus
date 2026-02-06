import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { registerChatRoutes } from "./replit_integrations/chat";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // 1. Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // 2. Setup Chat
  registerChatRoutes(app);

  // 3. Application Routes

  // Mess
  app.get(api.mess.list.path, async (req, res) => {
    const menus = await storage.getMessMenus();
    res.json(menus);
  });
  app.post(api.mess.create.path, async (req, res) => {
    const data = api.mess.create.input.parse(req.body);
    const menu = await storage.createMessMenu(data);
    res.status(201).json(menu);
  });

  // Announcements
  app.get(api.announcements.list.path, async (req, res) => {
    const items = await storage.getAnnouncements();
    res.json(items);
  });
  app.post(api.announcements.create.path, async (req, res) => {
    const data = api.announcements.create.input.parse(req.body);
    const item = await storage.createAnnouncement(data);
    res.status(201).json(item);
  });

  // Mail Summarizer AI
  app.post(api.announcements.summarize.path, async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant that summarizes college emails.
            Extract the key information and return a JSON object with:
            - summary: One sentence action item or notice.
            - category: One of 'Academic', 'Events', 'Urgent', 'General'.
            - priority: 'high', 'normal', or 'low'.
            Output strictly valid JSON.`
          },
          { role: "user", content: text }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      res.json(result);
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ message: "Failed to summarize" });
    }
  });

  // Lost & Found
  app.get(api.lostAndFound.list.path, async (req, res) => {
    const items = await storage.getLostAndFoundItems();
    res.json(items);
  });
  app.post(api.lostAndFound.create.path, async (req, res) => {
    const data = api.lostAndFound.create.input.parse(req.body);
    const item = await storage.createLostAndFoundItem(data);
    res.status(201).json(item);
  });

  // Marketplace
  app.get(api.marketplace.list.path, async (req, res) => {
    const items = await storage.getMarketplaceItems();
    res.json(items);
  });
  app.post(api.marketplace.create.path, async (req, res) => {
    const data = api.marketplace.create.input.parse(req.body);
    const item = await storage.createMarketplaceItem(data);
    res.status(201).json(item);
  });

  // Rides
  app.get(api.rides.list.path, async (req, res) => {
    const items = await storage.getRides();
    res.json(items);
  });
  app.post(api.rides.create.path, async (req, res) => {
    const data = api.rides.create.input.parse(req.body);
    const item = await storage.createRide(data);
    res.status(201).json(item);
  });

  // Locations
  app.get(api.locations.list.path, async (req, res) => {
    const items = await storage.getLocations();
    res.json(items);
  });

  // Academic
  app.get(api.events.list.path, async (req, res) => {
    const items = await storage.getAcademicEvents();
    res.json(items);
  });
  app.post(api.events.create.path, async (req, res) => {
    const data = api.events.create.input.parse(req.body);
    const item = await storage.createAcademicEvent(data);
    res.status(201).json(item);
  });

  app.get(api.assignments.list.path, async (req, res) => {
    const items = await storage.getAssignments();
    res.json(items);
  });
  app.post(api.assignments.create.path, async (req, res) => {
    const data = api.assignments.create.input.parse(req.body);
    const item = await storage.createAssignment(data);
    res.status(201).json(item);
  });

  return httpServer;
}

// Seed function to populate data if empty
async function seedDatabase() {
  const menus = await storage.getMessMenus();
  if (menus.length === 0) {
    await storage.createMessMenu({
      date: new Date(),
      dayOfWeek: "Monday",
      mealType: "Lunch",
      items: ["Rice", "Dal Makhani", "Paneer Butter Masala", "Roti", "Salad"],
      calories: 850,
      rating: 4,
      votes: 120
    });
    await storage.createMessMenu({
      date: new Date(),
      dayOfWeek: "Monday",
      mealType: "Dinner",
      items: ["Fried Rice", "Manchurian", "Noodles"],
      calories: 900,
      rating: 5,
      votes: 200
    });
  }

  const locs = await storage.getLocations();
  if (locs.length === 0) {
    await storage.createLocation({
      name: "Main Library",
      description: "Quiet study spot with AC",
      category: "Study Spot",
      vibes: ["Quiet", "Serious", "AC"],
      rating: 5
    });
    await storage.createLocation({
      name: "Student Center",
      description: "Hub for club activities and hangout",
      category: "Attraction",
      vibes: ["Crowded", "Fun", "Music"],
      rating: 4
    });
  }
}

// Run seed asynchronously
seedDatabase().catch(err => console.error("Seed failed:", err));
