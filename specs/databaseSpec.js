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


xdescribe('saveNewUser database method', function() {  
  var testUser = {twitterUserId: 'testUser'};

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
    dbMethods.saveNewUser(testUser, function(err, data) {
      Users.find(testUser, function(err, data) {
        expect(data[0]).to.have.property('twitterUserId');
        expect(data[0].twitterUserId).to.equal('testUser');
        done();        
      });
    });
  });

  xit('Should not save if user already exists', function(done) {
    var numberOfUsers;
    dbMethods.saveNewUser(testUser, function(err, data) {
      Users.find(testUser, function(err, data) {
        numberOfUsers = data.length;
        dbMethods.saveNewUser(testUser, function(err, data) {
          Users.find(testUser, function(err, data) {
            expect(data.length).to.equal(numberOfUsers);
            done();
          });
        });
      });
    });
  });
});


xdescribe('findUserById', function() {
  var testUser1 = {twitterUserId: 'user1'};
  var testUser2 = {twitterUserId: 'user2'};

  beforeEach(function(done) {
    Users.create([testUser1, testUser2], function(err, data1, data2) {
      done();
    });
  });

  afterEach(function(done) {
    Users.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.findUserById).to.be.a('function');
    done();
  });

  it('Should find an existing user', function(done) {
    dbMethods.findUserById('user1', function(err, data) {
      expect(data[0].twitterUserId).to.equal('user1');
      done();
    });
  });

  it('Should not find non-existing users', function(done) {
    dbMethods.findUserById('fakeUser', function(err, data) {
      expect(data.length).to.equal(0);
      done();
    });
  });
});


describe('updateUserInfo', function() {
  var testUser = {
    twitterUserId: 'testUser',
    name: 'bob'
  };

  var updatedUser = {
    twitterUserId: 'testUser',
    name: 'joe'
  };

  beforeEach(function(done) {
    Users.create(testUser, function(err, data) {
      done();
    });
  });

  afterEach(function(done) {
    Users.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.updateUserInfo).to.be.a('function');
    done();
  });

  xit('Should update an existing user', function(done) {
    dbMethods.updateUserInfo(updatedUser, function(err, data) {
      Users.find(updatedUser, function(err, data) {
        expect(data[0].name).to.equal('joe');
        done();
      });
    });
  });

  it('Should not update a non-existing user', function(done) {
    dbMethods.updateUserInfo({
      twitterUserId: 'fakeUser',
      name: 'mike'
    }, function(err, data) {
      expect(data).to.equal(0);
      done();
    });
  });
});

xdescribe('deleteUserById', function() {
  var testUser1 = {twitterUserId: 'testUser1'};
  var testUser2 = {twitterUserId: 'testUser2'};

  beforeEach(function(done) {
    Users.create([testUser1, testUser2], function(err, data) {
      done();
    });
  });

  afterEach(function(done) {
    Users.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.deleteUserById).to.be.a('function');
    done();
  });

  it('Should delete an existing user', function(done) {
    dbMethods.deleteUserById(testUser1, function(err, data) {
      Users.find(testUser1, function(err, data) {
        expect(data.length).to.equal(0);
        done();
      });
    });
  });

  it('Should only delete the specified user', function(done) {
    dbMethods.deleteUserById(testUser1, function(err, data) {
      Users.find({}, function(err, data) {
        expect(data.length).to.equal(1);
        done();
      });
    });
  });
});


xdescribe('saveTweet database method', function() {
  var testTweet = {tweetId: 'testTweet'};

  afterEach(function(done) {
    Tweets.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function() {
    expect(dbMethods.saveTweet).to.be.a('function');
  });

  it('Should save a tweet to the database', function(done) {
    dbMethods.saveTweet(testTweet, function(err, data) {
      Tweets.find(testTweet, function(err, data) {
        expect(data[0]).to.have.property('tweetId');
        expect(data[0].tweetId).to.equal('testTweet');
        done();
      });
    });
  });

  xit('Should not save if tweet already exists', function(done) {
    dbMethods.saveTweet(testTweet, function(err, data) {
      dbMethods.saveTweet(testTweet, function(err, data) {
        Tweets.find(testTweet, function(err, data) {
          expect(data.length).to.equal(1);
          done();
        });
      });
    });
  });
});


xdescribe('findTweetById database method', function() {
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

  it('Should be a function', function() {
    expect(dbMethods.findTweetById).to.be.a('function');
  });

  it ('Should find an existing tweet', function(done) {
    dbMethods.findTweetById('test111', function(err, data) {
      expect(tweetData[0].tweetId).to.equal('test111');
      done();
    });
  });

  it ('Should not find non-existing tweets', function(done) {
    dbMethods.findTweetById('fakeTweet', function(err, data) {
      expect(tweetData.length).to.equal(0);
      done();
    });
  });
});


xdescribe('findTweetsContainingUserId', function() {

});


xdescribe('deleteTweet', function() {
  var testTweet1 = {tweetId: 'testTweet1'};
  var testTweet2 = {tweetId: 'testTweet2'};

  beforeEach(function(done) {
    Tweets.create([testTweet1, testTweet2], function(err, data) {
      done();
    });
  });

  afterEach(function(done) {
    Tweets.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.deleteTweet).to.be.a('function');
    done();
  });

  it('Should delete an existing tweet', function(done) {
    dbMethods.deleteTweet(testTweet1, function(err, data) {
      Tweets.find(testTweet1, function(err, data) {
        expect(data.length).to.equal(0);
      });
      Tweets.find({}, function(err, data) {
        expect(data.length).to.equal(1);
      });
      done();
    });
  });
});