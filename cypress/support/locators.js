
//SÃO OS ELEMENTOS MAPEADOS

//Funções retornam valores

const locators = {
    LOGIN:{
        USER: '[data-test = "email"]',
        PASSWORD: '[data-test = passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-teste=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO:{
        MENU_MOVIMENTACAO: '[data-test=menu-movimentacao]',
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        TIPO_CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO:{
        EXTRATO_LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (nome, valor) => `//span[contains(.,'${nome}')]/following-sibling::small[contains(.,'${valor}')]`,
        FN_XP_REMOVER_CONTA: conta => `//span[contains(.,"${conta}")]/../../..//i[@class='far fa-trash-alt']`
    },
    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]` //    exemplo de funçoões dinamicas
    },
    MESSAGE: '.toast-message'

}

export default locators;