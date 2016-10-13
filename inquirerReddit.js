//Inquirer test

var inquirer = require('inquirer');
var redditFuncs = require('./reddit.js');
var colors = require("colors");

//start of various menu arrays with object choices
var mainMenu = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'}
];
//main menu

var sortingMethods = [
    {name: "hot", value: "HOT"}
];
//sorting Methods menu


//Useful functions

function promptUserChoices(choices, type, message){
    return (
    inquirer.prompt({
      type: type,
      name: 'menu',
      message: message,
      choices: choices
    })
    );
}
//end of promptUser function
    //this function takes choices as a parameter
        //the choices parameter will decide the choices, 
        //i.e. the menu
    //type as a parameter
        //the type will determine whether the user can
        //enter information or select from a list of choices
    //and message as a parameter
        //the message will be what is displayed to the
        //user as a prompt question

function promptUserInput(message, automatic){
    return (
    inquirer.prompt({
      type: "input",
      name: 'menu',
      message: message,
      default: automatic
    })
    );
}
//end of promptUserInput function
    //no choices option since the answer is the input
    //that the user enters

function displayPosts(post){
    console.log(post.data.title.bold.green);
    console.log("Created by " + post.data.author);
    console.log(("https://www.reddit.com/" + post.data.permalink).cyan);
    console.log("\n");
};
//this function displays the post titles and their links
    //post titles are bolc
    //post links are blue


//homeMenu and beyond!
//Where we decide what our menu displays
function homeMenu(){
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What do you want to do?',
      choices: mainMenu
    }).then(
      function(answers) {
       //All paths to our api go here!
        if(answers.menu === "HOMEPAGE"){
            return redditFuncs.homepage("")
            //use our homepage function to get the homepage data
                //NOTE 
                //we need an empty string since our function
                //takes directory strings in order to
                //modify the url
            .then(function(homepageChildrenArray){
                
                homepageChildrenArray.forEach(displayPosts);
                //use a forEach to go through each object
                    //in the children array in order to access
                    //individual posts
                homeMenu();
                //recursively call homeMenu so that we can access
                    //the main menu once more
            })
            .catch(function(error){
                console.log(error);
            })
            //and of course, catch the error
        }
        //end of if statement for
            //HOMEPAGE option
            
        else if(answers.menu === "SUBREDDIT"){
            return promptUserInput("Enter a subreddit topic", "random")
            .then(function(answerSubRed){
                return redditFuncs.subreddit(answerSubRed.menu);
            })
            .then(function(subRedChildrenArray){
                subRedChildrenArray.forEach(displayPosts);
                homeMenu();
            })
            .catch(function(error){
                console.log(error);
            })
        }
        else{
            console.log("uh oh, it's not there!")
        }
      }
    )
    .catch(function(err){
    console.log("program crashed" + err);
})
}

module.exports.homeMenu = homeMenu;

homeMenu();