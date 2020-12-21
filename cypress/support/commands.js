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

Cypress.Commands.add('getToken',(user, passwd) =>{ //Nesse metodo ele só vai devolver o token
    cy.request({
        method: 'POST',
        url: '/signin',
        body:{  
            email: user,
            redirecionar: false,
            senha: passwd
        }
    }).its('body.token').should('not.be.empty')
      .then (token =>{
          return token
      })  
})

Cypress.Commands.add('resetRest', (token) =>{
        cy.request({
            method: 'GET',
            url: '/reset',
            headers: {Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
    
})

Cypress.Commands.add('getContaByName', (name) =>{ //Metodo para buscar o id da conta que queremos gerar ou modificar
    cy.getToken('david.cypress@teste.com', 'teste123').then(token =>{
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: {Authorization: `JWT ${token}`},
            qs:{// qs = query string, é um parametro a ser implementado na url
                nome: name
                }
        }).then(res =>{
            return res.body[0].id
        })   

    })
    
})