describe('Login', () => {
  context('Usuário válido', () => {
    beforeEach(() => {
      cy.login('standard_user', 'secret_sauce');
    });

    it('deve exibir o catálogo de produtos após o login', () => {
      cy.get('[data-test="inventory-container"]').should('be.visible');
    });

    it('deve exibir o título da página como "Swag Labs"', () => {
      cy.title().should('eq', 'Swag Labs');
    });
  });

  context('Usuário bloqueado', () => {
    it('deve exibir mensagem de erro ao tentar logar', () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce', { log: false });
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Sorry, this user has been locked out.');
    });
  });

  context('Credenciais inválidas', () => {
    it('deve exibir mensagem de erro com senha incorreta', () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('senha_errada', { log: false });
      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Username and password do not match');
    });
  });
});
