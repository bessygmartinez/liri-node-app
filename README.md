# LIRI Node App
#### Created: November 2019
---

## ABOUT LIRI
LIRI, a command line Node app that takes in search parameters and returns data, is short for *Language Interpretation and Recognition Interface*. The search parameters will depend on the `COMMAND` the user chooses. All commands entered and their resulting data are logged in the log.txt file. The commands and searh parameters that can be used with LIRI are as follows:

* :guitar: `concert-this` - *Artist*
  * This command will call the Bands In Town API and return the first search result of the *Artist* the user entered.
  <br /> <br />
  
  
* :musical_note: `spotify-this-song` - *Song Title*
  * This command will call the Spotify API and return the first search result of the *Song Title* the user entered.
  <br /> <br />
  

* :movie_camera: `movie-this` - *Movie Title*
  * This command will call the OMDB API and return the first search result of the *Movie Title* the user entered.
  <br /> <br />
  
  
* :question: `do-what-it-says` - *N/A*
  * This command will read the random.txt file and return the search results for each command listed above with a pre-defined search parameter.
   <br /> <br />
---

## BEFORE USING LIRI
* Begin by cloning this repository into a directory of your choice.
* Open your terminal, such as Bash or Integrated Terminal in Visual Code Studio.
* Navigate to the folder where you cloned this repository.
* Run `npm install` in the command line to install the required dependencies.
* Once the dependencies have installed, you can start using LIRI.
---

## USING LIRI
1. You have four command line options: `concert-this`, `spotify-this-song`, `movie-this`, or `do-what-it-says`
    * If `node liri.js concert-this` with a desired *Artist* name is run, the app will return:
        * *Artist*
        * Name of Venue where the *Artist* will play next
        * Location of aforementioned venue
        * Date of the event
        * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/concert-this.gif "concert-this")
    * If `node liri.js spotify-this-song` with a desired *Song Title* is run, the app will return:
        * *Song Title*
        * Artist(s) name
        * A link to a preview of the song (if available)
        * Album name where the song title is from
        * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/spotify-this-song.gif "spotify-this-song")
    * If `node liri.js movie-this` with a desired *Movie Title* is run, the app will return:
        * *Movie Title*
        * Release Year
        * IMDB Rating
        * Rotten Tomatoes Rating
        * Country movie was produced in
        * Language
        * Plot synopsis
        * Actors
        * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/movie-this.gif "movie-this")
    * If `node liri.js do-what-it-says` is run, the app will read the random.txt file and return the search results for each command listed above with a pre-defined search parameter for each command.
      * `random.txt`:
      ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/randomtxt.gif "random.txt")
      * **Example:**
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/do-what-it-says.gif "do-what-it-says")
    * Every command that is run will be logged in the `log.txt` file
      * `log.txt`:
     ![alt text](https://raw.githubusercontent.com/bessygmartinez/liri-node-app/master/gifs/logtxt.gif "log.txt")
---
    
## TECHNOLOGIES USED
  * JavaScript
  * Node.js
      * Node packages:
        * FS
        * Axios
        * DotEnv
        * Moment
        * Node-Spotify-API
---

## APIs USED
  * Bandsintown
  * OMDB
  * Spotify
