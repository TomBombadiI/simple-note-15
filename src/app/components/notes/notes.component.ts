import { Component, OnInit, inject } from '@angular/core';
import { INote } from 'src/app/models/note';
import { IndexedDBService } from 'src/app/services/IndexedDB/indexed-db.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: INote[] = [];

  constructor(private indexedDbService: IndexedDBService) {
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.indexedDbService.getAllNotes().subscribe(
      (notes: INote[]) => {
        this.notes = notes;
      },
      (error) => {
        console.error('Error loading notes:', error);
      }
    )
  }
}
