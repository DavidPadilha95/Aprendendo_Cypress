/// <reference types="cypress"/>

import loc from '../../support/locators'
// import '../../support/commandasCONTA'  //Aqui eu não dei nome porque ele já tem a função definida nos scripts
//Chamei direto no index assim deixo o meu codigo mais limpo

describe('Testando a nivel funcional', () => {
    before(() => { //Logando no usuario antes de tudo
        cy.login('david.cypress@teste.com', 'teste123')
        cy.validarMensagem('Bem vindo')
        cy.resetApp()
        
    })

    it('Criando novas contas', () => {
        cy.acessarMenuConta() //Criei esse metodo no commandasConta
        cy.inserirConta('Conta de teste') //Criei esse metodo passando um argumento
        cy.validarMensagem('Conta inserida')
    })

    it('Editando uma conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta de teste versao 2')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.validarMensagem('Conta atualizada')
    })

    it('Tentando cadastrar uma conta igual a outra existente', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste versao 2')
        cy.validarMensagem('400')
    })

    it('Criando uma nova transacao', () => {
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.validarMensagem('sucesso')

        cy.get('.list-group > li').should('have.length', 7)
        //ver validao de xpath na aula 58
    })

    // it('Validar o saldo de uma conta')
    // it('Remover uma movimentacao')


})