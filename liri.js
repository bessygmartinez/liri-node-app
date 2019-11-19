//Libraries required for the app to work
require("dotenv").config();
let fs = require("fs");
let axios = require("axios");
let moment = require("moment");
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
        bandsInTownSearch(userSearch);
        break;
    
    //Spotify Search
    case "spotify-this-song":
        spotifyThisSong(userSearch);
        break;

    //OMDB Movie Search
    case "movie-this":
        movieThis(userSearch);
        break;

    //Do What It Says Search
    case "do-what-it-says":
        doWhatItSays();
        break;
};

function bandsInTownSearch(band) {
    let queryURL = `https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`;
    axios.get(queryURL).then(
        function(response) {
            if (response.data[0].venue != undefined){
                console.log(`Name of Venue: ${response.data[0].venue.name}`);
                console.log(`Venue Location: ${response.data[0].venue.city}`);

                let dateAndTime = moment(response.data[0].datetime);
                console.log(`Date & Time of Event: ${dateAndTime.format('dddd, MMMM Do YYYY')}`);
            }
            else {
                console.log("Sorry! No results found.")
            }
        }
    ).catch(function(err) {
        console.log(err);
    });
};