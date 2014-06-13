//To run these tests from the root directory: mocha -R nyan specs/serverSpec.js

var express = require('express');
var supertest = require('supertest');
var expect = require('chai').expect;
var url = require('url');
var app = require('../server/app.js');
var mongoose = require("mongoose");
var Tweets = require('../db/tweet.js');
var Users = require('../db/user.js');
var dbMethods = require('../db/databaseHelpers.js');

mongoose.createConnection('mongodb://localhost/netsense_test');  

describe('saveNewUser database method', function() {  
  var testUser = {twitterId: 'testUser'};
  this.timeout(5000);    

  afterEach(function(done) {    
    //delete all user records from the test db
    Users.remove({}, function(err) {
      done();
    }); 
  });  

  //tests
  it('Should be a function', function() {
    expect(dbMethods.saveNewUser).to.be.a('function');
  });

  it('Should save a user to the database', function(done) {
    dbMethods.saveNewUser(testUser, function(userdata) {
      Users.find(testUser, function(err, data) {
        // console.log(data);
        expect(data[0]).to.have.property('twitterId');
        done();        
      });
    });
  });

  it('Should not save if user already exists', function(done) {
    var numberOfUsers;
    dbMethods.saveNewUser(testUser, function(userdata) {
      Users.find(testUser, function(err, data) {
        numberOfUsers = data.length;
        dbMethods.saveNewUser(testUser, function(userData) {
          Users.find(testUser, function(err, data) {
            expect(data.length).to.equal(numberOfUsers);
            done();
          });
        });
      });
    });
  });
});

describe('findTweetById database method', function() {
  this.timeout(5000);    
  var testTweet1 = {tweetId: 'test111'};
  var testTweet2 = {tweetId: 'test222'};


  beforeEach(function(done) {    
    Tweets.create([testTweet1, testTweet2], function(err, tweet1, tweet2) {
      done();
    }); 
  });

  afterEach(function(done) {    
    //delete all tweet documents from the test db
    Tweets.remove({}, function(err) {
      done();
    }); 
  });

  it ('Should find an existing tweet', function(done) {
   dbMethods.findTweetById('test111', function(tweetData) {
      expect(tweetData[0].tweetId).to.equal('test111');
      done();
    });
  });

  it ('Should not find non-existing tweets', function(done) {
    dbMethods.findTweetById('fakeTweet', function(tweetData, err) {
      expect(tweetData.length).to.equal(0);
      done();
    });
  });

});

describe('saveTweet', function() {

});

describe('deleteTweet', function() {

});