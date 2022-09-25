import { NgModule } from '@angular/core';
import { BooksDetailsShellComponent } from './books-details-shell.component';
import { BooksUiModule } from '@tmo/books/ui';

@NgModule({
  imports: [BooksUiModule],
  declarations: [BooksDetailsShellComponent],
})
export class BooksFeatureDetailsModule {
}
