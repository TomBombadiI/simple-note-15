import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, Validators } from '@angular/forms';
import { INote } from '../../models/note'

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  providers: [ConfirmationService]
})
export class NoteFormComponent implements OnInit {
  private fb = new FormBuilder();

  // Эти свойства связаны с полями из формы
  title: string = '';
  text: string = '';
  img: string = '';

  // Подключаем реактивность
  noteForm = this.fb.group({
    title: ['', Validators.required], // свойство обязательно для заполнения
    text: ['', Validators.required], // свойство обязательно для заполнения
    img: ''
  });

  constructor(
    private confirmationService: ConfirmationService, 
    private router: Router,
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService) { }

  // Подтверждение отмены добавления/изменения заметки
  confirmCancel() {
    if (this.noteForm.valid) { // Спрашиваем только если форма валидна
      this.confirmationService.confirm({
        message: "Вы действительно хотите отменить сохранение заметки?",
        header: "Подтверждение",
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.router.navigate(['']), // Отправляем на главную, если пользователь подтвердил отмену
      })
    } else {
      // Если форма невалидна, то сразу отправляем на главную
      this.router.navigate([''])
    }
  }

  // Для работы кастомного input. Имя выбранного файла отправляем в .input-file-text
  chooseImg(event) {
    const file = event.target.files[0];

    document.querySelector(".input-file-text").textContent = file.name;
    this.img = file; // Запоминаем выбранный файл, хотя пока это не надо, все равно не работает :)
  }

  saveNote() {
    if (!this.noteForm.valid) return; // Если форма невалидна, не сохраняем

    if (this.router.url === '/new') { // Если создается новая заметка
      this.addNote();
    } else {
      // Если заметка редактируется 
      const id = this.route.snapshot.paramMap.get('id')!; // получаем id из адреса
       this.updateNote(+id);
    }
  }

  addNote() {
    this.dbService.add('notes', {
      title: this.title,
      text: this.text.replace(/<(.|\n)*?>/g, ''), // Здесь хранится текст без тегов
      formattedText: this.text,
      img: this.img,
      date: +(new Date()), // текущее время в миллисекундах
    }).subscribe(key => {
      this.router.navigate(['']); // если успех, но вовзращаемся на главную
    })
  }

  updateNote(noteId: number) {
    this.dbService.update('notes', {
      id: noteId,
      title: this.title,
      text: this.text.replace(/<(.|\n)*?>/g, ''),
      formattedText: this.text,
      img: this.img,
      date: +(new Date())
    }).subscribe(() => {
      this.router.navigate(['']);
    })
  }

  ngOnInit() {
    if (this.router.url.includes('/edit/')) { // Если страница редактирования
      const id = this.route.snapshot.paramMap.get('id')!; // Берем id из адреса

      // Достаем заметку по id
      this.dbService.getByID('notes', +id).subscribe((data: INote) => {
        this.title = data.title; 
        this.text = data.formattedText;
        this.img = data.img;
      })
    }
  }
}
