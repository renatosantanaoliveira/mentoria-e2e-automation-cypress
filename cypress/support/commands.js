// =============================================================================
// cy.login(username, password)
//
// Login direto via UI — adequado para autenticação por formulário.
// Executado integralmente a cada chamada (sem cache de sessão).
//
// Uso:
//   cy.login()                          → usa AUTH0_USER_EMAIL / AUTH0_USER_PASSWORD do config
//   cy.login('other_user')              → sobrescreve o usuário
//   cy.login('other_user', 'senha')     → sobrescreve usuário e senha
// =============================================================================
Cypress.Commands.add('login', (username, password) => {
  const user = username || Cypress.env('AUTH0_USER_EMAIL');
  const pass = password || Cypress.env('AUTH0_USER_PASSWORD');

  cy.visit('/');
  cy.get('[data-test="username"]').type(user);
  cy.get('[data-test="password"]').type(pass, { log: false });
  cy.get('[data-test="login-button"]').click();
});

// =============================================================================
// cy.loginWithSession(username, password)
//
// Login com cache de sessão via cy.session() — adequado para autenticação
// baseada em tokens ou cookies persistentes (ex: Auth0, OAuth2, JWT).
//
// O Cypress executa o bloco de setup apenas uma vez por sessão e reutiliza
// o estado cacheado (cookies, localStorage, sessionStorage) nas chamadas
// seguintes, evitando repetir o fluxo de login a cada teste.
//
// IMPORTANTE: este comando requer que a autenticação persista estado no
// browser. Não funciona com apps que armazenam sessão apenas em memória.
//
// Uso:
//   cy.loginWithSession()               → usa AUTH0_USER_EMAIL / AUTH0_USER_PASSWORD do config
//   cy.loginWithSession('user@email')   → sobrescreve o usuário
// =============================================================================
Cypress.Commands.add('loginWithSession', (username, password) => {
  const user = username || Cypress.env('AUTH0_USER_EMAIL');
  const pass = password || Cypress.env('AUTH0_USER_PASSWORD');

  cy.session(
    `login-${user}`,
    () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type(user);
      cy.get('[data-test="password"]').type(pass, { log: false });
      cy.get('[data-test="login-button"]').click();

      // Confirma login bem-sucedido antes de cachear a sessão
      cy.get('[data-test="inventory-container"]').should('be.visible');
    },
    {
      validate() {
        // Adapte esta validação conforme o mecanismo de persistência do seu app.
        // Exemplos comuns:
        //   Cookie:       cy.getCookie('session').should('exist')
        //   localStorage: cy.window().its('localStorage.access_token').should('exist')
        cy.window()
          .its('localStorage.session-username')
          .should('exist');
      },
    }
  );
});
