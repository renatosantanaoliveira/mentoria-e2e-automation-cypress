import inventoryPage from '../support/page/inventoryPage'

describe('Funcionalidade de Inventário', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  })
  it('Adicionar um itens no carrinho', () => {
    const productName = 'sauce-labs-backpack'
    cy.url().should('include', '/inventory.html')

    inventoryPage.addItemToCart(productName)
    inventoryPage.getCartBadgeCount().should('equal', '1')
  })
  it('Adicionar dois itens no carrinho', () => {
    const productName1 = 'sauce-labs-backpack'
    const productName2 = 'sauce-labs-bike-light'
    cy.url().should('include', '/inventory.html')

    inventoryPage.addItemToCart(productName1)
    inventoryPage.addItemToCart(productName2)
    inventoryPage.getCartBadgeCount().should('equal', '2')
  })
})