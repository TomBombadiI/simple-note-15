import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class NoteFormComponent {
  title: string = '';
  text: string = '';
  img: string = '';

  constructor(private confirmationService: ConfirmationService, 
    private messageService: MessageService, private router: Router,
    private dbService: NgxIndexedDBService) {
  }

  confirmCancel() {
    this.confirmationService.confirm({
      message: "Вы действительно хотите отменить создание заметки?",
      header: "Подтверждение",
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.router.navigate(['']),
    })
  }

  chooseImg(event) {
    const file = event.target.files[0];
    
    document.querySelector(".input-file-text").textContent = file.name;
    this.img = file;
  }

  addNote() {
    this.dbService.add('notes', {
      title: this.title,
      text: this.text,
      img: this.img,
      date: +(new Date()),
    }).subscribe(key => {
      console.log('key: ', key);
    })
  }
}
