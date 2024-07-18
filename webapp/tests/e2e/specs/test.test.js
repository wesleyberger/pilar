describe('Details Page', () => {
  it('renders movie details correctly', () => {
    cy.visit('/details/1');
    cy.get('h1').should('contain', 'Movie Title');
    cy.get('p').should('contain', 'Release Date: 2024-07-01');
    cy.get('.genres').should('contain', 'Action, Adventure');
    cy.get('.tagline').should('contain', 'An epic movie');
    cy.get('.overview').should('contain', 'This is a great movie.');
    cy.get('.budget').should('contain', 'Budget: $100,000,000');
    cy.get('.revenue').should('contain', 'Revenue: $200,000,000');
    cy.get('.runtime').should('contain', 'Runtime: 120 minutes');
    cy.get('.language').should('contain', 'Language: English');
    cy.get('.status').should('contain', 'Status: Released');
    cy.get('.popularity').should('contain', 'Popularity: 10.0');
    cy.get('.vote-average').should('contain', 'Vote Average: 8.5');
    cy.get('.vote-count').should('contain', 'Vote Count: 1000');
    cy.get('.production-companies').should('contain', 'Company One');
    cy.get('.production-countries').should('contain', 'Country One');
    cy.get('.homepage').should('have.attr', 'href', 'https://example.com');
    cy.get('.poster').should('have.attr', 'src', '/poster.jpg');
    cy.get('.backdrop').should('have.attr', 'src', '/backdrop.jpg');
    cy.get('.cast').should('have.length', 2);
    cy.get('.cast').eq(0).should('contain', 'Actor One');
    cy.get('.cast').eq(1).should('contain', 'Actor Two');
  });
});