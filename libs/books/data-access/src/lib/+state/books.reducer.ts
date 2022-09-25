import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '@tmo/shared/models';

import * as BooksActions from './books.actions';

export const BOOKS_FEATURE_KEY = 'books';

export interface BookState extends EntityState<Book> {
  selectedId?: string | number;
  loaded: boolean;
  loading: boolean;
  error?: string | null;
  searchTerm?: string;
}

export interface BooksPartialState {
  readonly [BOOKS_FEATURE_KEY]: BookState;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BookState = booksAdapter.getInitialState({
  selectedId: undefined,
  loaded: false,
  loading: false,
});

const booksReducer = createReducer(
  initialState,
  on(BooksActions.searchBooks, (state, {term}) => ({
    ...state,
    searchTerm: term,
    loaded: false,
    error: null
  })),
  on(BooksActions.searchBooksSuccess, (state, action) =>
    booksAdapter.setAll(action.books, {
      ...state,
      loaded: true
    })
  ),
  on(BooksActions.searchBooksFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(BooksActions.loadBooksDetails, (state, {bookId}) => ({
    ...state,
    selectedId: bookId,
    loading: true,
  })),
  on(BooksActions.loadBooksDetailsSuccess, (state, {book}) => (
    booksAdapter.setOne(book, state)
  )),
  on(BooksActions.clearSearch, state => booksAdapter.removeAll(state)),
);

export function reducer(state: BookState | undefined, action: Action) {
  return booksReducer(state, action);
}
//
// ...state,
//   selectedId: book.id,
//   loading: false
