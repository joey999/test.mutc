let chai = require('../lib/chai_conf');
// let post = require('../lib/requests/post');
// let get = require('../lib/requests/get');
// let alasql = require('alasql');
let it = require('mocha').it;


describe('API ./POST Login', () => {
    describe('check statuses', () => {
        before('', async () => {

        });

        it('with correct login and correct password (await 200)', async () => {
            let auth = await chai.connect()
                .post('/cgi-bin/bug.pl')
                .query({'action': 'login'})
                .field('action', 'login_do')
                .field('login', '__joey12___')
                .field('password', '12345678');

            auth.should.be.status(200)
        });

        it('with incorrect login and incorrect password (await 400)', async () => {
            let auth = await chai.connect()
                .post('/cgi-bin/bug.pl')
                .query({'action': 'login'})
                .field('action', 'login_do')
                .field('login', '123123')
                .field('password', '123123');

            auth.should.be.status(400)
        })

    });

    // describe('', () => {
    //
    // })

});