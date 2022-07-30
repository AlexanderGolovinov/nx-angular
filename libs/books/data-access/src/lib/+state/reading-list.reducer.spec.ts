import * as ReadingListActions from './reading-list.actions';
import {
  initialState,
  readingListAdapter,
  reducer,
  State
} from './reading-list.reducer';
import { createBook, createReadingListItem } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  const ERROR = 'ERROR';

  describe('valid Books actions', () => {
    let state: State;

    beforeEach(() => {
      state = readingListAdapter.setAll(
        [createReadingListItem('A'), createReadingListItem('B')],
        initialState
      );
    });

    it('loadBooksSuccess should load books from reading list', () => {
      const list = [
        createReadingListItem('A'),
        createReadingListItem('B'),
        createReadingListItem('C')
      ];
      const action = ReadingListActions.loadReadingListSuccess({ list });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(3);
    });

    it('loadReadingListFailure should set error', () => {
      const action = ReadingListActions.loadReadingListFailure({
        error: ERROR
      });

      const result: State = reducer(state, action);

      expect(result.error).toBe(ERROR)
    });

    it('addToReadingList should set loading to true', () => {
      const action = ReadingListActions.addToReadingList({
        book: createBook('A')
      });

      const result: State = reducer(state, action);

      expect(result.loading).toBeTruthy();
      expect(result.error).toBeNull();
    });

    it('addToReadingListSuccess should set new book and set loading false', () => {
      const action = ReadingListActions.addToReadingListSuccess({
        book: createBook('C')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['A', 'B', 'C'])
      expect(result.loading).toBeFalsy();
    });

    it('addToReadingListFailure should set error', () => {
      const action = ReadingListActions.addToReadingListFailure({
        error: ERROR
      });

      const result: State = reducer(state, action);

      expect(result.error).toEqual(ERROR);
    });

    it('removeFromReadingList should set loading true', () => {
      const action = ReadingListActions.removeFromReadingList({
        item: createReadingListItem('A')
      });

      const result: State = reducer(state, action);

      expect(result.loading).toBeTruthy();
      expect(result.error).toBeNull();
    });

    it('removeFromReadingListSuccess should set loading false and remove item', () => {
      const action = ReadingListActions.removeFromReadingListSuccess({
        item: createReadingListItem('A')
      });

      const result: State = reducer(state, action);

      expect(result.ids).toEqual(['B']);
      expect(result.loading).toBeFalsy();
    });

    it('removeFromReadingListFailure should set error', () => {
      const action = ReadingListActions.removeFromReadingListFailure({
        error: ERROR
      });

      const result: State = reducer(state, action);

      expect(result.error).toEqual(ERROR);
    });
    it('markBooksAsFinished should set loading true', () => {
      const action = ReadingListActions.markBooksAsFinished({
        item: createReadingListItem('A')
      });

      const result: State = reducer(state, action);

      expect(result.loading).toBeTruthy();
    });
    it('markBooksAsFinishedSuccess should set loading false and update reading list entity', () => {
      const item = createReadingListItem('A')
      const action = ReadingListActions.markBooksAsFinishedSuccess({
        item: item
      });

      const result: State = reducer(state, action);

      expect(result.entities['A'].finished).toBeTruthy();
      expect(result.loading).toBeFalsy();
    });
    it('markBooksAsFinishedFailure should set error', () => {
      const action = ReadingListActions.markBooksAsFinishedFailure({
        error: ERROR
      });

      const result: State = reducer(state, action);

      expect(result.error).toEqual(ERROR);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });
});
