import { Component, OnInit, inject } from '@angular/core';
import { INote } from 'src/app/models/note';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: INote[] = [];

  deleteNote(id: number) {
    this.dbService.delete('notes', id).subscribe((data: INote[]) => {
      console.log(data)
      this.notes = data;
    })
  }

  loadNotes() {
    this.dbService.getAll('notes').subscribe((data : INote[]) => {
      this.notes = data;
      data.sort((a, b) => b.date - a.date);
    })
  }

  constructor(private dbService: NgxIndexedDBService) {
    this.loadNotes();
  }


}
