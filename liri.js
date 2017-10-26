var twitterKeys = require('./keys.js')


console.log("Access token key: " + twitterKeys.access_token_key);
console.log("Access token secret: " + twitterKeys.access_token_secret);
console.log("Consumer key: " + twitterKeys.consumer_key);
console.log("Consumer Secret: " + twitterKeys.consumer_secret);


//variables for the keys
var accessTokenKey = twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.access_token_secret;
var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;

var command = process.argv[2];// this will take values from random.txt

