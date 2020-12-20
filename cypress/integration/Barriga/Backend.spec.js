/// <reference types="cypress"/>
// .then(res => console.log(res)) //para apresentar no console o que foi encontrado

describe('Testando a nivel funcional', () => {

    let token //Crei a variavel do token

    before(() => { 
        cy.getToken('david.cypress@teste.com', 'teste123')
            .then( tkn=> {
                token = tkn
            }) //Fiz um then para quando pegar o token no login armazenar na variavel
        
    })

    it('Criando novas contas', () => {
                cy.request({
                method: 'POST',
                url: 'https://barrigarest.wcaquino.me/contas',
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