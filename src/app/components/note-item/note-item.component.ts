import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INote } from "../../models/note";
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
  providers: [ConfirmationService]
})
export class NoteItemComponent {
  @Input() note!: INote;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
    ) {}

  confirmDelete() {
    this.confirmationService.confirm({
      message: "Вы действительно хотите удалить заметку?",
      header: "Подтверждение",
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.onDelete(),
    })
  }

  onDelete() {
    this.delete.emit(this.note.id);
  }

}
