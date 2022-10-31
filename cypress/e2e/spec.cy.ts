describe('Testing Roles', () => {
  it('should log in, create a user, ', () => {
    cy.visit('http://127.0.0.1:3001')
    cy.contains('Sign in to your account')
    cy.get('input[name="email"]').type('mark@example.com')
    cy.get('input[name="password"]').type('qweqweq')
    cy.get('form').submit()
  })
})