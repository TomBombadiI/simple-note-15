import { Component, Input } from '@angular/core';
import { INote } from "../../models/note";
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input() note!: INote;

  constructor(private router: Router) {}
}
