import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookSearchComponent} from "./book-search/book-search.component";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BooksDataAccessModule} from "@tmo/books/data-access";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    BooksDataAccessModule,
  ],
  declarations: [
    BookSearchComponent,
  ],
  exports: [
    BookSearchComponent,
  ]
})
export class BooksUiModule {}
