const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const server = require('../app');

describe('Movies', () => {
  describe('/GET Home', () => {
    it('it should show Movies Home', (done) => {
    chai.request(server)
      .get('/api')
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.be.a('object');
        (res.body.title).should.be.eql("Movies Home");
        done();
      });
    });
  });

  describe('/GET Movies Search', () => {
    it('it should give Error for no keyword', (done) => {
      chai.request(server)
      .get('/api/search')
      .end((err, res) => {
        (res).should.have.status(400);
        (res.body).should.be.a('object');
        (res.body.error.message).should.be.eql('Movie Search Keyword Not Found');
        done();
      });
    });
  });

  describe('/GET Movies Search', () => {
    it('it should give List Of Movies', (done) => {
      chai.request(server)
      .get('/api/search')
      .query({ keyword: 'Harry' })
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.be.a('object');
        (res.body.movies).should.be.an('array');
        done();
      });
    });
  });


  after(() => {
    console.log();
    console.log();
    console.log();
    console.log("=========================================================");
    console.log("=========================================================");
    console.log("=================== All Test Executed ===================");
    console.log("=========================================================");
    console.log("=========================================================");
  });
});