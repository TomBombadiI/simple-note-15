import { Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input() note!: INote; // Получаем объект заметки от родителя (компонент notes)
  // Получаем функцию delete от родителя, чтобы потом вызвать ее с передачей id заметки
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(); 

  constructor(
    // Сервис для подтверждения действия от primeNG
    private confirmationService: ConfirmationService,
    ) {}

  confirmDelete() {
    this.confirmationService.confirm({
      message: "Вы действительно хотите удалить заметку?",
      header: "Подтверждение",
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.onDelete(), // Если пользователь нажал "Да"
    })
  }

  onDelete() {
    // Вызываем delete и передаем туда id
    this.delete.emit(this.note.id);
  }

}
