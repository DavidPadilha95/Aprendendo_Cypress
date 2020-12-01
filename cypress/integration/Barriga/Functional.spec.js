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
})