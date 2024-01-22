import { Injectable } from '@angular/core';
import { INote } from 'src/app/models/note';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private db: IDBDatabase;
  private dbReadySubject: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    const request = indexedDB.open('SimleNoteDB', 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.dbReadySubject.next(true);
    };

    request.onerror = (event: any) => {
      console.error('Error opening database:', event.target.error);
      this.dbReadySubject.next(false);
    };
  }

  private waitForDbReady(): Observable<boolean> {
    return this.dbReadySubject.asObservable();
  }

  
  getAllNotes(): Observable<INote[]> {
    return new Observable<INote[]>((observer) => {
      this.waitForDbReady().subscribe((isReady) => {
        if (isReady) {
          const transaction = this.db.transaction(['notes'], 'readonly');
          const objectStore = transaction.objectStore('notes');
    
          const request = objectStore.getAll();
          request.onsuccess = (event: any) => {
            const notes = event.target.result;
            observer.next(notes);
            observer.complete();
          };
          request.onerror = (event: any) => {
            console.error('Error retrieving notes:', event.target.error);
            observer.error(event.target.error);
          };
        }
      })
    });
  }

  getNoteById(id: number): Observable<INote> {
    return new Observable<INote>((observer) => {
      const transaction = this.db.transaction(['notes'], 'readonly');
      const objectStore = transaction.objectStore('notes');

      const request = objectStore.get(id);
      request.onsuccess = (event: any) => {
        const note = event.target.result;
        observer.next(note);
        observer.complete();
      };
      request.onerror = (event: any) => {
        console.error(`Error retrieving note with id ${id}:, event.target.error`);
        observer.error(event.target.error);
      };
    });
  }

  addNote(note: INote): Observable<number> {
    return new Observable<number>((observer) => {
      const transaction = this.db.transaction(['notes'], 'readwrite');
      const objectStore = transaction.objectStore('notes');

      const request = objectStore.add(note);
      request.onsuccess = (event: any) => {
        const newId = event.target.result;
        observer.next(newId);
        observer.complete();
      };
      request.onerror = (event: any) => {
        console.error('Error adding note:', event.target.error);
        observer.error(event.target.error);
      };
    });
  }
}