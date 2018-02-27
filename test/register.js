let chai = require('../lib/chai_conf');
let post = require('../lib/requests/post');
let it = require('mocha').it;

let getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
require('mocha-allure-reporter');


//sorry guys, the method of DELETE for logins I did not find
describe('API ./Register of new user', () => {
    describe('check text response of', () => {
        it('register with correct values', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include('Congratulations! You have been successfully registered.');
        });

        it('register with incorrect email', async () => {
            let reg_table = {
                email: 'test_@qwe@qwe.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include('not a valid email address');
        });

        it('register with incorrect login (count of symbols more than 16)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_123456789012345678',
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include('login must be 4-16 symbol length');
        });

        it('register with incorrect password (with spaces)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '1234    5678',
                password_confirm: '1234    5678',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include('the password can not contain spaces');
        });

        it('register with incorrect password_confirm (does not match with password field)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '123456789',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include("password doesn\'t match confirmation");
        });

        it('register with incorrect sex', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'qweqwe'
            };

            let login = await post.register(reg_table);

            chai.expect(login.text).to.deep.include('so what sex are you, really?');
        })
    });

    describe('check status of request', () => {
        it('register with correct values (await status 200)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login = await post.register(reg_table);

            login.should.have.status(200)
        });

        it('register with incorrect email (await status 400)', async () => {
            let reg_table = {
                email: 'test_@qwe@qwe.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login;
            try {
                login = await post.register(reg_table);
            } catch (err) {
                err.should.have.status(400)
            }

            login.should.have.status(400)
        });

        it('register with incorrect login (count of symbols more than 16) (await status 400)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_123456789012345678',
                password: '12345678',
                password_confirm: '12345678',
                sex: 'none'
            };

            let login;
            try {
                login = await post.register(reg_table);
            } catch (err) {
                err.should.have.status(400)
            }

            login.should.have.status(400)
        });

        it('register with incorrect password (with spaces) (await status 400)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '1234    5678',
                password_confirm: '1234    5678',
                sex: 'none'
            };

            let login;
            try {
                login = await post.register(reg_table);
            } catch (err) {
                err.should.have.status(400)
            }

            login.should.have.status(400)
        });

        it('register with incorrect password_confirm (await status 400)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '123456789',
                sex: 'none'
            };

            let login;
            try {
                login = await post.register(reg_table);
            } catch (err) {
                err.should.have.status(400)
            }

            login.should.have.status(400)
        });

        it('register with incorrect sex (await status 400)', async () => {
            let reg_table = {
                email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
                login: 'test_' + getRandomInt(10000, 99999),
                password: '12345678',
                password_confirm: '12345678',
                sex: 'qweqwe'
            };

            let login;
            try {
                login = await post.register(reg_table);
            } catch (err) {
                err.should.have.status(400)
            }

            login.should.have.status(400)
        })
    });

    it('and try to login by new created user', async () => {
        let reg_table = {
            email: 'test_email_' + getRandomInt(100, 999) + '@' + getRandomInt(100, 999) + '.ru',
            login: 'test_' + getRandomInt(10000, 99999),
            password: '12345678',
            password_confirm: '12345678',
            sex: 'none'
        };

        await post.register(reg_table);

        let login = await post.auth(reg_table.login, reg_table.password);

        login.should.have.status(200);
        chai.expect(login.text).to.deep.include('Successfully authorized!')
    })
});