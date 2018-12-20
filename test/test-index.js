const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
const expect = chai.expect;
const server = require('../app.js');

chai.use(chaiHttp);
const agent = chai.request.agent(server);

describe('Index Page', () => {
    it('Should render an HTML page at GET: /', (done) => {
        agent
        .get('/')
        .end((err, res) => {
            res.status.should.be.equal(200);
            res.should.be.html;
            done();
        })
    }) 
})
