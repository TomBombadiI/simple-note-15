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

  title: string = '';
  text: string = '';
  img: string = '';

  noteForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    img: ''
  });

  constructor(
    private confirmationService: ConfirmationService, 
    private router: Router,
    private route: ActivatedRoute,
    private dbService: NgxIndexedDBService) { }

  confirmCancel() {
    if (this.noteForm.valid) {
      this.confirmationService.confirm({
        message: "Вы действительно хотите отменить создание заметки?",
        header: "Подтверждение",
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.router.navigate(['']),
      })
    } else {
      this.router.navigate([''])
    }
  }

  chooseImg(event) {
    const file = event.target.files[0];

    document.querySelector(".input-file-text").textContent = file.name;
    this.img = file;
  }

  saveNote() {
    if (!this.noteForm.valid) return;

    if (this.router.url === '/new') {
      this.addNote();
    } else {
      const id = this.route.snapshot.paramMap.get('id')!;
      this.updateNote(+id);
    }
  }

  addNote() {
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
    if (this.router.url.includes('/edit/')) {
      const id = this.route.snapshot.paramMap.get('id')!;

      this.dbService.getByID('notes', +id).subscribe((data: INote) => {
        this.title = data.title;
        this.text = data.formattedText;
        this.img = data.img;
      })
    }
  }
}
