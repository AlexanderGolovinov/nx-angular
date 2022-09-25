import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKS_FEATURE_KEY,
  booksAdapter,
  BooksPartialState,
  BookState
} from './books.reducer';

export const getBooksState = createFeatureSelector<BooksPartialState, BookState>(
  BOOKS_FEATURE_KEY
);

const { selectAll, selectEntities } = booksAdapter.getSelectors();

export const getBooksLoading = createSelector(
  getBooksState,
  (state: BookState) => state.loading
);

export const  getSelectedId = createSelector(
  getBooksState,
  (state: BookState) => state.selectedId
);

export const getBookEntities = createSelector(
  getBooksState,
  (state:BookState) => selectEntities(state)
)

export const getSelectedBook = createSelector(
  getBookEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
)

export const getBooksError = createSelector(
  getBooksState,
  (state: BookState) => state.error
);

export const getBooks = createSelector(getBooksState, selectAll);
