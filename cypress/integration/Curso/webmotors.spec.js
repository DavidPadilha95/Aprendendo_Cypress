/// <reference types="cypress"/>

describe('Testando o site da Webmotors', () => {
     before(() => {
    //     cy.visit('https://hlogin.webmotors.com.br/')
            cy.visit('https://hportal.webmotors.com.br/vender')
     })

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    // it('Logando na tela inicial', () => {
    //     cy.get('#email').type('consultor5a.neves@webmotors.com.br')
    //     cy.get('#senha').type('teste1234')
    //     cy.get('#btnEntrar').click()
    // })

    it('Criar um anuncio', () => {
        // cy.get('body').should('have.text', "Vender meu veículo")
        // cy.xpath("//*[@class='login__options--car'][a]//span[1]").click()
        // cy.get('.login__options--car > a > span').click()
        cy.get("[name='email']").type('consultor5a.neves@webmotors.com.br')
        cy.get("[data-qa=btnComecarAnuncio]").click()
        cy.xpath("//*[contains(text(),'Aceito os Termos')]").click()
        cy.xpath("//*[contains(text(),'Ao criar meu')]").click()
        cy.xpath("//*[contains(text(),'Concordar')]").click()
    })

    it('Dentro do fluxo vender', () =>{
        cy.get("[data-qa='btnCriarNovoAnuncio']").click()
        cy.get("[name=make]").select('6')
        cy.get("[name=model]").select('3313')
        cy.get("[name=yearmodel]").select('1975')
        cy.get("[name=yearfabrication]").select('1975')
        cy.get("[name=version]").select('344356')
        cy.get("[name=color]").select('30402')
        cy.get("[data-qa=btnContinuarEspec]").click()
    })

    it('Conte mais sobre seu carro', () => {
       cy.get('#quilometragem').type('20000')
       cy.get('#preco').type('15000')
       cy.get("[data-qa=btnContinuarInfo]").click()
       cy.get("[data-qa=btnContinuarOpcionais]").click() 
       cy.get("[data-qa=btnContinuarCaracteristicas]").click() 

    })

    it('Logar dentro do fluxo', () => {
        cy.get("input[type=password]").type('teste1234')
        cy.get("[data-qa=btnContinuarSenha]").click()
        cy.get("[data-qa=btnContinuarUsuario]").click()
        cy.get("[data-qa=btnInserirFotosDepois]").click()
        cy.get("[data-qa=btnPlanoEconomic]").click()
    })

    it('Selecionar produto', () => {
        cy.get(':nth-child(2) > .css-16u8sg3-ProductRight > .css-125bg3f-CssButtonSwitch-CssButtonSwitch-ProductSwitchButton-Button').click()
        cy.xpath("//*[contains(text(), 'Continuar')]")
    })

    it('Pagamento', () => {
        cy.get("[name=creditCardNumber]").type('5442149667872360')
        cy.get("[name=creditCardName]").type('Teste Cypress')
        cy.get("[name=validThru]").type('0226')
        cy.get("[name=securityCode]").type('526')
        cy.get("[name=cpfOrCnpjNumber]").type('48597377097')
        cy.get('#placa').type('DQO7497')
        cy.get('.form__row--payment-terms > .form__field').click()
        cy.get("[data-qa=btnPagarAgoraCartao]").click()
    })
})