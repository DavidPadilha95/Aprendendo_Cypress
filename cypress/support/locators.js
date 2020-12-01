
//SÃO OS ELEMENTOS MAPEADOS

const locators = {
    LOGIN:{
        USER: '[data-test = "email"]',
        PASSWORD: '[data-test = passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-teste=menu-movimentacao]'
    },

    CONTAS:{
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP_BTN_ALTERAR: "//table//td[contains(., 'Conta de teste')]/..//i[@class='far fa-edit']"
    },
    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[date-test=status]',
        BTN_SALVAR: '[.btn-primary]'
    },
    MESSAGE: '.toast-message'

}

export default locators;