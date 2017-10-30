var keys = require('./keys.js');
var fs = require("fs");

console.log("Access token key: " + keys.twitterKeys.access_token_key);
console.log("Access token secret: " + keys.twitterKeys.access_token_secret);
console.log("Consumer key: " + keys.twitterKeys.consumer_key);
console.log("Consumer Secret: " + keys.twitterKeys.consumer_secret);


console.log("Client ID for spotify " + keys.spotifyKeys.clientID);
console.log("Client Secret for spotify " + keys.spotifyKeys.clientSecret);


//variables for the keys
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;

var commandArgs = process.argv;// this will take values from random.txt


var request = require('request');
var spotify = require('node-spotify-api');
var Twitter = require('twitter');

var dataArr;

var client = new Twitter({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token_key: accessTokenKey,
	access_token_secret: accessTokenSecret
});


var spotifyModule = new spotify({
	id: keys.spotifyKeys.clientID,
	secret: keys.spotifyKeys.clientSecret
});

// spotifyModule
//   .search({ type: 'track', query: 'I Want it That Way' })
//   .then(function(response) {
//     // console.log(response);
//     console.log(response.tracks);


//     console.log("Artists " + response.tracks.items[0].artists);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

//spotify
spotifyModule.search({ type: 'track', query: 'I Want it That Way' }, function(err, data) {
	if (err) {
		return console.log('Error occurred: ' + err);
	}

	// console.log(data.tracks);
	
	for (var i = 0; i < 20 ; i++) {
		console.log("__________________________________________________Song#" +i+"_____________________________________________________________");
		console.log("Artist's name: " + data.tracks.items[i].artists[0].name);
		console.log("Song's Name : " + data.tracks.items[i].name);
		console.log("Preview url: " + data.tracks.items[i].preview_url);
		console.log("Album Name " + data.tracks.items[i].album.name);
	}

});


// fs.readFile('random.txt', "utf8",function(error, data){
// 	if(!error){
// 		// console.log(data);
// 		dataArr = data.split(",");
// 		console.log(dataArr);
// 	}


// })




//Twitter api
var params = {screen_name: 'mnc8525'};
client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=20', params, function(error, tweets, response) {
	if (!error) {
	//console.log(tweets[element].text);	
 	//console.log(tweets);

 	var limit = tweets[0].user.statuses_count;
 	//console.log(tweets[0].text);
 	//console.log(tweets[0].created_at);
 	for (var i = 0; i < limit ; i++) {
 		console.log(tweets[i].text +'\n' + " Created at: "+tweets[i].created_at +'\n');
 	}
 }
});



//omdb
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {
