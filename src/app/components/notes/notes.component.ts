import { Component } from '@angular/core';
import { INote } from 'src/app/models/note';
import { notes as data } from 'src/app/data/notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: INote[] = data;
}
