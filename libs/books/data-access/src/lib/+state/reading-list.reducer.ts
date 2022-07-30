import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import {ReadingListItem} from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loading: boolean;
  loaded: boolean;
  error: null | string;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<ReadingListItem>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loading: true,
  loaded: false,
  error: null
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.initReadingList, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.addToReadingList, (state) => ({
      ...state,
      loading: true,
      error: null
    }),
  ),
  on(ReadingListActions.addToReadingListSuccess, (state, action) =>
    readingListAdapter.addOne({bookId: action.book.id, ...action.book}, {
      ...state,
      loading: false
    }),
  ),
  on(ReadingListActions.addToReadingListFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(ReadingListActions.undoRemoveFromReadingList, (state) => ({
      ...state,
      loading: true,
    }),
  ),
  on(ReadingListActions.removeFromReadingList, (state) => ({
      ...state,
      loading: true,
    }),
  ),
  on(ReadingListActions.removeFromReadingListSuccess, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, {...state, loading: false})
  ),
  on(ReadingListActions.removeFromReadingListFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error
    }),
  ),
  on(ReadingListActions.markBooksAsFinished, (state) => ({
      ...state,
      loading: true,
    }),
  ),
  on(ReadingListActions.markBooksAsFinishedSuccess, (state, action) =>
    readingListAdapter.upsertOne({
      ...action.item,
      finished: true,
      finishedDate: new Date().toISOString(),
    }, {...state, loading: false})
  ),
  on(ReadingListActions.markBooksAsFinishedFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error
    }),
  ),
  on(ReadingListActions.undoAddToReadingList, (state) => ({
      ...state,
      loading: true,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
