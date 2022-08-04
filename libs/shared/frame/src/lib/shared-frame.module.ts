import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import {TotalCountComponent} from "./total-count/total-count.component";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {ReadingListComponent} from "./reading-list/reading-list.component";
import {BooksDataAccessModule} from "@tmo/books/data-access";
import {SharedComponentsModule} from "@tmo/shared/components";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    BooksDataAccessModule,
    SharedComponentsModule,
    MatBadgeModule,
  ],
  declarations: [FrameComponent, TotalCountComponent, ReadingListComponent],
  exports: [FrameComponent],
})
export class SharedFrameModule {}
