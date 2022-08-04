import { NgModule } from '@angular/core';
import { BooksSearchShellComponent } from './books-search-shell.component';
import { BooksUiModule } from "@tmo/books/ui";


@NgModule({
  imports: [
    BooksUiModule,
  ],
  declarations: [BooksSearchShellComponent],
  exports: [BooksSearchShellComponent],
})
export class BooksFeatureSearchModule {}
