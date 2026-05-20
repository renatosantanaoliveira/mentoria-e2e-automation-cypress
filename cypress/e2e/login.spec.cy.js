import loginPage from "../support/page/loginPage";

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/')
    } )
  it('Validar campos de login', () => {
     loginPage.validaCamposLogin();
  });
  it('Validar título da página', () => {
     loginPage.validarTituloPagina();
  });

  it('Realizar login com sucesso', () => {
    loginPage.validarLoginComSucesso();
    cy.url().should('include', '/inventory.html');  
  });

  it('Realizar login com credenciais inválidas', () => {
    loginPage.validarLoginInvalido();
  });  

})