## Code review

1. `books/data-access` Inconsistency in naming convention in Actions:

   Good: _searchBooks / searchBooksSuccess / searchBooksFailure_

   Code smell: _addToReadingList / confirmedAddToReadingList/ failedAddToReadingList_



2. Potentially buggy behavior inside the reducers.

   Example of code smell: **addToReadingList**

   `ReadingListActions.addToReadingList` is an initialization action, but this action is also handling the addition of item to the state inside the reducer.

   `readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)`

   Problem: the addition of item happens before the successful response from the server inside the effect `addBook$`. If server returns an error 400/500 etc, then the item would be still added to the state. And then should be handled to **Remove** the item from the state.
   All this issue could be avoided if addition of an item would happen on successful api response inside the `addBook$` effects.
   `...map(() => ReadingListActions.confirmedAddToReadingList({ book })),`

3. Some of the actions dont have any implementation inside the reducer.

   Example: `ReadingListActions.failedAddToReadingList, ReadingListActions.confirmedRemoveFromReadingList`
   These actions suppose to set error and handle addition of elements inside the reducer.

4. Adding readingListItem is `ReadingListActions.addToReadingList` is adding `book: Book`.

   Removing operation is `ReadingListActions.removeFromReadingList` is removing `item: ReadingListItem`

   Inconsistent object types operations

6. The UI could be / should be responsive

## Accessibility
• Buttons do not have an accessible name

• Background and foreground colors do not have a sufficient contrast ratio

• Images missing _**alt**_ attribute

• Fonts are quite small

• Missing useful error notifications/messages to give user some information 
