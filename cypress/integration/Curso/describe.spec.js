
//Esse comando acima referencia meus comandos ao cypress

it ('Aqui eu dou o nome do teste', () => {

})

describe ('Ele agrupa testes', () =>{
    describe.skip ('Posso ter grupo de testes dentro de outro grupos', () =>{

            it ('Escrevendo um teste dentro do grupo de um grupo, o skip faz pular o teste', () => {

            })
        })

        it ('Escrevendo um teste', () => {
    })
})

//Se colocarmos o only apos o teste ou o grupo apenas eles serão executados, exemplo : it.only