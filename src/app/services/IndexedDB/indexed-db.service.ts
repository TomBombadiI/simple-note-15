import { Injectable } from '@angular/core';
import { INote } from 'src/app/models/note';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = "SimleNoteDB";
  private dbVersion = 1;
  private db: IDBDatabase;

  constructor() {
    this.initDb();
  }

  private initDb() {
    const request = window.indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      this.db = event.target.result;

      if (!this.db.objectStoreNames.contains("notes")) {
        this.db.createObjectStore("notes", { keyPath: 'id', autoIncrement: true });
      }
    }

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    }

    request.onerror = (event: any) => {
      console.log("Error opening database: ", event.target.error);
    }
  }

  async addNote(note: INote): Promise<number> {
    console.log(this.db);
    const transaction = this.db.transaction('notes', 'readwrite');
    const objectStore = transaction.objectStore('notes');

    return new Promise((resolve, reject) => {
      const request = objectStore.add(note);

      request.onsuccess = (event: any) => {
        const noteId = event.target.result;
        resolve(noteId);
      }

      request.onerror = (event: any) => {
        console.error('Error adding note:', event.target.error);
        reject(event.target.error);
      };
    }
    )
  }

  async getAllNote(): Promise<INote[]> {
    const transaction = this.db.transaction(['notes'], 'readonly');
    const objectStore = transaction.objectStore('notes');

    return new Promise((resolve, reject) => {
      const request = objectStore.getAll();
      request.onsuccess = (event: any) => {
        const notes = event.target.result;
        resolve(notes);
      };
      request.onerror = (event: any) => {
        console.error('Error retrieving notes:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async getNoteById(id: number): Promise<INote> {
    const transaction = this.db.transaction(['notes'], 'readonly');
    const objectStore = transaction.objectStore('notes');

    return new Promise((resolve, reject) => {
      const request = objectStore.getKey(id);
      request.onsuccess = (event: any) => {
        const note = event.target.result;
        resolve(note);
      };
      request.onerror = (event: any) => {
        console.error('Error retrieving note:', event.target.error);
        reject(event.target.error);
      };
    });
  }
}
