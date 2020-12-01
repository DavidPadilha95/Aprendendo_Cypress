/// <reference types="cypress"/>

describe('Testando as esperas', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })
    //---Sync

        
    it('Deve esperar o elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist') //Garantindo o o campo nao existe até eu apertar o botao
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist') //Leva um tempo para o campo aparacer
        cy.get('#novoCampo').should('exist') //garantindo que o campo apareceu
        cy.get('#novoCampo').type('Funciona')
    })
       
        
    //---Retentativas

        
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('not.exist')
            .should('exist')
            .type('funciona')
    })
     


    it('Uso do find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })


    it.only('Uso do timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout:1000}).should('not.exist')
        cy.get('#buttonListDOM', {timeout: 100}).click()
        //cy.wait(5000) Só usar em casa extremos
        cy.get('#lista li span')
        .should('contain', 'Item 2')
    })



})