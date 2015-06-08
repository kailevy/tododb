var superagent = require("superagent"),
    chai = require("chai"),
    expect = chai.expect,
    should = require("should");


describe("Creation", function() {
  it("sends a post request, making a new document in database", function(done) {
    superagent.post("http://localhost:4001/api/todos/")
    .send({text: 'This is a test'})
    .end(function(err,res) {
      (err === null).should.equal(true);
      res.should.be.json;
      res.body[res.body.length-1].text.should.equal('This is a test');
      done();
    });
  });
});

describe("Editing", function() {
  it("sends a post request, editing a document in database", function(done) {
    superagent.get("http://localhost:4001/api/todos/")
    .end(function(err,res) {
      (err === null).should.equal(true);
      var lastId = res.body[0]._id;
      superagent.post("http://localhost:4001/api/todos/" + lastId)
      .send({text: 'This is changed text'})
      .end(function(err,res) {
        (err === null).should.equal(true);
        superagent.get("http://localhost:4001/api/todos/")
        .end(function(err,res) {
          (err === null).should.equal(true);
          res.should.be.json;
          res.body[0].text.should.equal('This is changed text');
          res.body[0]._id.should.equal(lastId);
          res.body[0].edit.should.equal(true);
          done();
        });
      });
    });
  });
});

describe("Deletion", function() {
  it("removes the oldest entry", function(done) {
    superagent.get("http://localhost:4001/api/todos/")
    .end(function(err,res) {
      (err === null).should.equal(true);
      var lastId = res.body[0]._id;
      superagent.del("http://localhost:4001/api/todos/" + lastId)
      .end(function(err,res) {
        (err === null).should.equal(true);
        superagent.get("http://localhost:4001/api/todos/")
        .end(function(err,res) {
          (err === null).should.equal(true);
          if (res.body.length !== 0) {
            res.body[0]._id.should.not.equal(lastId);
          } else {
            res.body.length.should.equal(0);
          }
          done();
        });
      });
    });
  });
});