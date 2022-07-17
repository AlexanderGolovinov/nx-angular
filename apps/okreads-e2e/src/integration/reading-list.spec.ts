describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should see my reading list and notification popup', () => {
    cy.get('input[type="search"]').type('java');
    cy.get('form').submit();

    cy.get('[data-testing="add-book-to-reading-list"]').first().click().then(() => {
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="remove-reading-list-item"]').click()
      cy.get('simple-snack-bar').should(
        'contain.text',
        'Book removed'
      );
    });
  });
});
