import * as idb from "idb";
import { IdbStore, Note, Project } from "../../types/state";

export type IdbInstance = typeof IDB

export default abstract class IDB {
  private static async openDB() {
    return await idb.openDB<IdbStore>("np-app", 1, {
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

  private static async initTx() {
    const db = await this.openDB();
    const tx = db.transaction(["projects", "notes"], "readwrite");
    return { projectStore: tx.objectStore("projects"), noteStore: tx.objectStore("notes") };
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
    return [];
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
      db.put("notes", note);
    });
  }

  static async addProject(project: Project) {
    const db = await this.openDB();
    project.notes = [] as Note[];
    await db.add("projects", project);
  }

  static async getNote(id: string) {
    const db = await this.openDB();
    const note = await db.get("notes", id);
    if (!note) throw new Error("Note not found");
    return note;
  }

  static async getProject(id: string) {
    const db = await this.openDB();
    const project = await db.get("projects", id);
    if (!project) throw new Error("Project not found");
    return project;
  }

  static async saveProjects(projects: Project[]) {
    const db = await this.openDB();
    projects.forEach((project) => {
      db.put("projects", project);
    });
  }

  static async addNote(note: Note) {
    const { projectStore, noteStore } = await this.initTx();

    // If is the default project
    if (note.project === "default") {
      await noteStore.add(note);
      return;
    }
    //   Save to project
    const project = await projectStore.get(note.project);
    if (!project) throw new Error("Project not found");
    project.notes.push(note);
    await projectStore.put(project);
    //   Save to notes
    await noteStore.add(note);
  }

  static async updateNote(note: Note) {
    const { projectStore, noteStore } = await this.initTx();

    if (note.project === "default") {
      await noteStore.put(note);
      return;
    }

    const project = await projectStore.get(note.project);
    if (!project) throw new Error("Project not found");
    const index = project.notes.findIndex((n) => n.id === note.id);
    project.notes[index] = note;
    await projectStore.put(project);
  }

  static async deleteNote(noteId: string) {
    const { projectStore, noteStore } = await this.initTx();

    const note = await noteStore.get(noteId);
    if (!note) throw new Error("Note not found");
    await noteStore.delete(noteId);

    if (note.project === "default") return;

    const project = await projectStore.get(note.project);
    if (!project) throw new Error("Project not found");
    const index = project.notes.findIndex((n) => n.id === note.id);
    project.notes.splice(index, 1);
    await projectStore.put(project);

  }
}