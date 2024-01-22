import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NotesComponent } from './components/notes/notes.component';
import { HeaderComponent } from './components/header/header.component';
import { NoteItemComponent } from './components/note-item/note-item.component';

import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { AppRoutingModule } from './app-routing.module';
import { NoteFormComponent } from './components/note-form/note-form.component';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
    name: 'SimpleDb',
    version: 1,
    objectStoresMeta: [{
        store: 'notes',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'title', keypath: 'title', options: { unique: false } },
            { name: 'text', keypath: 'text', options: { unique: false } },
            { name: 'date', keypath: 'date', options: { unique: false } },
            { name: 'img', keypath: 'img', options: { unique: false } },
        ]
    }]
}

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        HeaderComponent,
        NoteItemComponent,
        NoteFormComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ButtonModule,
        OrderListModule,
        AppRoutingModule,
        NgxIndexedDBModule.forRoot(dbConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
