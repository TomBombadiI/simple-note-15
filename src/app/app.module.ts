import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NotesComponent } from './components/notes/notes.component';
import { HeaderComponent } from './components/header/header.component';

import { ButtonModule } from 'primeng/button';
import { NoteItemComponent } from './components/note-item/note-item.component';

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        HeaderComponent,
        NoteItemComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
