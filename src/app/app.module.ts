import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './album/album-list.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
