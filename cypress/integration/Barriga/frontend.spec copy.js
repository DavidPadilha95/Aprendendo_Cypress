/// <reference types="cypress"/>

import buildEnv from '../../support/buildenv'
import loc from '../../support/locators'

describe('Testando a nivel funcional', () => {
    after(() => { //Depois dos testes limpa o storage
        cy.clearLocalStorage()
    })

    beforeEach(() => { //Logando no usuario antes de tudo //BeforeEach utilizado para executar uma vez o cy.server uma vez antes de cada teste
        buildEnv()
        cy.login('david.cypress@teste.com', 'teste12345646')
        cy.validarMensagem('Bem vindo')
        // cy.resetApp() não preciso usar aqui porque não estou pegando do banco e sim da route 
    })

    it('Criando novas contas', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta de teste', visivel: true, usuario_id:1}

        }).as('criando uma conta')

        cy.acessarMenuConta() //Criei esse metodo no commandasConta
        cy.route({
            method: 'GET',
            url: '/contas',
            response:[
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 1, nome: 'Banco', visivel: true, usuario_id: 1},
                {id: 3, nome: 'Conta de teste', visivel: true, usuario_id:1}
            ]
        }).as('validandoacontainserida')
        cy.inserirConta('Conta de teste') //Criei esse metodo passando um argumento
        cy.validarMensagem('Conta inserida')
    })

    it('Editando uma conta', () => {

        cy.route({
            method: 'PUT',
            url: '/contas/**', //** aceita qualquer coisa depois da barra (mais generico)
            response:
                {id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1},

        }).as('contaalterada')
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta de teste versao 2')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.validarMensagem('Conta atualizada')
    })

    it.only('Tentando cadastrar uma conta igual a outra existente', () =>{
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {"error":"Já existe uma conta com esse nome!"},
            status: 400

        }).as('mesmo nome')
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste versao 2')
        cy.validarMensagem('400')
    })

    it('Criando uma nova transacao', () => {
        cy.get(loc.MOVIMENTACAO.MENU_MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.validarMensagem('sucesso')

        cy.get(loc.EXTRATO.EXTRATO_LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Validar o saldo de uma conta', () =>{
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para alterar'))
    })

    it('Remover uma movimentacao', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_CONTA('Desc')).click()
        cy.validarMensagem('removida')
    })


})