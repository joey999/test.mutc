let chai = require('./../chai_conf');
require('mocha-allure-reporter');

let post = {
    auth: allure.createStep('Authorization; Login - {0}, Pass - {1}', async (login, pass) => {
        return await chai.connect()
            .post('/cgi-bin/bug.pl')
            .query({'action': 'login'})
            .field('action', 'login_do')
            .field('login', login)
            .field('password', pass);
    }),

    register: allure.createStep('Registration;', async (table) => {
        allure.createAttachment('Data', JSON.stringify(table, null, ' '));
        return await chai.connect()
            .post('/cgi-bin/bug.pl')
            .query({'action': 'register'})
            .field('action', 'register_do')
            .field('email', table.email)
            .field('login', table.login)
            .field('password', table.password)
            .field('password_confirm', table.password_confirm)
            .field('sex', table.sex)
    })
};

module.exports = post;