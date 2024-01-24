import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [DialogService]
})
export class SignInComponent implements OnInit {
  private fb = new FormBuilder();

  email: string = '';
  password: string = '';

  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  constructor(
    public authService: AuthService,
    private ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
  }

  async signIn() {
    const signin = this.authService.signIn(this.email, this.password);

    signin.then((result) => {
      this.ref.close();
    })
    .catch(error => {
      alert("Ошибка ввхода!");
    })
  }
}
