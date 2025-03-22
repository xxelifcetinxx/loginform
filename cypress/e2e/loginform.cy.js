describe('Login Test', () => {
  beforeEach(() => {
      cy.visit("http://localhost:5174");
    });
  
  it('Form doldurulduğunda submit edilir', () => {
   
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home'); 
  });

  it('Email yanlış:', () => {
      
      cy.get('input[name="email"]').type('hfhf@');
      cy.get('[data-cy="error-message"]').should("have.length", 1);
      cy.get('button[type="submit"]').should('be.disabled');
  })

  it('email ve password yanlış:', () => {
      
      cy.get('input[name="email"]').type('abab@');
      cy.gety('input[name="password"]').type('123');
      cy.get('[data-cy="error-message"]').should("have.length", 2);
      cy.get('button[type="submit"]').should('be.disabled');
  })

  it('email ve password doğru fakat check me out işaretlenmedi:', () => {
      
      cy.get('input[name="email"]').type('test@example.com');
      cy.gety('input[name="password"]').type('Password123');
      cy.get('input[name="terms"]').uncheck();
      cy.get('[data-cy="error-message"]').should("have.length", 1);
      cy.get('button[type="submit"]').should('be.disabled');
  })
});