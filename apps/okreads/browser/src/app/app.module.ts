import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import {SharedFrameModule} from "@tmo/shared/frame";
import {CoreModule} from "./@core/core.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedFrameModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
