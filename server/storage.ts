import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  projects, skills, messages,
  type Project, type InsertProject,
  type Skill, type InsertMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProjectLink(title: string, link: string): Promise<void>;
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertMessage): Promise<Skill>;
  createMessage(message: InsertMessage): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProjectLink(title: string, link: string): Promise<void> {
    await db.update(projects).set({ link }).where(eq(projects.title, title));
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(skill: any): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async createMessage(message: InsertMessage): Promise<void> {
    await db.insert(messages).values(message);
  }
}

export const storage = new DatabaseStorage();
