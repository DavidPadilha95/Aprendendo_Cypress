/// <reference types="cypress"/>


describe('Testando iframe', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    it('Testando o iframe', () => {
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body') // esse contents traz o html como body e etc
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })
    })

})
