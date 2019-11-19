//Libraries required for the app to work
require("dotenv").config();
let fs = require("fs");
let axios = require("axios");
let keys = require("./keys.js");
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//Variables to get user input
let spotifyID = process.env.SPOTIFY_ID;
let userCommand = process.argv[2];
let userSearch = process.argv[3];

//Make a log of searches and show error if error occurs
fs.appendFile("log.txt", `${userCommand},`, function(err) {
    if (err) {
        console.log(err);
    };
});

//Switch cases for userCommands
switch (userCommand) {
    //Bands in Town Search
    case "concert-this":
        bandsInTownSearch(bandSearch);
        break;
    
    //Spotify Search
    case "spotify-this-song":
        spotifyThisSong(songSearch);
        break;

    //OMDB Movie Search
    case "movie-this":
        movieThis(movieSearch);
        break;

    //Do What It Says Search
    case "do-what-it-says":
        doWhatItSays();
        break;
};