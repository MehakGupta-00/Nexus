import { z } from 'zod';
import {
  insertMessMenuSchema,
  insertAnnouncementSchema,
  insertLostAndFoundSchema,
  insertMarketplaceItemSchema,
  insertRideSchema,
  insertLocationSchema,
  insertAcademicEventSchema,
  insertAssignmentSchema,
  messMenus,
  announcements,
  lostAndFound,
  marketplaceItems,
  rides,
  locations,
  academicEvents,
  assignments,
  users
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  // --- Daily Pulse ---
  mess: {
    list: {
      method: 'GET' as const,
      path: '/api/mess',
      input: z.object({ date: z.string().optional() }).optional(),
      responses: {
        200: z.array(z.custom<typeof messMenus.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/mess',
      input: insertMessMenuSchema,
      responses: {
        201: z.custom<typeof messMenus.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  announcements: {
    list: {
      method: 'GET' as const,
      path: '/api/announcements',
      responses: {
        200: z.array(z.custom<typeof announcements.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/announcements',
      input: insertAnnouncementSchema,
      responses: {
        201: z.custom<typeof announcements.$inferSelect>(),
      },
    },
    // For Mail Summarizer AI feature
    summarize: {
      method: 'POST' as const,
      path: '/api/announcements/summarize',
      input: z.object({ text: z.string() }),
      responses: {
        200: z.object({ summary: z.string(), category: z.string(), priority: z.string() }),
      },
    }
  },

  // --- Student Exchange ---
  lostAndFound: {
    list: {
      method: 'GET' as const,
      path: '/api/lost-and-found',
      responses: {
        200: z.array(z.custom<typeof lostAndFound.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/lost-and-found',
      input: insertLostAndFoundSchema,
      responses: {
        201: z.custom<typeof lostAndFound.$inferSelect>(),
      },
    },
  },
  marketplace: {
    list: {
      method: 'GET' as const,
      path: '/api/marketplace',
      responses: {
        200: z.array(z.custom<typeof marketplaceItems.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/marketplace',
      input: insertMarketplaceItemSchema,
      responses: {
        201: z.custom<typeof marketplaceItems.$inferSelect>(),
      },
    },
  },
  rides: {
    list: {
      method: 'GET' as const,
      path: '/api/rides',
      responses: {
        200: z.array(z.custom<typeof rides.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/rides',
      input: insertRideSchema,
      responses: {
        201: z.custom<typeof rides.$inferSelect>(),
      },
    },
  },

  // --- Explorer ---
  locations: {
    list: {
      method: 'GET' as const,
      path: '/api/locations',
      responses: {
        200: z.array(z.custom<typeof locations.$inferSelect>()),
      },
    },
  },

  // --- Academic ---
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/academic-events',
      responses: {
        200: z.array(z.custom<typeof academicEvents.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/academic-events',
      input: insertAcademicEventSchema,
      responses: {
        201: z.custom<typeof academicEvents.$inferSelect>(),
      },
    },
  },
  assignments: {
    list: {
      method: 'GET' as const,
      path: '/api/assignments',
      responses: {
        200: z.array(z.custom<typeof assignments.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/assignments',
      input: insertAssignmentSchema,
      responses: {
        201: z.custom<typeof assignments.$inferSelect>(),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
