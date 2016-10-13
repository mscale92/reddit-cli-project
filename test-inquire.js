//mods
var redditFuncs = require('./reddit.js');
require("colors");
//test the inquire input option

// var inquirer = require('inquirer');

//     inquirer.prompt({
//       type: 'input',
//       //type of prompt
//         //input takes the input the user enters
//       name: 'survey',
//       //key of the resolved answer
//         //answer.key to access the answer
//         //answer is the name of our .then parameter 
//       message: 'What is your name?',
//       //string that is displayed to the user
//     })
//     .then(function(answer){
//       console.log("Welcome " + answer.survey);
//     })
    
    
//testing putting subreddit info into an object
redditFuncs.subreddits()
.then(function(subRedsChildrenArray){
    return subRedsChildrenArray.map(function(subReds){
        return {
            [subReds.data.title]: ("https://www.reddit.com" + subReds.data.url).magenta
        };
        
        //THIS IS YOUR CHECKPOINT!!!
      });
    
    
})
.then(function(subRedsList){
  console.log("hey");
  return promptUserChoices(subRedsList, list, "Pick a Subreddits Topic")
})