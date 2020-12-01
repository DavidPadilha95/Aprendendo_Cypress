/// <reference types="cypress"/>

//Com o wrap podemos encapsular objetos e dessa forma usar as assertivas do cypress nela verificando suas propriedades
describe('Helpers...', () => {
    it('Wrap', () =>{
        const obj = {nome: 'User', idade: '20'}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')
    })

    cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    cy.get('#forNome').then($el => {
        cy.wrap($el).type('funciona via cypress')
    })

    const promise = ner Promise((resolve,reject) => {
            setTimeout(() =>{
                resolve(10)
            }, 500)
    })

    cy.get('buttonSimples').then(() => console.log('Encontrei o primeiro botao'))
    cy.wrap(promise).then(ret => console.log(ret))
    cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))

    it.only('Its..', ()=> {
        const obj = {nome: 'User', idade: '20'}
        cy.wrap(obj).should('have.property','nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')
        // O its serve para pegar apenas um parametro do objeto e validar

        const obj2 = {nome: 'User', idade: '20', endereco: { rua:'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property','rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain','bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain','bobo')

        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal',20)

    })

    it.only('Invoke..', () => {
        const getvalue = () => 1;
        const soma= (a,b) => a+b;

        cy.wrap({fn: getvalue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('soma', 2,5).should('be.equal', 7)

        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.get('#forNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Da para ver?')
        cy.get('#resultado')
            .invoke('html', '<input type="button", value="hacked"') // vai criar um botao na tela
    })
})



