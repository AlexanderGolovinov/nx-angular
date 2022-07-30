import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.initReadingList),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListFailure({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList, ReadingListActions.undoRemoveFromReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.addToReadingListSuccess({ book })),
          catchError((error) =>
            of(ReadingListActions.addToReadingListFailure({ error }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList, ReadingListActions.undoAddToReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.removeFromReadingListSuccess({ item })
          ),
          catchError((error) =>
            of(ReadingListActions.removeFromReadingListFailure({ error }))
          )
        )
      )
    )
  );

  markBookFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.markBooksAsFinished),
      concatMap(({item}) =>
        this.http.put(`/api/reading-list/${item.bookId}/finished`, item).pipe(
          map(() =>
            ReadingListActions.markBooksAsFinishedSuccess({ item })
          ),
          catchError((error) =>
            of(ReadingListActions.markBooksAsFinishedFailure( { error }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.initReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
