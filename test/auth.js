let chai = require('../lib/chai_conf');
let post = require('../lib/requests/post');
let it = require('mocha').it;

let expect = allure.createStep('Checking the expected value; Actual - {0}, include expect - {1}', (actual, expect) => {
    chai.expect(actual).to.deep.include(expect);
});

let checkStatus = allure.createStep('Check status; Actual - {0}, Expect - {1}', (actual, expect) => {
    chai.expect(actual).to.equal(expect);
});


describe('API ./POST Login', () => {
    describe('and check statuses', () => {

        it('with correct login and correct password (await 200)', async () => {
            //
            let auth = await post.auth('__joey12___', '12345678');
            checkStatus(auth.status, 200);
        });

        it('with correct login and incorrect password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('__joey12___', 'qdadad12w2');
            }
            catch (err) {
                checkStatus(err.status, 400);
            }
            checkStatus(auth.status, 400);
        });

        it('with incorrect login and incorrect password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('123123', '123123');
            }
            catch (err) {
                checkStatus(err.status, 400);
            }
            checkStatus(auth.status, 400);
        });

        it('with empty login and empty password (await 400)', async () => {
            let auth;
            try {
                auth = await post.auth('', '');
            }
            catch (err) {
                checkStatus(err.status, 400);
            }
            checkStatus(auth.status, 400);
        });

    });

    describe('and check text', () => {
        it('with correct login and correct password (await \'Successfully authorized!\')', async () => {
            //
            let auth = await post.auth('__joey12___', '12345678');

            expect(auth.text, 'Successfully authorized!');
        });

        it('with correct login and incorrect password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('__joey12___', 'qdadad12w2');
            }
            catch (err) {
                expect(err.text, 'Login or password is invalid!');
            }
            expect(auth.text, 'Login or password is invalid!');
        });

        it('with incorrect login and incorrect password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('123123', '123123');
            }
            catch (err) {
                expect(err.text, 'Login or password is invalid!');
            }
            expect(auth.text, 'Login or password is invalid!');
        });

        it('with empty login and empty password (await \'Login or password is invalid!\')', async () => {
            let auth;
            try {
                auth = await post.auth('', '');
            }
            catch (err) {
                expect(err.text, 'Login or password is invalid!');
            }
            expect(auth.text, 'Login or password is invalid!');
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
            checkStatus(err.status, 200);
        }
        checkStatus(png.status, 200)
    })
});