describe('Login Form Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('a) Başarılı form doldurulduğunda submit edilir ve success sayfasına yönlendirir', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.get('input[name="terms"]').check();
    cy.get('[data-cy="submit-button"]').click();
    cy.url().should('include', '/home');
  });

  it('b) Hatalı e-posta girildiğinde hata mesajı gösterilir ve buton disabled kalır', () => {
    cy.get('input[name="email"]').type('hfhf@');
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Please enter a valid email address');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('b) Hatalı e-posta ve şifre girildiğinde birden fazla hata mesajı gösterilir ve buton disabled kalır', () => {
    cy.get('input[name="email"]').type('abab@');
    cy.get('input[name="password"]').type('123');
    cy.get('[data-cy="error-message"]')
      .should('have.length', 2)
      .and('be.visible');
    cy.get('[data-cy="error-message"]')
      .contains('Please enter a valid email address')
      .should('be.visible');
    cy.get('[data-cy="error-message"]')
      .contains('Password must contain at least one lowercase letter, one uppercase letter, and one number. It should be at least 6 characters long.')
      .should('be.visible');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('b) Email ve password doğru ama kuralları kabul etmediğinde buton disabled kalır ve hata mesajı gösterilir', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123');
  
    // Checkbox'ın işaretli olmadığını doğrula
    cy.get('input[name="terms"]').should('not.be.checked');
  
    // Checkbox'ı tıklatıp tekrar eski haline getirerek React'in validation'ı tetiklemesini sağla
    cy.get('input[name="terms"]').check().uncheck();
  
    // Hata mesajının olup olmadığını test etmeden önce DOM'un güncellenmesini bekle
    cy.wait(500);
  
    // Hata mesajının görünür olup olmadığını kontrol et
    cy.get('[data-cy="terms-error-message"]').should('exist').and('be.visible');
  
    // Submit butonunun disabled olduğunu kontrol et
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });
  

});

