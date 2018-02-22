process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

// require('mocha-allure-reporter');

let server = "http://test.mutc.ru";

chai.use(chaiHttp);
chai.connect = function () {
    return chai.request(server);
};
chai.fail = function (message) {
    chai.assert.fail(0, 0, message);
};

module.exports = chai;
