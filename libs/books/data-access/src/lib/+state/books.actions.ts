import { createAction, props } from '@ngrx/store';
import { Book } from '@tmo/shared/models';

export const searchBooks = createAction(
  '[Books Search Bar] Search',
  props<{ term: string }>()
);

export const searchBooksSuccess = createAction(
  '[Book Search API] Search success',
  props<{ books: Book[] }>()
);

export const searchBooksFailure = createAction(
  '[Book Search API] Search Failure',
  props<{ error: any }>()
);

export const loadBooksDetails = createAction(
  '[Books Search Page] Load Book Details',
  props<{ bookId: string }>()
);

export const loadBooksDetailsSuccess = createAction(
  '[Book Search API] Details Action Success',
  props<{ book: Book }>()
);

export const loadBooksDetailsFailure = createAction(
  '[Book Search API] SDetails Action Failure',
  props<{ error: any }>()
);

export const clearSearch = createAction('[Books Search Bar] Clear Search');
