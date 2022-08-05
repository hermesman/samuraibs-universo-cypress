///<reference types="cypress" />
import signupPage from '../support/pages/signup'

describe('cadastro', () => {
    context('Quando o usuario é novato', function () {
        const user = {
            name: 'Belmizao',
            email: 'belmizaodopix@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve cadastrar um novo usuario com sucesso', () => {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('Quando o usuario é novato', function () {
        const user = {
            name: 'Belmizao',
            email: 'belmizaodopix@pix.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Deve exibir alerta de email já cadastrado com sucesso', () => {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Xirildona do Pix',
            email: 'xirilda.yahoo.com',
            password: 'pwd123'
        }

        it('Deve exibir mensagem de alerta com sucesso', () => {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('Quando a senha tem 1 caractere', function () {

        const passwords = ['1', '12', '1#3', '1#34', '12@45']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Kikizona do Pix',
                    email: 'kikizonadopix@gmail.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('Quando não preenche nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('Deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)


            })
        })

    })
})
