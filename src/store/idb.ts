import * as idb from "idb";
import { Note, Project } from "../../types/state";

export default class IDB {
  static async openDB() {
    return await idb.openDB<{
      projects: {
        key: string;
        value: Project
      },
      notes: {
        key: string;
        value: Note
      }
    }>("np-app", 1, {
      upgrade(db) {
        db.createObjectStore("projects", {
          keyPath: "id"
        });
        db.createObjectStore("notes", {
          keyPath: "id"
        });
      }
    });
  }

  static async getProjects() {
    const db = await this.openDB();
    if (await db.count("projects")) {
      return await db.getAll("projects");
    }
    // If there is no projects make a request
    // to the server and save it to the database
    await this.saveProjects([]);
    return [];
  }

  static async getNotes() {
    const db = await this.openDB();
    if (await db.count("notes")) {
      return await db.getAll("notes");
    }
    await this.saveNotes([]);
    return []
  }

  static async getProjectNotes(id: string) {
    const db = await this.openDB();
    const project = await db.get("projects", id);
    if (!project) throw new Error("Project not found");
    return project.notes;
  }

  static async saveNotes(notes: Note[]) {
    const db = await this.openDB();
    notes.forEach((note) => {
      db.add("notes", note);
    });
  }

  static async addProject(project: Project) {
    const db = await this.openDB();
    project.notes = [] as Note[];
    await db.add("projects", project);
  }

  static async getProject(id: string) {
    const db = await this.openDB();
    return await db.get("projects", id);
  }

  static async saveProjects(projects: Project[]) {
    const db = await this.openDB();
    projects.forEach((project) => {
      db.add("projects", project);
    });
  }

  static async addNote(note: Note) {
    const db = await this.openDB();
    // Save to project
    const project = await db.get("projects", note.project);
    if (!project) throw new Error("Project not found");
    project.notes.push(note);
    await db.put("projects", project);
    // Save to notes
    await db.add("notes", note);
  }
}