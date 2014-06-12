//To run these tests from the root directory: mocha -R nyan specs/serverSpec.js

var express = require('express');
var supertest = require('supertest');
var expect = require('chai').expect;
var url = require('url');

var app = require('../server/app.js');

describe('Server responses to get requests', function(){
  it('Should return 200 for get "/"  requests', function(done){
    supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/);
      done();
  });

  it('Should return 302 redirect for get "/static/v1/emberTest"', function(done){
    supertest(app)
      .get('/static/v1/emberTest')
      .expect(302)
      .end(function(err, res){
          if (err) return done(err);
          done();
        });
  });

  it('Should return 404 for an invalid route', function(done){
    supertest(app)
      .get('/thisroutedoesnotexist')
      .expect(404, done);
  });
});
