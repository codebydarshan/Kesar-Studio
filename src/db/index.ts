import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema/index";

let _db: NeonHttpDatabase<typeof schema> | null = null;

function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const database = getDb();
    const value = database[prop as keyof NeonHttpDatabase<typeof schema>];
    if (typeof value === "function") {
      return value.bind(database);
    }
    return value;
  },
});

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export type {
  User,
  NewUser,
  UserRole,
  TeamMember,
  NewTeamMember,
  Project,
  NewProject,
  ProjectImage,
  NewProjectImage,
  Technology,
  NewTechnology,
  ProjectTechnology,
  NewProjectTechnology,
  Testimonial,
  NewTestimonial,
  Lead,
  NewLead,
  LeadStatus,
} from "./schema/index";
