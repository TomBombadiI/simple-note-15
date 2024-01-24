import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';

// Компоненты
import { NotesComponent } from './components/notes/notes.component';
import { HeaderComponent } from './components/header/header.component';
import { NoteItemComponent } from './components/note-item/note-item.component';
import { NoteFormComponent } from './components/note-form/note-form.component';

// Модули из PrimeNG
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor'
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';

// Библиотека ngx-indexed-db
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

// Конфигурация базы данных
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
        NoteFormComponent,
        SignInComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ButtonModule,
        OrderListModule,
        AppRoutingModule,
        NgxIndexedDBModule.forRoot(dbConfig),
        InputTextModule,
        EditorModule,
        FileUploadModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        PasswordModule,
        InputMaskModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
    providers: [AuthService, {provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
    bootstrap: [AppComponent]
})
export class AppModule {

}
