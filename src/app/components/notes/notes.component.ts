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

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.getAll('notes').subscribe((data : INote[]) => {
      this.notes = data;
    })
  }
}
