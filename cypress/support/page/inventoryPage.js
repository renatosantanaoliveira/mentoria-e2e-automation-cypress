class InventoryPage {
  addItemToCart(item) {
    cy.get(`[data-test="add-to-cart-${item}"]`).click()
  }

  getCartBadgeCount() {
    return cy.get('.shopping_cart_badge').invoke('text')
  }
}

export default new InventoryPage()