//Chains and all! Ultimate promises

//Make a prompt asking for user location

//then make a function that waits two seconds

//then console.log 3 2 1 with two second pauses inbetween

//then spit out the prompt answer and a starter pokemon


var prompt = require("prompt");
var request = require("request");
var colors = require("colors");

const imageToAscii = require("image-to-ascii");
const computeSize = require("compute-size");
//mods

var url = "http://images.nintendolife.com/news/2013/09/youll_be_able_to_choose_bulbasaur_charmander_or_squirtle_in_pokemon_x_and_y/attachment/0/885x.jpg";

function bannerPromise(url, previousPromises){
    return(
        new Promise(function(resolve, reject){
            imageToAscii(url, 
            {
                size: computeSize({
                // Wanted size
                width: 30
                // 40% of the screen height
              , height: "50%"
            }, {
                // Object width (e.g. an image)
                width: 64
                // ..and the height
              , height: 64
            }, {
                screen_size: {
                    width: 100
                  , height: 200
                },
                preserve_aspect_ratio: false
            })
            }, 
            (err, converted) => {
                if(err){
                    reject(err);
                }
                else{
                console.log(converted);
                resolve(previousPromises);
                }
            });
        })
    );
}


function promptPromise(question){
    return(
        new Promise(function(resolve, reject){
            prompt.get(question, function(err, userInput){
                if(err){
                    reject(err);
                }
                else{
                    
                    resolve(userInput[question]);
                }
            });
        })
    );
}
//end of promptPromise function

function pause(milliseconds, valueOfPromises){
    return(
        new Promise(function(resolve){
            setTimeout(function(){
                resolve(valueOfPromises);
            }, milliseconds);
        })
    );
}
//end of pause function
    //our pause function pauses for a specified number of milliseconds
    //it takes milliseconds as a parameter
    //it then returns a new promise with only resolve!
        //whoa, what?!?!
        //since we're using the setTimeout function
            //and it rarely fails
        //we are assuming it won't so there isn't a need
        //for reject.
    //return an empty resolve since this function just causes a delay
        //unless you need to pass something along, callback
    
function starterPokePromise(){
    var starters = [1, 4, 7, 25];
    var num = Math.floor(Math.random() * starters.length);
    var url = "http://pokeapi.co/api/v2/pokemon/" + starters[num];
    return(
        new Promise(function(resolve, reject){
            request(url, function(err, pokemon){
                if(err){
                    reject(err);
                }
                else{
                    pokemon = JSON.parse(pokemon.body);
                    var poke = pokemon.name;
                    resolve(poke);
                }
            });
        })
    );
}
//end of starterPokePromise function
    //randomly selects a starter pokemon from an array
    //with the numbers of the "four" starters
    
var starterPokemon = starterPokePromise();
var userName = promptPromise("Enter your name");


Promise.all([userName, starterPokemon])
.then(function(data){
    return pause(1000, data);
})
.then(function(data){
    return bannerPromise(url, data);
})
.then(function(data){
    return pause(1000, data);
})
.then(function(data){
    console.log("Your pokemon is almost ready!");
    return pause(1000, data);
})
.then(function(data){
    console.log("3".red);
    return pause(1000, data);
})
.then(function(data){
    console.log("2".yellow);
    return pause(1000, data);
})
.then(function(data){
    console.log("1".green);
    return pause(1000, data);
})
.then(function(data){
    var name = data[0];
    var starter = data[1];
    console.log("Congratulations, " + name + "! A "  + starter + " is your starter pokemon!");
})
.catch(function(err){
    console.log("crap there was an error!" + err);
})