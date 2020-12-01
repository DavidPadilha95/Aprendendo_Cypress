/// <reference types="cypress"/>

//IGUALDADE

it('Igual',() => {
    const a =1

    expect(a).equal(1)
    expect(a).to.be.equal(1)
    // expect(a).equal(2)
    expect(a).not.to.be.equal(2)
    expect(a, 'Deveria ser 1').equal(2)
})

it('Verdadeiro', () => {
    const a = true;
    const b = null;
    let c;
    
    expect(a).to.be.true
    expect(true).to.be.true
    expect(b).to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
})

it('Igualdade de objeto', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.equal(obj)
    expect(obj).to.be.deep.equal({a: 1, b: 2})
    expect(obj).eql({a: 1, b: 2})
    expect(obj).include({a: 1})
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2) //Verifica se existe o objeto b e se o valor dele é 2
    expect(obj).to.not.be.empty
    expect({}).to.be.empty
})

it('Arrays', () => {
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Tipos', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('Object')
    expect([]).to.be.an('Array')
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^String/) //Começa com String
    expect(str).to.match(/teste$/) //Termina com teste
    expect(str).to.match(/.{15}/)
    expect(str).to.match(/\w+/) //Existem apenas letras
    expect(str).to.match(/\D+/) //Não contém numeros
})

it('Numeros', () => {
    const number = 4
    const floatnumber = 5.23

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3) //Acima de tres
    expect(number).to.be.below(7) //Abaixo de 7
    expect(floatnumber).to.be.equal(5.23)
    expect(floatnumber).to.be.closeTo(5.2, 0.1) //Esteja entre 5.2 com margem de 0.1
    expect(floatnumber).to.be.above(5)
})