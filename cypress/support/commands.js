import loc from './locators'

//COMO SE FOSSEM OS METODOS EM RUBY

Cypress.Commands.add('login', (user, passwd) =>{ //Estou usando essas duas variaveis, dessa forma chamo o metodo sem login definido
    cy.visit('http://barrigareact.wcaquino.me/')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
})

Cypress.Commands.add('resetApp', () =>{ //Comando para resetar as contas antes de iniciar os cenarios
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})


// BACKEND

Cypress.Commands.add('getToken',(user, passwd) =>{
    cy.request({
        method: 'POST',
        url: '/signin',
        body:{  
            email: user,
            redirecionar: false,
            senha: passwd
        }
    }).its('body.token').should('not.be.empty')
})

Cypress.Commands.add('resetRest', (token) =>{
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: {Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
    
})