import { Component, inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dbService: NgxIndexedDBService, private router: Router) {
  }

  isNewNoteRoute() { return this.router.url === "/new" }
  isNotesRoute() { return this.router.url === "/" }

}
