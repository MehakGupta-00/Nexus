import {
  messMenus, announcements, lostAndFound, marketplaceItems, rides,
  locations, academicEvents, assignments,
  type MessMenu, type InsertMessMenu,
  type Announcement, type InsertAnnouncement,
  type LostAndFoundItem, type InsertLostAndFoundItem,
  type MarketplaceItem, type InsertMarketplaceItem,
  type Ride, type InsertRide,
  type Location, type InsertLocation,
  type AcademicEvent, type InsertAcademicEvent,
  type Assignment, type InsertAssignment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Mess
  getMessMenus(date?: Date): Promise<MessMenu[]>;
  createMessMenu(menu: InsertMessMenu): Promise<MessMenu>;

  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;

  // Lost & Found
  getLostAndFoundItems(): Promise<LostAndFoundItem[]>;
  createLostAndFoundItem(item: InsertLostAndFoundItem): Promise<LostAndFoundItem>;

  // Marketplace
  getMarketplaceItems(): Promise<MarketplaceItem[]>;
  createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem>;

  // Rides
  getRides(): Promise<Ride[]>;
  createRide(ride: InsertRide): Promise<Ride>;

  // Locations
  getLocations(): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;

  // Academic
  getAcademicEvents(): Promise<AcademicEvent[]>;
  createAcademicEvent(event: InsertAcademicEvent): Promise<AcademicEvent>;
  getAssignments(): Promise<Assignment[]>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
}

export class DatabaseStorage implements IStorage {
  // Mess
  async getMessMenus(date?: Date): Promise<MessMenu[]> {
    // For simplicity, return all if no date, or filter by date
    // In a real app, strict date filtering
    return await db.select().from(messMenus);
  }
  async createMessMenu(menu: InsertMessMenu): Promise<MessMenu> {
    const [newMenu] = await db.insert(messMenus).values(menu).returning();
    return newMenu;
  }

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements).orderBy(desc(announcements.date));
  }
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const [newItem] = await db.insert(announcements).values(announcement).returning();
    return newItem;
  }

  // Lost & Found
  async getLostAndFoundItems(): Promise<LostAndFoundItem[]> {
    return await db.select().from(lostAndFound).orderBy(desc(lostAndFound.dateReported));
  }
  async createLostAndFoundItem(item: InsertLostAndFoundItem): Promise<LostAndFoundItem> {
    const [newItem] = await db.insert(lostAndFound).values(item).returning();
    return newItem;
  }

  // Marketplace
  async getMarketplaceItems(): Promise<MarketplaceItem[]> {
    return await db.select().from(marketplaceItems).orderBy(desc(marketplaceItems.dateListed));
  }
  async createMarketplaceItem(item: InsertMarketplaceItem): Promise<MarketplaceItem> {
    const [newItem] = await db.insert(marketplaceItems).values(item).returning();
    return newItem;
  }

  // Rides
  async getRides(): Promise<Ride[]> {
    return await db.select().from(rides).orderBy(desc(rides.date));
  }
  async createRide(ride: InsertRide): Promise<Ride> {
    const [newItem] = await db.insert(rides).values(ride).returning();
    return newItem;
  }

  // Locations
  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }
  async createLocation(location: InsertLocation): Promise<Location> {
    const [newItem] = await db.insert(locations).values(location).returning();
    return newItem;
  }

  // Academic
  async getAcademicEvents(): Promise<AcademicEvent[]> {
    return await db.select().from(academicEvents).orderBy(desc(academicEvents.startTime));
  }
  async createAcademicEvent(event: InsertAcademicEvent): Promise<AcademicEvent> {
    const [newItem] = await db.insert(academicEvents).values(event).returning();
    return newItem;
  }

  async getAssignments(): Promise<Assignment[]> {
    return await db.select().from(assignments).orderBy(desc(assignments.dueDate));
  }
  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [newItem] = await db.insert(assignments).values(assignment).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
