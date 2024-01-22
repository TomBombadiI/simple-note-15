import { Component, inject } from '@angular/core';
import { IndexedDBService } from 'src/app/services/IndexedDB/indexed-db.service';
import { notes as data } from 'src/app/data/notes';
import { INote } from 'src/app/models/note'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  indexedDbService = inject(IndexedDBService);
  notes = data;

  constructor() {
  }

  addNote(note: INote) {
    this.indexedDbService.addNote(note).then(res => {
      if (res) {
        console.log(true);
      }
    })
  }
}
