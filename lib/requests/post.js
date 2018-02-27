let chai = require('./../chai_conf');

let post = {
    auth: async function (login, pass) {
        return await chai.connect()
            .post('/cgi-bin/bug.pl')
            .query({'action': 'login'})
            .field('action', 'login_do')
            .field('login', login)
            .field('password', pass);
    },

    register: async function (table) {
        return await chai.connect()
            .post('/cgi-bin/bug.pl')
            .query({'action': 'register'})
            .field('action', 'register_do')
            .field('email', table.email)
            .field('login', table.login)
            .field('password', table.password)
            .field('password_confirm', table.password_confirm)
            .field('sex', table.sex)
    }
};

module.exports = post;