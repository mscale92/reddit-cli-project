//Make a promise chain

//first make a prompt

//then make another prompt

//then chain the two prompt promises together
    //this means the second prompt cannot trigger without the return
    //from the first one

//then print out the results from both

var prompt = require("prompt");
var request = require("request");
var colors = require("colors");
//mods


function userNamePromise(question){
    return(
        new Promise(function(resolve, reject){
            prompt.get(question, function(err, userInput){
                if(err){
                    reject(err);
                }
                else{
                    var userName = userInput[question];
                    resolve(userName);
                }
            });
        })
    );
}
//end of userNamePromise function
    //1. return
    //2. make a new Promise with the question and callback of resolve and reject as parameters
    //3. make your prompt.get request with a callback of err and userInput
    //4. write an if(err) statement
        //if there is an err, reject(err);
    //5. write an else statement that contains the rest of the function
        //userInput[question] takes the response from prompt, userInput
        //and translates into into a string by calling upon the key question
    //6. resolve the userName variable, this will be returned.

function userCity(question, name){
    return(
        new Promise(function(resolve, reject){
            prompt.get(question, function(err, userInput){
                if(err){
                    reject(err);
                }
                else{
                    var location = userInput[question];
                    resolve([name, location]);
                }
            })
        })
    );
}

//Calling promises
userNamePromise("Enter your name")
.then(function(userName){
    return (
        userCity("Enter the name of your current city", userName)
    );
})
.then(function(result){
    //result is an array with our user's name and location
    console.log(result[0] + " lives in " + result[1]);
})
.catch(function(err){
    console.log("crap, there was an error" + err);
})
//Let's break down the promise chain
    //1. We need to call our first promise since the other promise relies
        //upon it to happen
    //2. After calling our first promise, we write .then
    //3. .then takes a callback as its parameter
        //its callback takes the returned value, either resolver or reject
        //from the previous promise
    //4. Within the .then we return another promise
        //by returning this promise, we are extracting either its
        //resolve or reject value
    //5. This promise needs to take the returned value of the
        //previous parameter if we want to pass that information
        //through the chain
    //6. Another .then so that we can do something with the reutnr
        //from the previous promise
    //7. This last .then's callback takes the return value from the previous
        //promise as its parameter
        //NOTE
            //our second promise returned two values
            //In order for this to work, just like Promise.all
            //the values must be presented as iterable data,
            //use an array for ease of access
    //8. In order to access the values of our result array,
        //we call upon the array's positions
        //i.e. result[0] etc.
            //This is the easiest way to access values from our
            //iterable data
    //9. Add a catch(function(err)) at the end to catch any
        //rejects from our promises
    
    
    