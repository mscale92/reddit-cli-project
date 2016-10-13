//Practice some promises

//first try a prompt
//then a request
var request = require("request");
var prompt = require("prompt");
var colors = require("colors");

function promptPromise(){
    return(
    //need to return our promise
        new Promise(function(resolve, reject){
                    //our Promise's callback function takes two parameters
                        //resolve and reject
            prompt.get("Enter your name", function(err, userInput){
                if(err){
                    reject(err);
                    //If an error occurs,
                        //the promise's callback will reject the error 
                        //by returning err
                        
                }
                else{
                    var name = userInput["Enter your name"];
                    resolve(name);
                    //resolve means that if the promise went through
                        //without problems, it will return the value
                        //of name, the callback will return this
                    
                }
            })
        })
    )
    //end of new Promise callback
}
//end of promptPromise function

function favColor(){
    return(
        new Promise(function(resolve, reject){
            
            var colorArray = ["blue".bgBlue, "green".bgGreen, "red".bgRed]
            var num = Math.floor(Math.random() * colorArray.length);
            
            resolve(colorArray[num]);
        })
    );
}

function pokePromise(){
    return (
        new Promise(function(resolve, reject){
            var num = Math.floor(Math.random() * 101);
            var url = "http://pokeapi.co/api/v2/pokemon/" + num;
            
            request(url, function(err, pokemon){
                if(err){
                    reject("There's an error" + err);
                }
                else{
                    var ranPoke = JSON.parse(pokemon.body);
                    ranPoke = ranPoke.forms[0];
                    var pokemonName = ranPoke.name;
                    resolve(pokemonName);
                }
            });
        })
    );
}

// promptPromise()
// .then(function(name){
    //this calls another promise that takes the returned value 
        //from the promise before it
        
//     console.log("Your name is " + name);
// })
// .catch(function(err){
//     console.log("Oops an error", err);
// });
//calling our functions

//If you want to call more than one promise function

var userName = promptPromise();
var userColor = favColor();
var userPoke = pokePromise();
//create global variables that are set to the value
    //of the return values from our promises

Promise.all([userName, userColor, userPoke])
    //Promise all needs an iterator, like an array, within 
    //its parameters in order to access other promise
    //functions
.then(function(data){
    console.log(data[0] + " loves the color " + data[1] + " and just caught " + data[2] + "!!!");
})
.catch(function(err){
    console.log("uh oh, there's been an error" + err);
});