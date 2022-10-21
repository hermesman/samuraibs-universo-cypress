///<reference types="cypress" />
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {

    context('Quando o usuario é muito bom', () => {
        const user = {
            name: 'Teste Teste',
            email: 'teste@samurailbs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve logar com sucesso', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('Quando o usuario é muito bom mas a senha é ruim', () => {
        const user = {
            name: 'Pipinos do Pix',
            email: 'pipino@samurailbs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = 'abc123'
            })

        })

        it('Deve notificar erro de credenciais', () => {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            
            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)
        })
    })

    context('Quando o formato do email é invalido', () => {
        
        const emails = [
            'melmes.com.br',
            'yahoo.com',
            '@gmail.com',
            'melmes@',
            '123',
            '$%$%$%$%$',
            'xpto1234'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function(email){
            it('não deve logar com o email: ' + email, function(){
                const user = {email: email, password:'pwd123'}

                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })

    })

    context('Quando não preenche nenhum dos campos', function () {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('Deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)


            })
        })

    })
})
