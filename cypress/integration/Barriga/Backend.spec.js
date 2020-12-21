/// <reference types="cypress"/>
// .then(res => console.log(res)) //para apresentar no console o que foi encontrado

describe('Testando a nivel backend', () => {

    let token //Crei a variavel do token

    before(() => { 
        cy.getToken('david.cypress@teste.com', 'teste123')
            .then( tkn=> {
                token = tkn
            }) //Fiz um then para quando pegar o token no login armazenar na variavel
        
    })

    beforeEach(() => {
        cy.resetRest(token) // Estou pegando o token da variavel, nao preciso passar usuario e senha porque
        // já estou pegando isso do token gerado pelo metodod anterior
    })

    it('Criando novas contas', () => {
            cy.request({
                method: 'POST',
                url: '/contas',
                headers: {Authorization: `JWT ${token}`},
                body: {
                 nome: 'Conta via rest'
                }
            }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })

    })

    it('Editando uma conta', () => {
        cy.getContaByName('Conta para alterar')
        .then(ContaID => { //Foi utilizado esse metodo porque o ID por exemplo é dinamico, nao tem como buscar por ele 
            // nesse metodo criado ele traz unica a exclusivamente o id
            cy.request({
                url: `/contas/${ContaID}`,
                method: 'PUT',
                headers: {Authorization: `JWT ${token}`},
                body:{
                    nome: 'Conta alterada via rest'
                }
            }).as('response')
        }).then(res => console.log(res)) //para apresentar no console o que foi encontrado
        cy.get('@response').its('status').should('be.equal', 200)

    })

    it('Tentando cadastrar uma conta igual a outra existente', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
             nome: 'Conta mesmo nome'
            },
            failOnStatusCode:false // Esse comando faz com que o teste siga mesmo se der algum erros
        }).as('response')

    cy.get('@response').then(res => {
        console.log
        expect(res.status).to.be.equal(400)
        expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
        expect(res.body.error).to.equal('Já existe uma conta com esse nome!')// outra forma de validar a mensagem
        })

    })

    it('Criando uma nova transacao', () => {
       cy.getContaByName('Conta para movimentacoes')
        .then(ContaID => {
            cy.request({
                method:'POST',
                url:'/transacoes',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: ContaID,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'), //pegando data atual +1 dia
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'), // pegando data atual
                    descricao: 'desc',
                    envolvido: 'inter',
                    status: true,
                    tipo: 'REC',
                    valor: '123'
                }
            })
        })
           
    })

    it.only('Validar o saldo de uma conta', () =>{
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
        }).then(res => console.log(res))
    })

    it('Remover uma movimentacao', () => {
       
    })


})