/// <reference types="cypress"/>


describe('Testando os elementos basicos', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    // ---hooks
    //  Dentro do describe vou usar um before
    //     before ( () => {
    //         cy.visit('....")
    //     )} //Desse jeito posso remover os visit, ele executa antes de todos os testes
        
    //     beforeEach ( () => {
    //         cy.visit('....")
    //     )} //Desse jeito posso remover os visit, ele executa antes de cada it (antes de cada teste)

    // ---Textos

    it('Text', () => {
        cy.get('body').should('contain' , 'Cuidado') // verificando se exite a palavra cuidado na tela, o body pega a tela toda
        cy.get('span').should('contain' , 'Cuidado')
        cy.get('.facilAchar').should('contain' , 'Cuidado')
        cy.get('.facilAchar').should('have.text' , 'Cuidado onde clica, muitas armadilhas...') //have text necessita de todo o texto
    })
      
        
//     // ---links  a é a tag para links

        
    it('links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')          
        cy.reload() // comando é para recarregar a pagina
        cy.get('#resultado').should('have.not.text','Voltou!') // comandopara garantir que foi recarregada
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')
    })
       
        
    // ---Campos de textos
        

    it('textfield', () => {
        cy.get('#formNome')
            .type('Cypress Test')
            .should('have.value', 'Cypress Test')
                
    })

        
    // ---Radio button

        
    it('radiobutton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        cy.get('#FormSexoMasc')
            .should('not.be.checked')
        cy.get("[name='formSexo']")
            .should('have.length', 2) //Procura dois valores que tenham o name com 'formSexo'
    })



    // ---Checkbox

     
    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')
                    
        cy.get('[name=formComidaFavorita]')
            .click({multiple: true}) // clicando em todas as opções
    })
     
        
    // ---Combobox
    //utlizando o $ estamos chamando uma função jquery
    
    it('Combobox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
                    
        cy.get('[data-test=dataEscolaridade]')
           .select('1o grau completo')
           .should('have.value', '1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8) // SABENDO QUANTAS OPÇÕES TEM e validar elas
        
        cy.get('[data-test=dataEscolaridade] option').then($arr => {        //convertendo os valores em array
            const values = []
            $arr.each(function (){
                values.push(this.innerHTML)  //innerHTML vai pegar os nomes das opções dentro do combo
            })
            expect(values).to.include.members(["Superiores", "Mestrado"]) //validando se existe essas opções no combo
        })

    })
    
        
    // ---ComboMultiplo  //quando enviamos um array tem que ser o value
        
    it('Combobox', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']) // dentro de uma array

        cy.get('[data-testid=dataEsportes]').then($el => { //convertando em promisse
            expect($el.val()).to.be.deep(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })
        
        cy.get('[data-testid=dataEsportes]') //utilizando o invoke para testar as opções selecionadas no combomultiplo
        .invoke('val')
        .should('eql', ['natacao', 'Corrida', 'nada'])
    })
})