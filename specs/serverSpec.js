var express = require('express');
var supertest = require('supertest');
var expect = require('chai').expect;
var url = require('url');

var app = require('../server/app.js');

describe('Server', function(){

  beforeEach(function(){
    console.log('\n');
  });

  it('should return 200 for get "/"  requests',function(done){
    supertest(app)
      .get('/')
      .expect(200, done);
  });
});
