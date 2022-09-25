import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '@tmo/shared/models';
import { BooksFacade } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent {

  book$: Observable<Book> = this.booksFacade.getSelectedBook$;

  constructor(private readonly booksFacade: BooksFacade) {}

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }
}
