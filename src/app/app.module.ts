import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { NodesComponent } from './components/nodes/nodes.component';
import { HeaderComponent } from './components/header/header.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [
        AppComponent,
        NodesComponent,
        HeaderComponent
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
