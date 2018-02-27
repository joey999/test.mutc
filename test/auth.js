let chai = require('../lib/chai_conf');
let post = require('../lib/requests/post');
let it = require('mocha').it;


describe('API ./POST Login', () => {
    describe('and check statuses', () => {

        it('with correct login and correct password (await 200)', async () => {
            //
            let auth = await post.auth('__joey12___', '12345678');
            auth.should.be.status(200)
        });

        it('with correct login and incorrect password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('__joey12___', 'qdadad12w2');
            }
            catch (err) {
                err.should.have.status(400)
            }
            auth.should.have.status(400)
        });

        it('with incorrect login and incorrect password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('123123', '123123');
            }
            catch (err) {
                err.should.have.status(400)
            }
            auth.should.have.status(400)
        });

        it('with empty login and empty password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('', '');
            }
            catch (err) {
                err.should.have.status(400)
            }
            auth.should.have.status(400)
        });

    });

    describe('and check text', () => {
        it('with correct login and correct password (await \'Successfully authorized!\')', async () => {
            //
            let auth = await post.auth('__joey12___', '12345678');

            chai.expect(auth.text).to.deep.include('Successfully authorized!');
        });

        it('with correct login and incorrect password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('__joey12___', 'qdadad12w2');
            }
            catch (err) {
                err.should.have.status(400)
            }
            chai.expect(auth.text).to.deep.include('Login or password is invalid!')
        });

        it('with incorrect login and incorrect password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('123123', '123123');
            }
            catch (err) {
                err.should.have.status(400)
            }
            chai.expect(auth.text).to.deep.include('Login or password is invalid!')
        });

        it('with empty login and empty password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('', '');
            }
            catch (err) {
                err.should.have.status(400)
            }
            chai.expect(auth.text).to.deep.include('Login or password is invalid!')
        });
    })
});

describe('API ./GET background.png', () => {
    it('check existence background.png', async () => {
        let png;
        try {
            png = await chai.connect()
                .get('/img/background.png');
        }
        catch (err) {
            err.should.be.status(200)
        }
        png.should.be.status(200)
    })
});