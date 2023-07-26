import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { WatertankComponent } from './components/watertank/watertank.component';
import { CamerasComponent } from './components/cameras/cameras.component';

@NgModule({
  declarations: [
    AppComponent,
    WatertankComponent,
    CamerasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
