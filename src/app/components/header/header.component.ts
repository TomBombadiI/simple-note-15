import { Component, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class HeaderComponent {
  ref: DynamicDialogRef;

  constructor(
    private dbService: NgxIndexedDBService, 
    private router: Router,
    public dialogService: DialogService,
    public authService: AuthService,
    private confirmationService: ConfirmationService) {}

  showSignInForm() {
    this.ref = this.dialogService.open(SignInComponent, {header: 'Вход'});
  }

  signOut() {
    this.confirmationService.confirm({
      message: "Вы действительно хотите выйти?",
      header: "Подтверждение",
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.authService.signOut(), // Если пользователь нажал "Да"
    })
  }

  // Главная страница?
  isNotesRoute() { return this.router.url === "/" }
}
