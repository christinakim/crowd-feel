var assert = require('chai').assert;
var twitterSearch = require('../twitterSearch');
var sentimentAnalysis = require('../sentimentAnalysis');
var dotenv = require('dotenv').config();

describe('sentimentAnalysis', function() {
  it('should be a function', function () {
    assert.equal(typeof sentimentAnalysis, 'function');
  });

  it('should return a object which includes sentiment score as a number', function(){
    assert.equal(typeof sentimentAnalysis('Cats are cool').score, 'number');
  });
});

describe('twitterSearch', function() {
  it('should return an array for callback', function() {
    twitterSearch('everlane', function(data){
      assert.equal(typeof data, 'array');
    });
  });

  it('should return array of tweets with their sentiment analysis', function() {
    twitterSearch('everlane', function(data){
      assert.equal(typeof data[0].tweet, 'string');
      assert.equal(typeof data[0].score, 'number');
    });
  });
});
