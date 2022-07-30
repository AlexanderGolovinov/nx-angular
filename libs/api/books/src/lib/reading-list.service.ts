import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markBookFinished(bookItem: ReadingListItem): Promise<void> {
    this.storage.update(list => {
      const bookIndex = list.findIndex(b => b.bookId === bookItem.bookId);
      if (bookIndex !== -1) {
        const book = list[bookIndex];
        book.finished = true;
        book.finishedDate = new Date().toISOString();
        list[bookIndex] = book;
        return list;
      }
    });
  }
}
