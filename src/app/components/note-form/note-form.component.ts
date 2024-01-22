import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  providers: [ConfirmationService]
})
export class NoteFormComponent {
  title: string = '';
  text: string = '';
  img: string = '';
  private fb = new FormBuilder();

  noteForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    img: ''
  });

  constructor(private confirmationService: ConfirmationService, private router: Router,
    private dbService: NgxIndexedDBService) {}

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
    if (this.noteForm.valid) {
      this.dbService.add('notes', {
        title: this.title,
        text: this.text.replace(/<(.|\n)*?>/g, ''),
        formattedText: this.text,
        img: this.img,
        date: +(new Date()),
      }).subscribe(key => {
        this.router.navigate(['']);
      })
    }
  }
}
