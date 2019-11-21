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
let userSearch = process.argv.slice(3).join(" ");

//Make a log of searches and show error if error occurs
fs.appendFile("log.txt", `---------------------- ${userCommand.toUpperCase()}: ${userSearch.toUpperCase()} ---------------------- \n`, function (err) {
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
        function (response) {
            if (response.data[0].venue != undefined) {
                console.log(" ");
                console.log("---------------------------------------------");
                console.log(" ");
                console.log(`******* ${band} *******`);
                fs.appendFileSync("log.txt", `******* ${band} *******\n`)
                console.log(`Name of Venue: ${response.data[0].venue.name}`);
                fs.appendFileSync("log.txt", `Name of Venue: ${response.data[0].venue.name}\n`);
                console.log(`Venue Location: ${response.data[0].venue.city}`);
                fs.appendFileSync("log.txt", `Venue Location: ${response.data[0].venue.city}\n`);

                let dateAndTime = moment(response.data[0].datetime);
                console.log(`Date & Time of Event: ${dateAndTime.format('dddd, MMMM Do YYYY')}`);
                fs.appendFileSync("log.txt", `Date & Time of Event: ${dateAndTime.format('dddd, MMMM Do YYYY')}\n\n`);
                console.log(" ");
                console.log("---------------------------------------------\n");
            }
            else {
                console.log(" ");
                console.log("Sorry! No results found.\n")
            }
        }
    ).catch(function (err) {
        console.log(err);
    });
};

function spotifyThisSong(song) {
    spotify.search(
        {
            type: "track",
            query: song
        }
    ).then(function (response) {
        if (response.tracks.total === 0) {
            aceOfBaseError();
        }
        else {
            let songs = response.tracks.items;

            songs.forEach(info => {
                console.log(" ");
                console.log("---------- SONG INFO ----------");
                fs.appendFileSync("log.txt", "***** SONG INFO *****\n");
                console.log(`Song Name: ${info.name}`);
                fs.appendFileSync("log.txt", `Song Name: ${info.name}\n`);
                console.log(`Artist(s): ${info.artists[0].name}`);
                fs.appendFileSync("log.txt", `Artist(s): ${info.artists[0].name}\n`);
                console.log(`Preview Song: ${info.preview_url}`);
                fs.appendFileSync("log.txt", `Preview Song: ${info.preview_url}\n`)
                console.log(`Album: ${info.album.name}\n`);
                fs.appendFileSync("log.txt", `Album: ${info.album.name}\n\n`);
            })
        };
    }).catch(function (err) {
        console.log(err);
    });
};

function aceOfBaseError() {
    spotify.search({
        type: "track",
        query: "The Sign"
    })
    .then(function(response) {
        let songs = response.tracks.items;

            songs.forEach(info => {
                console.log(" ");
                console.log("********** No Results found **********");
                console.log('Showing result for "The Sign" by Ace of Base:');
                console.log("---------- SONG INFO ----------");
                console.log(`Song Name: ${info.name}`);
                console.log(`Artist(s): ${info.artists[0].name}`);
                console.log(`Preview Song: ${info.preview_url}`);
                console.log(`Album: ${info.album.name}\n`);
            });
    });
};

function movieThis (movie){
    let queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL)
    .then(function(response) {
        if (response.data.Title != undefined) {
            console.log(" ");
            console.log(`******* Title: ${response.data.Title} ******* `);
            fs.appendFileSync("log.txt", `Title: ${response.data.Title}\n`);
            console.log(`Release Year: ${response.data.Year}`);
            fs.appendFileSync("log.txt", `Release Year: ${response.data.Year}\n`);
            console.log(`IMDB Rating: ${response.data.imdbRating}`);
            fs.appendFileSync("log.txt", `IMDB Rating: ${response.data.imdbRating}\n`);
            console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
            fs.appendFileSync("log.txt", `Rotten Tomatoes Rating: ${response.data.tomatoRating}\n`);
            console.log(`Country Produced In: ${response.data.Country}`);
            fs.appendFileSync("log.txt", `Country Produced In: ${response.data.Country}\n`);
            console.log(`Language: ${response.data.Language}`);
            fs.appendFileSync("log.txt", `Language: ${response.data.Language}\n`);
            console.log(`Plot: ${response.data.Plot}`);
            fs.appendFileSync("log.txt", `Plot: ${response.data.Plot}\n`);
            console.log(`Actors: ${response.data.Actors}\n`);
            fs.appendFileSync("log.txt", `Actors: ${response.data.Actors}\n\n`);
        }
        else {
        console.log(" ");
        console.log("---------------------------------------------");
        console.log ("NO RESULTS FOUND.\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947");
        console.log("It's on Netflix!");
        console.log("---------------------------------------------\n");
        };
    }).catch(function (err) {
        console.log(err);
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        let dataArr = data.split(",");
        bandsInTownSearch(JSON.parse(dataArr[1]));
        spotifyThisSong(dataArr[3]);
        movieThis(dataArr[5]);
    
        if (err) {
            return console.log(err);
        };
    });
};