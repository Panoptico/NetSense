//To run these tests from the root directory: 
  // mocha -R nyan --timeout 5s specs/databaseSpec.js

var _         = require('underscore');
var app       = require('../server/app.js');
var dbMethods = require('../db/database_controllers.js');
var expect    = require('chai').expect;
var express   = require('express');
var mongoose  = require('mongoose');
var supertest = require('supertest');
var Tracks    = require('../server/track/track_model.js');
var Tweets    = require('../server/tweet/tweet_model.js');
var url       = require('url');
var Users     = require('../server/user/user_model.js');

mongoose.createConnection('mongodb://localhost/netsense_test');  


describe('saveNewUser database method', function() {  
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

  it('Should not save if user already exists', function(done) {
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


describe('findUserById', function() {
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

  it('Should update an existing user', function(done) {
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


describe('deleteUserById', function() {
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
    dbMethods.deleteUserById(testUser1.twitterUserId, function(err, data) {
      Users.find(testUser1, function(err, data) {
        expect(data.length).to.equal(0);
        done();
      });
    });
  });

  it('Should only delete the specified user', function(done) {
    dbMethods.deleteUserById(testUser1.twitterUserId, function(err, data) {
      Users.find({}, function(err, data) {
        expect(data.length).to.equal(1);
        done();
      });
    });
  });
});


describe('saveTweet database method', function() {
  var testTweet = {tweetId: 'testTweet', text: '1'};
  var testTweet2 = {tweetId: 'testTweet2', text: '2'};

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

  it('Should not save if tweet already exists', function(done) {
    dbMethods.saveTweet(testTweet, function(err, data) {
      dbMethods.saveTweet(testTweet2, function(err, data) {
        Tweets.find(testTweet, function(err, data) {
          expect(data.length).to.equal(1);
          expect(data[0].text).to.equal('1');
          done();
        });
      });
    });
  });
});


describe('findTweetById database method', function() {
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
      expect(data[0].tweetId).to.equal('test111');
      done();
    });
  });

  it ('Should not find non-existing tweets', function(done) {
    dbMethods.findTweetById('fakeTweet', function(err, data) {
      expect(data.length).to.equal(0);
      done();
    });
  });
});


describe('findTweetsByIds database method', function() {
  var testTweet1 = {tweetId: 'test111'};
  var testTweet2 = {tweetId: 'test222'};
  var testTweet3 = {tweetId: 'test333'};

  beforeEach(function(done) {    
    Tweets.create([testTweet1, testTweet2, testTweet3], function(err, tweet1, tweet2) {
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
    expect(dbMethods.findTweetsByIds).to.be.a('function');
  });

  it ('Should find an existing tweet', function(done) {
    dbMethods.findTweetsByIds(['test111'], function(err, data) {
      expect(data[0].tweetId).to.equal('test111');
      done();
    });
  });

  it ('Should find all specified existing tweets', function(done) {
    dbMethods.findTweetsByIds(['test111', 'test222'], function(err, data) {
      expect(data.length).to.equal(2);
      expect(data[0].tweetId).to.equal('test111');
      expect(data[1].tweetId).to.equal('test222');
      done();
    })
  });

  it ('Should not find non-existing tweets', function(done) {
    dbMethods.findTweetsByIds(['fakeTweet'], function(err, data) {
      expect(data.length).to.equal(0);
      done();
    });
  });
});


describe('findTweetsContainingUserId', function() {
  var testTweet1 = {tweetId: 'testTweet1', twitterUserId: '111'};
  var testTweet2 = {tweetId: 'testTweet2', twitterUserId: '222'};
  var testTweet3 = {tweetId: 'testTweet3', 
                    twitterUserId: '333', 
                    mentionedUserIds: ['222']};
  var user1 = {twitterUserId: '111'};
  var user2 = {twitterUserId: '222', name:'Drew'};
  var user3 = {twitterUserId: '333', name:'Nick'};

  beforeEach(function(done) {
    Tweets.create([testTweet1, testTweet2, testTweet3], function(err, data) {
      Users.create([user1, user2, user3], function(err, data){
        done();        
      });
    });
  });

  afterEach(function(done) {
    Tweets.remove({}, function(err) {
      Users.remove({}, function(err) {
        done();        
      });
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.findTweetsContainingUserId).to.be.a('function');
    done();
  });

  it('Should find a tweet with a twitterUserId matching the passed in userId param', function(done){
    dbMethods.findTweetsContainingUserId('111', function(err, data){
      expect(data.length).to.equal(1);
      expect(data[0].twitterUserId).to.equal('111');
      done();
    });
  });

  it('Should find tweets with mentionedUserIds containing the passed in userId param', function (done) {
    dbMethods.findTweetsContainingUserId('222', function(err, data) {
      console.log('got here', data.length);
      expect(data.length).to.equal(2);
      console.log(data);
      done();
    });
  });
});


describe('deleteTweet', function() {
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
        Tweets.find({}, function(err, data) {
          expect(data.length).to.equal(1);
          done();
        });
      });
    });
  });
});


describe('findTracksByNames database method', function() {
  var testTrack1 = {name: 'test111'};
  var testTrack2 = {name: 'test222'};
  var testTrack3 = {name: 'test333'};

  beforeEach(function(done) {    
    Tracks.create([testTrack1, testTrack2, testTrack3], function(err, tweet1, tweet2) {
      done();
    }); 
  });

  afterEach(function(done) {    
    //delete all track documents from the test db
    Tracks.remove({}, function(err) {
      done();
    }); 
  });

  it('Should be a function', function() {
    expect(dbMethods.findTracksByNames).to.be.a('function');
  });

  it ('Should find an existing track', function(done) {
    dbMethods.findTracksByNames(['test111'], function(err, data) {
      expect(data[0].name).to.equal('test111');
      done();
    });
  });

  it ('Should find all specified existing tracks', function(done) {
    dbMethods.findTracksByNames(['test111', 'test222'], function(err, data) {
      expect(data.length).to.equal(2);
      expect(data[0].name).to.equal('test111');
      expect(data[1].name).to.equal('test222');
      done();
    })
  });

  it ('Should not find non-existing tracks', function(done) {
    dbMethods.findTracksByNames(['fakeTrack'], function(err, data) {
      expect(data.length).to.equal(0);
      done();
    });
  });
});


describe('saveNewTrackByName', function() {
  afterEach(function(done) {
    Tracks.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.saveNewTrackByName).to.be.a('function');
    done();
  });

  it('Should create a new track', function(done) {
    dbMethods.saveNewTrackByName('JavaScript', function(err, data) {
      Tracks.find({name: 'JavaScript'}, function(err, data) {
        expect(data.length).to.equal(1);
        Tracks.find({name: 'Cats'}, function(err, data) {
          expect(data.length).to.equal(0);
          done();
        });
      });
    });
  });
});


describe('addTweetToTrack', function() {
  beforeEach(function(done) {
    Tracks.create({name: 'Ember'}, function(err, data) {
      done();
    });
  });

  afterEach(function(done) {
    Tracks.remove({}, function(err) {
      done();
    });
  });

  it('Should be a function', function(done) {
    expect(dbMethods.saveNewTrackByName).to.be.a('function');
    done();
  });

  it('Should add tweets to a track', function(done) {
    dbMethods.addTweetToTrack('Ember', '12345', function(err, data) {
      Tracks.find({name: 'Ember'}, function(err, data) {
        expect(data[0].tweets.length).to.equal(1);
        expect(data[0].tweets[0]).to.equal('12345');
        done();
      });
    });
  });
});
