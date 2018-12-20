const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should();
const expect = chai.expect;
const server = require('../app.js');

chai.use(chaiHttp);
const agent = chai.request.agent(server);
const sampleProject = {
    name: 'Sample Project',
    description: 'Sample project description',
    completion: 0
}



describe('Projects', () => {


    it('Should create a new project at POST: /projects', (done) => {
        agent
        .post('/projects')
        .send(sampleProject)
        .end((err, res) => {
            res.status.should.be.equal(200);
            done();
        })
    })

    it('Should render the New Project Form at GET: /projects/new', (done) => {
        agent
        .get('/projects/new')
        .end((err, res) => {
            res.status.should.be.equal(200);
            res.should.be.html;
            done();
        })
    })

    //Make a test case for rendering a single project page 

    
})