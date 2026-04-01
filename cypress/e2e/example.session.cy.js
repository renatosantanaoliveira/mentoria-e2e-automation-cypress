// =============================================================================
// Exemplo: cy.session() com autenticação baseada em token (ex: Auth0)
//
// cy.session() é adequado quando o app persiste a sessão no browser via
// cookies ou localStorage — como acontece com Auth0, OAuth2 e JWT.
//
// Fluxo:
//   1ª execução  → roda o setup (login de UI ou chamada de API), cacheia o estado
//   Execuções seguintes → restaura o estado cacheado sem repetir o login
//
// Para usar este exemplo com seu app, adapte cy.loginWithSession() em
// cypress/support/commands.js conforme o mecanismo de autenticação.
// =============================================================================

describe('Session - Login com cache de sessão', () => {
  context('Usuário autenticado via cy.session()', () => {
    before(() => {
      // cy.loginWithSession() faz o login uma vez e cacheia a sessão.
      // Todos os testes deste contexto reutilizam o mesmo estado autenticado.
      cy.loginWithSession('standard_user', 'secret_sauce');
    });

    it('deve manter a sessão ativa entre testes sem refazer o login', () => {
      cy.visit('/inventory.html');
      cy.get('[data-test="inventory-container"]').should('be.visible');
    });

    it('deve preservar o estado de autenticação ao navegar entre páginas', () => {
      cy.visit('/cart.html');
      cy.get('[data-test="cart-contents-container"]').should('be.visible');
    });
  });
});
