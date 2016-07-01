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
  it('should create a twitter client', function () {
    assert.equal(twitterSearch.twitterClient)
  });

  it('should return an array of tweets with the keyword', function(){
    assert.equal(twitterSearch('everlane'))
  });
});