//Inquirer test

var inquirer = require('inquirer');
var redditFuncs = require('./reddit.js');
require("colors");

//start of various menu arrays with object choices
var mainMenu = [
    new inquirer.Separator(),
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'},
  {name: 'Exit', value: 'Exit'},
  new inquirer.Separator()
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
    console.log("\n");
    console.log(post.data.title.bold.green);
    console.log("Created by " + post.data.author);
    console.log(("https://www.reddit.com/" + post.data.permalink).cyan);
    console.log("\n");
};
//this function displays the post titles and their links
    //post titles are bold and gree
    //author is in white
    //post links are blue
    
function displaySubReddits(post){
    console.log("\n");
    console.log(post.data.title.bold.green);
    console.log("Created by " + post.data.author);
    console.log(("https://www.reddit.com" + post.data.url).magenta);
    console.log("\n");
};


function extract(childrenArray){
    childrenArray.forEach(displayPosts);
    //use a forEach to go through each object
        //in the children array in order to access
        //individual posts
    homeMenu();
}
//Extract data from childrenArray and then display the Posts
    //does not work for Subreddits

//Extracts data for posts to be selected with the console
function postSelectorExtract(childrenArray){
    return childrenArray.map(function(posts){
            //take each position, posts, in the children array of data
            return{
            name: posts.data.title,
            value: posts.data.permalink
            }
    })
}

//Creates a menu of posts that can be selected with the console
function postSelector(postList){
    return promptUserChoices(postList, "list", "Pick a Post")
   .then(function(postName){
        //postName is the name of the object returned from the
            //user
        if(postName.menu === "Main Menu"){
            //postName.menu takes the key, menu, and uses it
            //to extract the value which is the permalink, or link, of the post
            return homeMenu();
            //if main menu is selected, we go back to the main menu
        }
        else{
            var directory = postName.menu.replace("/r", "r");
            
            return redditFuncs.fetchposts(directory)
            //use homepage function, since the permalink begins with \r already
                //though use replace to get rid of the \ before the r
            .then(function(postChildrenArray){
                return extract(postChildrenArray);
            })
            .catch(function(err){
                console.log("there was an error" + err);
            });
        }
                    
    
    })
        //STOPPING POINT
            //extract posts in menu format so that you can 
            //select posts with the console
}

function homepageChoice(){
    return redditFuncs.homepage("")
    //use our homepage function to get the homepage data
        //NOTE 
        //we need an empty string since our function
        //takes directory strings in order to
        //modify the url
    .then(function(homepageChildrenArray){
        return postSelectorExtract(homepageChildrenArray);
    })
    .then(function(postList){
        postList.push(new inquirer.Separator());
        postList.push({name: "Main Menu", value: "Main Menu"});
        postList.push(new inquirer.Separator());
        return postList;
    })
    .then(function(postList){
        return postSelector(postList);
    })
    .catch(function(error){
        console.log(error);
    })
    //and of course, catch the error
}
//homepage choice from the main menu


function subRedChoice(){
    return promptUserInput("Enter a subreddit topic", "random")
        .then(function(answerSubRed){
            return redditFuncs.subreddit(answerSubRed.menu);
        })
        .then(function(subRedChildrenArray){
            return extract(subRedChildrenArray);
        })
        .catch(function(error){
            console.log(error);
        })
}
//subreddit choice from the main menu


function subRedsChoice(){
    return redditFuncs.subreddits()
    .then(function(subRedsChildrenArray){
        return subRedsChildrenArray.map(function(subReds){
            //take each position, subReds, in the children array of data
            return{
            name: subReds.data.display_name,
            value: subReds.data.display_name
            }
            //returns an object for each array position containing
                //the display name as the key and the value
                //this format is used for the choices parameter
                //in the inquire prompt
        });
        //end of map function extraction
            //display names and links from subreddits
    })
}

function subsMenu(subRedsList){
    return promptUserChoices(subRedsList, "list", "Pick a Subreddits Topic")
    .then(function(subredditName){
        if(subredditName.menu === "Main Menu"){
            //get Main Menu out!
            return homeMenu();
        }
        else{
            return redditFuncs.subreddit(subredditName.menu)
            .then(function(subsChildrenArray){
                return extractSubs(subsChildrenArray);
            })
            .catch(function(err){
                console.log("there was an error" + err);
            });
        }
                    
    })
}
//end of subsMenu function
    //produces the subsMenu

function extractSubs(childrenArray){
    childrenArray.forEach(displayPosts);
    //use a forEach to go through each object
        //in the children array in order to access
        //individual posts
    return subRedsChoice()
    .then(function(subRedsList){
        subRedsList.push(new inquirer.Separator());
        subRedsList.push({name: "Main Menu", value: "Main Menu"});
        subRedsList.push(new inquirer.Separator());
        subsMenu(subRedsList);
    })
    .catch(function(err){
        console.log("there was an error" + err);
    });
}


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
            return homepageChoice();
        }
        //end of if statement for
            //HOMEPAGE option
            
        else if(answers.menu === "SUBREDDIT"){
            return subRedChoice();
        }
        //end of else if for
            //SUBREDDIT option
            
        else if(answers.menu === "SUBREDDITS"){
                return subRedsChoice()
                .then(function(subRedsList){
                    subRedsList.push(new inquirer.Separator());
                    subRedsList.push({name: "Main Menu", value: "Main Menu"});
                    subRedsList.push(new inquirer.Separator());
                    subsMenu(subRedsList);
                })
                .catch(function(err){
                    console.log("there was an error" + err);
                });
                
                // .then(function(subRedsList){
                //     return promptUserChoices(subRedsList, "list", "Pick a Subreddits Topic")
                // })
                // .then(function(subredditName){
                //     if(subredditName.menu === "Main Menu"){
                //         //get Main Menu out!
                //         return homeMenu();
                //     }
                //     else{
                //         return redditFuncs.subreddit(subredditName.menu)
                //         .then(function(subsChildrenArray){
                //             return extractSubs(subsChildrenArray);
                //         })
                //         .catch(function(err){
                //             console.log("there was an error" + err);
                //         });
                //     }
                // })
                
        
        
            }
        
        else{
            console.log("Bye for now!")
        }
      }
    )
    .catch(function(err){
    console.log("program crashed" + err);
})
}

// module.exports.homeMenu = homeMenu;

homeMenu();