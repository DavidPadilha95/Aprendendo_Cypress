/// <reference types="cypress"/>
// .then(res => console.log(res)) //para apresentar no console o que foi encontrado

describe('Testando a nivel funcional', () => {
    before(() => { //Logando no usuario antes de tudo
        // cy.login('david.cypress@teste.com', 'teste123')
        // cy.validarMensagem('Bem vindo')
        // cy.resetApp()
        
    })

    it('Criando novas contas', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body:{  email: "david.cypress@teste.com",
                    redirecionar: false,
                    senha: "teste123"}
        }).its('body.token').should('not.be.empty')
     
    })

    it('Editando uma conta', () => {
        
    })

    it('Tentando cadastrar uma conta igual a outra existente', () =>{
       
    })

    it('Criando uma nova transacao', () => {
       
    })

    it('Validar o saldo de uma conta', () =>{
     
    })

    it('Remover uma movimentacao', () => {
       
    })


})