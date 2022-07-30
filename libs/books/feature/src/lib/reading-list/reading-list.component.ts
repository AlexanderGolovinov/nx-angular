import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  undoRemoveFromReadingList,
  markBooksAsFinished
} from '@tmo/books/data-access';
import {NotificationService} from "../services/notification.service";
import {Book} from "@tmo/shared/models";

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly notificationService: NotificationService
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.notificationService
      .openSnackBar('Book removed', 'Undo')
      .onAction()
      .subscribe(() => {
        this.store.dispatch(undoRemoveFromReadingList({
          book: {
            id: item.bookId,
            title: item.title,
            authors: item.authors,
            description: item.description,
            publisher: item.publisher,
            publishedDate: item.publishedDate,
            coverUrl: item.coverUrl,
          } as Book
        }));
      });
  }

  markBooksAsFinished(item) {
    this.store.dispatch(markBooksAsFinished({ item}))
  }
}
