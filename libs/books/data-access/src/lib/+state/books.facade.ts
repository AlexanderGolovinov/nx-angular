import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as BookActions from './books.actions';
import * as BookSelectors from './books.selectors';
import { BooksPartialState } from './books.reducer';

@Injectable()
export class BooksFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loading$ = this.store.pipe(select(BookSelectors.getBooksLoading));
  allBooks$ = this.store.pipe(select(BookSelectors.getBooks));
  getSelectedBook$ = this.store.pipe(select(BookSelectors.getSelectedBook));

  constructor(private readonly store: Store<BooksPartialState>) {
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */

  selectBook(bookId: string): void {
    this.store.dispatch(BookActions.loadBooksDetails({bookId}));
  }
}
