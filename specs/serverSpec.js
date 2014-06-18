//To run these tests from the root directory: 
 // mocha -R nyan --timeout 5s specs/serverSpec.js

var express = require('express');
var supertest = require('supertest');
var expect = require('chai').expect;
var url = require('url');
var app = require('../server/app.js');
var mongoose = require("mongoose");
var Users = require('../db/user.js');
var Tracks = require('../db/track.js');
var Tweets = require('../db/tweet.js');
var dbMethods = require('../db/databaseHelpers.js');

mongoose.createConnection('mongodb://localhost/netsense_test');  
// mongoose.createConnection(process.env.DB_URL);


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


describe('Testing the /user/:userId route', function() {
  var testUser = {
    twitterUserId: 'testUser',
    name: 'nick'
  };

  beforeEach(function(done) {
    Users.create(testUser, function(err, data) {
      console.log('\nerror:', err, '\ndata:', data);
      done();
    });
  });

  afterEach(function(done) {
    Users.remove(testUser, function(err) {
      console.log('\nerror:', err);
      done();
    });
  });

  it('Should return user data if the user exists in the database', function(done) {
    supertest(app)
    .get('/tweetdata/v1/user/testUser')
    .expect(200)
    .expect(function(res) {
      expect(res.body[0].twitterUserId).to.equal('testUser');
    })
    .end(done);
  });
});


describe('Server response to requests to the /track/:trackName route', function() {
  var route = '/tweetdata/v1/track/';
  var testTrack = {
    name: 'testTrack',
    streaming: true
  };
  var newTrack = {
    name: 'newTrack'
  };

  beforeEach(function(done) {
    Tracks.create(testTrack, function(err, data) {
      console.log('\nerror:', err);
      done();
    });
  });

  afterEach(function(done) {
    Tracks.remove(testTrack, function(err) {
      if (err) {
        console.log('\nerror:', err);        
      }
      Tracks.remove(newTrack, function(err) {
        if (err) {
          console.log(err);
        }
        done();
      });
    });
  });

  it('Should return track data if the track exists in the database', function(done) {
    supertest(app)
    .get(route + 'testTrack')
    .expect(200)
    .expect(function(res) {
      expect(res.body.streaming).to.equal(true);
    })
    .end(done);
  });

  it('Should save new tracks to DB on post requests', function(done) {
    supertest(app)
    .post(route + 'newTrack')
    .expect(201)
    .end(function(){
      console.log('end reached');
      dbMethods.findTrackByName('newTrack', function(err, data){
        console.log('finding a track', data);
          expect(data.name).to.equal('newTrack');
          done();
      });
    });
  });
  //TODO: test for 409 res when posting an existing track
});

