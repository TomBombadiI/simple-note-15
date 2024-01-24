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
      this.notes = data;
      this.notes.sort((a, b) => b.date - a.date);
    })
  }

  loadNotes() {
    // Через сервис, предоставляемый библиотекой ngx-indexed-db
    // Получаем все записи из таблицы notes
    this.dbService.getAll('notes').subscribe((data: INote[]) => {
      this.notes = data;
      this.notes.sort((a, b) => b.date - a.date); // Сортируем заметки по дате
    });
  }

  constructor(private dbService: NgxIndexedDBService) {
    this.loadNotes();
  }
}
