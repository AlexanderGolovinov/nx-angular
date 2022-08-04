import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks, undoAddToReadingList,
} from '@tmo/books/data-access';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormBuilder} from '@angular/forms';
import {Book, ReadingListItem} from '@tmo/shared/models';
import {NotificationService} from "@tmo/shared/components";

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });

    this.searchForm
      .get('term').valueChanges
      .pipe(debounceTime(500), distinctUntilChanged((prev: string, curr: string) => {
        //If just space is added, the search didnt change. Skip api call.
        return curr.trim() === prev
      }))
      .subscribe(() => {
        this.searchBooks();
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({book}));
    this.notificationService
      .openSnackBar('Book added', 'Undo')
      .onAction()
      .subscribe(() => {
        this.store.dispatch(undoAddToReadingList({
          item: {
            bookId: book.id,
            title: book.title,
            authors: book.authors,
            description: book.description,
            publisher: book.publisher,
            publishedDate: book.publishedDate,
            coverUrl: book.coverUrl,
          } as ReadingListItem
        }));
      });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
