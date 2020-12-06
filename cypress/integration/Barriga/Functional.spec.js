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
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta de teste')).click()
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
        cy.get(loc.MOVIMENTACAO.MENU_MOVI).click()
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