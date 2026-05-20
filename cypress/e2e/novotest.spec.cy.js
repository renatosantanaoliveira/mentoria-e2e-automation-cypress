// descrive seria sua suíte de teste
describe('Funcionalidade login', () => {
  before(() => {
    cy.visit('/')
  })
  //It seria o seu cenário de teste
  it('Validar tela de login', () => {
    // montar suas acoes de teste
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').should('be.disabled').and('have.css', 'background-color', 'rgba(57, 219, 87, 1)')
  })
  it.only('Validar acesso a tela de login', () => {
    // montar suas acoes de teste
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.url().should('include', '/')
    // cy.get('[data-test="login-button"]')
  })
})