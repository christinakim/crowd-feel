var util = require('util');
var twitter = require('twitter');
var sentimentAnalysis = require('./sentimentAnalysis');
var dotenv = require('dotenv').config();


var arr = [];
var twitterClient = new twitter({
  consumer_key: 'xXwv9OiBh3CZdugxN48vZSPLQ',
  consumer_secret: 'kGi5j3FYm378iDB8WsMneVqqNRU5rMDz7odTvpiUvjF9gjZHcc',
  access_token_key: '2675160464-97ZeLTscGjoOKyh77cX78dyfCJgx98kh3FpdQbj',
  access_token_secret: 'SpB3v21wWib2ct2DqxNe4UaIY2I92Zc7ttaFBc60Q7gcF'
});

module.exports = function(text, callback) {
  var response = [], dbData = []; 
  twitterClient.search(text, function(data) {
    for (var i = 0; i < data.statuses.length; i++) {
      var resp = {};
      resp.tweet = data.statuses[i];
      resp.sentiment = sentimentAnalysis(data.statuses[i].text);
      dbData.push({
        "tweet" : resp.tweet.text,
        "score" : resp.sentiment.score
      });
      response.push(resp);
    };

    arr.push(dbData);
    callback(response);
  });
}
