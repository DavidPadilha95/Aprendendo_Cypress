import loc from './locators'


//COMO SE FOSSEM OS METODOS EM RUBY

Cypress.Commands.add('acessarMenuConta', () =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', (conta) =>{
    cy.get(loc.CONTAS.NOME).type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add('validarMensagem', (mensagem) => {
    cy.get(loc.MESSAGE).should('contain', mensagem)
})

