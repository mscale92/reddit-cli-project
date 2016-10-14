//Inquirer test

"use strict";
//mods
var inquirer = require('inquirer');
var redditFuncs = require('./reddit.js');
require("colors");
const imageToAscii = require("image-to-ascii");
const computeSize = require("compute-size");

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
 

function addMainMenu(postList){
    postList.push(new inquirer.Separator("   "));
    postList.push(new inquirer.Separator());
    postList.push({name: "Main Menu", value: "Main Menu"});
    postList.push(new inquirer.Separator());
    return postList;
}
//Adds a main menu option to post listings   

function imagesAscii(imagesURL, post){
    return (new Promise(function(resolve, reject){
        imageToAscii(imagesURL,
        (err, converted) => {
        if(err){
            reject(err);
        }
        else{
            console.log(converted);
            resolve(post);
        }
        })
    })
    )
}    
//imagesAscii function,
    //converts images to ascii


function postTemplate(post){
    console.log("\n");
    console.log(post.data.title.bold.green);
    console.log("Created by " + post.data.author);
    console.log(("https://www.reddit.com" + post.data.url).cyan);
    console.log("\n");
    homeMenu();
}
//Template, stylizing of the posts
    //when a post is displayed, this is how, and what
    //is displayed
//always runs the homeMenu function at the end so that users can
    //access other pages
    
function displayPosts(post){
    if(post.data.preview){
        //
        var imagesURL = post.data.thumbnail;
        return imagesAscii(imagesURL, post)
        .then(function(post){
            postTemplate(post);
            //post Template styles the posts and selects the data
            //that will be used
        })
        .catch(function(err){
            console.log(err);
        })
    }
    else{
        postTemplate(post);
        
    }
};
//this function displays the post titles and their links, and images
    //post titles are bold and green
    //author is in white
    //post links are blue
        //images are converted using the imagesAscii function above


function extract(childrenArray){
    childrenArray.forEach(displayPosts);
    //use a forEach to go through each object
        //in the children array in order to access
        //individual posts
    //displayPosts works for homepage posts,
        //subreddits don't have permalinks
}
//Extract data from childrenArray and then display the Posts
    //does not work for Subreddits



//Extracts data for posts to be selected with the console menu
    //takes the necessary data that the menu
    //needs to be create
        //i.e. get the choices
function postSelectorExtractMenu(childrenArray){
    return childrenArray.reduce(function(array, posts){
            //take each position, posts, in the children array of data
        array.push(new inquirer.Separator("   "));
        array.push({
                name: posts.data.title,
                value: posts.data.permalink
                });
        return array;
    }, [])
    //use reduce to return a new array that is composed
        //of objects that the choices parameter can process
        //specifically the title and the link
    //reduce is necessary to add spaces between the posts
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
            return redditFuncs.fetchposts(postName.menu)
            //use homepage function, since the permalink begins with \r already
                //fetchposts uses the getHomepagePosts function in reddit.js
            .then(function(postChildrenArray){
                return extract(postChildrenArray);
                //user the extract function to remove data from the
                    //postChildrenArray, this done with a forEach
                        //the forEach method uses the displayPosts
                        //function to properly display the title, author
                        //link and image to the post
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

function homepageChoice(directory){
    return redditFuncs.homepage(directory)
    //use our homepage function to get the homepage data
        //NOTE 
        //we need an empty string since our function
        //takes directory strings in order to
        //modify the url
    .then(function(childrenArray){
        return postSelectorExtractMenu(childrenArray);
        //extract data from the children array
            //in order to display our posts
            //in a selectable menu format
            //in our console
    })
    .then(function(postList){
        return addMainMenu(postList);
        //add a main menu option to the listing
    })
    .then(function(postList){
        return postSelector(postList);
        //create the menu with inquirer
            //and the postList acting as the array
            //for the choice parameter
    })
    .catch(function(error){
        console.log(error);
    })
    //and of course, catch the error
}
//homepage choice from the main menu

function listPosts(childrenArray){

        postSelectorExtractMenu(childrenArray)
        //extract data from the children array
            //in order to display our posts
            //in a selectable menu format
            //in our console
        
        .then(function(postList){
            return addMainMenu(postList);
        })
        .then(function(postList){
            return postSelector(postList);
        })
        .catch(function(error){
            console.log(error);
        })
}


function subRedChoice(){
    return promptUserInput("Enter a subreddit topic", "random")
    .then(function(answerSubRed){
        return redditFuncs.subreddit(answerSubRed.menu);
    })
    .then(function(childrenArray){
        return postSelectorExtractMenu(childrenArray);
    })
    .then(function(postList){
        return addMainMenu(postList);
    })
    .then(function(postList){
        return postSelector(postList);
    })

}
//What happens after the subreddit choice from the main menu


//SubReddits Functions!!!
//First what happens when you choose SubReddits from the main
    //menu
function subRedsChoice(){
    return redditFuncs.subreddits()
        //first call the subreddits function in the reddit.js file
            //does not take a parameter since it is always
            //subreddits
    .then(function(subRedsChildrenArray){
        return extractSubRedsCategories(subRedsChildrenArray)
        //take the returned children array from the subreddits json
            //file and put it through the extractSubRedsCategories function
        //this function makes an array that has the name of the
            //category as the values for the key names, name and value
            //each position in an object with name: and value:
            //this is necessary format for the choices option 
            //for the inquire prompt function
    })
    .then(function(subRedsCategories){
        return promptUserChoices(subRedsCategories, "list", "Choose a Subreddits Topic");
        //creates a menu of the subReddits categories using the
            //return array which contains the names and values for the
            //the choices parameter for the inquirer prompt
    })
    .then(function(result){
        return homepageChoice("/r/" + result.menu);
    })
    .catch(function(error){
        console.log(error);
    })
}
//end of subRedsChoice function
    //what happens if SubReddits is chosen on the main menu

function extractSubRedsCategories(subRedsChildrenArray){
return subRedsChildrenArray.reduce(function(array, subReds){
        //take each position, subReds, in the children array of data
        array.push(new inquirer.Separator("   "));
        array.push({
            name: subReds.data.display_name,
            value: subReds.data.display_name
        });
        return array;
        //returns an object for each array position containing
            //the display name as the key and the value
            //this format is used for the choices parameter
            //in the inquire prompt
    }, []);
    //end of reduce function extraction
        //display names and links from subreddits
}
//end of extractSubRedsCategories function
    //takes the array, children array, produced by the getsubreddits
        //function in reddit.js file
    //then creates an object with the name and value equal to
        //the display_name, which is the category name
        //e.g. Ask Reddit
    //the name will be used in the name parameter in the inquire
        //function, what will show up in the menu
    //the value is what the inquire function will return
            //remember to use answer.menu to receive the value string!
        //the value will be used in the url to access the category
        //page

//End of Subreddits Functions!!!

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
            return homepageChoice("")
            .catch(function(err){
                console.log("there was an error" + err);
            });
        }
        //end of if statement for
            //HOMEPAGE option
            
        else if(answers.menu === "SUBREDDIT"){
            return subRedChoice()
            .catch(function(err){
                console.log("there was an error" + err);
            });
        }
        //end of else if for
            //SUBREDDIT option
            
        else if(answers.menu === "SUBREDDITS"){
                return subRedsChoice()
                .catch(function(err){
                    console.log("there was an error" + err);
                });
        }
        //end of else if for
            //SUBREDDITS option
        
        else{
            console.log("Bye for now!")
            return;
        }
      }
    )
    .catch(function(err){
    console.log("program crashed" + err);
})
}

// module.exports.homeMenu = homeMenu;

homeMenu();