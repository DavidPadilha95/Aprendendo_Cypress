/// <reference types="cypress"/>

describe('Cypress basic', () => {
    it('Should visit a page and assert title', () =>{
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')

        // const title = cy.title
        // console.log(title)
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')//.debug

        cy.title().should(title => {
            console.log(title)

        cy.get('#formNome').type(title)
        
        })
            

    })

    it('Should find and interact with an element', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

        cy.get('#formNome')
            .type('teste')   


    })

    it.only('Acessar web', () => {
        cy.visit('https://hlogin.webmotors.com.br/')
            .get('#email').type('consultor5a.neves@webmotors.com.br')
            .get('#senha').type('teste1234')
            .get('#btnEntrar').click()
    })

    

})