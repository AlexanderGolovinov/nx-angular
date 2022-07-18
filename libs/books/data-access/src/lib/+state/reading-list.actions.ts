import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const initReadingList = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListFailure = createAction(
  '[Reading List API] Load list failure',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const addToReadingListSuccess = createAction(
  '[Reading List API] Add to list success',
  props<{ book: Book }>()
);

export const addToReadingListFailure = createAction(
  '[Reading List API] Add to list failure',
  props<{ error: any }>()
);

export const removeFromReadingList = createAction(
  '[Reading List Sidenav] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListSuccess = createAction(
  '[Reading List API] Remove from list success',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingListFailure = createAction(
  '[Reading List API] Remove from list failure',
  props<{ error: any }>()
);

export const markBooksAsFinished = createAction(
  '[Reading List Sidenav] Mark books as finished',
  props<{ item: ReadingListItem }>()
);

export const markBooksAsFinishedSuccess = createAction(
  '[Reading List API] Mark books as finished success',
  props<{ item: ReadingListItem }>()
);

export const markBooksAsFinishedFailure = createAction(
  '[Reading List API] Mark books as finished failure',
  props<{ error: any }>()
);
