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

export const undoAddToReadingList = createAction(
  '[Books Search Results] Undo add to list',
  props<{ item: ReadingListItem }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
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

export const undoRemoveFromReadingList = createAction(
  '[Books Search Results] Undo remove from list',
  props<{ book: Book }>()
);
