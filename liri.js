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

var commandArgs1 = process.argv[2];
var commandArgs2 = process.argv[3];


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


// //spotify
function spotifySong(){

	var songFromFile = commandArgs2;
	console.log("-----------------------------------Spotify Information------------------------------");

	if(commandArgs2 == undefined)
		{	songFromFile =  "The Sign";
	console.log("The Sign by Ace of Base");
	spotifyModule.search({ type: 'track', query: songFromFile }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

	// console.log(data.tracks);
	
	for (var i = 0; i < 20 ; i++) {
		console.log("__________________________________________________Song#"+i+"_____________________________________________________________");
		console.log("Artist's name: " + data.tracks.items[i].artists[0].name);
		console.log("Song's Name : " + data.tracks.items[i].name);
		console.log("Preview url: " + data.tracks.items[i].preview_url);
		console.log("Album Name " + data.tracks.items[i].album.name);
	}

});

}

else{

	spotifyModule.search({ type: 'track', query: songFromFile }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

	// console.log(data.tracks);
	
	for (var i = 0; i < 20 ; i++) {
		console.log("__________________________________________________Song#"+i+"_____________________________________________________________");
		console.log("Artist's name: " + data.tracks.items[i].artists[0].name);
		console.log("Song's Name : " + data.tracks.items[i].name);
		console.log("Preview url: " + data.tracks.items[i].preview_url);
		console.log("Album Name " + data.tracks.items[i].album.name);
	}

});

	
}


}


// //Twitter api
function twitterPosts(){
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
}

function readFile(){
	fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
  	return console.log(error);
  }

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr[0]);
  console.log(dataArr[1]);
  commandArgs2 = dataArr[1];

  if(dataArr[0] === 'spotify-this-song')
  	spotifySong();

  else if(dataArr[0] === 'movie-this')
  	omdbMovie();

});
}

//omdb
function omdbMovie(){
	var movie = commandArgs2;

	if(movie == undefined){
	request("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		if (!error && response.statusCode === 200) {

			console.log("-----------------------------------Movie Information------------------------------");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("imdbRating: "+JSON.parse(body).imdbRating);
			console.log(JSON.parse(body).Ratings[1].Source+":"+JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);		
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);		
		}
	})
	}

	else{
		request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		if (!error && response.statusCode === 200) {

			console.log("-----------------------------------Movie Information------------------------------");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("imdbRating: "+JSON.parse(body).imdbRating);
			console.log(JSON.parse(body).Ratings[1].Source+":"+JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);		
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);		
			}
			})
		}
}


if(commandArgs1 === 'do-what-it-says')
	readFile();

else if(commandArgs1 === 'spotify-this-song')
	spotifySong();

else if(commandArgs1 === 'movie-this')
	omdbMovie();

else if(commandArgs1 === 'my-tweets')
	twitterPosts();