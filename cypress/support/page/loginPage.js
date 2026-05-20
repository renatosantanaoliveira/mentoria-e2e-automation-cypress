class LoginPage {
  elementos = {
    campoUsuario: () => cy.get('[data-test="username"]'),
    campoSenha: () => cy.get('[data-test="password"]'),
    botaoLogin: () => cy.get('[data-test="login-button"]'),
    tituloPagina: () => cy.get('.login_logo'),
    mensagemErro: () => cy.get('[data-test="error"]')
  };

  validaCamposLogin() {
    this.elementos.campoUsuario().should('be.visible');
    this.elementos.campoSenha().should('be.visible');
  }

  validarTituloPagina() {
    this.elementos.tituloPagina().should('be.visible');
    this.elementos.tituloPagina().should('have.text', 'Swag Labs');
  }

  preencherFormularioLogin(username, password) {
    this.elementos.campoUsuario().type(username);
    this.elementos.campoSenha().type(password);
  }

  clickBotaoLogin() {
    this.elementos.botaoLogin().click();
  }

  validarLoginComSucesso() {
    this.preencherFormularioLogin('standard_user', 'secret_sauce');
    this.clickBotaoLogin();
  }

  validarLoginInvalido() {
    this.preencherFormularioLogin('invalid_user', 'invalid_password');
    this.clickBotaoLogin();
    this.elementos.mensagemErro().should('be.visible');
    this.elementos.mensagemErro().should('have.text', 'Epic sadface: Username and password do not match any user in this service');
  }
}
export default new LoginPage;