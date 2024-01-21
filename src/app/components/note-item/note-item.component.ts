import { Component, Input } from '@angular/core';
import { INote } from "../../models/note";

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input() note!: INote;
}
