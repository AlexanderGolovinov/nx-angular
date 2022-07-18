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

  it('Then: I should button change text on mark finished', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="add-book-to-reading-list"]').should(
      'contain.text',
      'Want to Read'
    );
    cy.get('[data-testing="add-book-to-reading-list"]').first().click({force: true});
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="mark-finished-reading-list-item"]').first().click({force: true});
    cy.get('[data-testing="add-book-to-reading-list"]').should(
      'contain.text',
      'Finished'
    );
  });
});
