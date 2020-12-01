/// <reference types="cypress"/>


describe('Testando o alert', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    //O alert vem através do metodo window que se colocarmos no console winwow.aler('vai aparacer na tela')
    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg =>{ //Esse comando "on" pega eventos que ocorre na tela
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Alert Simples'))
    })

    it('Confirm', () => {
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => { //Esse comando "on" pega eventos que ocorre na tela
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => { //Esse comando "on" pega eventos que ocorre na tela
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
    })

    it('Deny', () => { //Clicando em cancelar e vai aparecer a mensagem negado
        cy.get('#confirm').click()
        cy.on('window:confirm', msg => { //Esse comando "on" pega eventos que ocorre na tela
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => { //Esse comando "on" pega eventos que ocorre na tela
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
    })

    it('Prompt', () => { //Clicando no prompt
        cy.window().then(win =>{
            cy.stub(win, 'prompt').returns('42')
        })
        cy.get('#prompt').click()
        cy.on('window:confirm', msg =>{ //Esse comando "on" pega eventos que ocorre na tela
            expect(msg).to.be.equal('Era 42?')
        })
        cy.on('window:alert', msg =>{ //Esse comando "on" pega eventos que ocorre na tela
            expect(msg).to.be.equal(':D')
        })
    }) 
    
    it.only('Desafio', () => {
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.get('#formNome').type('David')
        

        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.get('[data-cy=dataSobrenome]').type('Padilha')


        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
})  