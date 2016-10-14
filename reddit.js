//mod for reddit functions

var request = require("request");
require("./inquirerReddit.js");


//when reddit.js is run, the inquirer function, homeMenu
    //from the inquirerTest.js is run
    //thus giving the user menu choices


function getPromise(url){
    return(
        new Promise(function(resolve, reject){
            request(url, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        })
    );
}
//end of getPromise function
    //this function makes a new promise for us so that 
    //we don't have to keep making new promises all over the place


function getHomepage(directories) {
    var url = "https://www.reddit.com/" + directories;
  // Load reddit.com/.json and call back with the array of posts
  return (
      getPromise(url + ".json")
      .then(function(homepageResult){
        //   console.log(JSON.parse(homepageResult.body).data);
          return JSON.parse(homepageResult.body).data.children;
      })
    )
}
//end of getHomepage promise function
    //this function will be used in all others since it 
    //JSON parses the data for us
        //Remember DRY ;)

//function used to get post information from the homepage
function getHomepagePosts(directories) {
    var url = "https://www.reddit.com/" + directories;
  // Load reddit.com/.json and call back with the array of posts
  return (
      getPromise(url + ".json")
      .then(function(postResult){
        //   console.log(JSON.parse(homepageResult.body).data);
          var array = JSON.parse(postResult.body);
          
          return array[0].data.children;
      })
    )
}

function getSortedHomepage(sortingMethod) {
    return getHomepage(sortingMethod)
    .then(function(sortingResult){
        // console.log(sortingResult);
        return sortingResult;
    });
  }
// Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
//Sorting Method refers to tabs on the reddit homepage, like hot, new, rising
    //controversial, top, gilded, and promoted.
    
    
function getSubreddit(subreddit){

    return getHomepage("r/" + subreddit)
    //adding r/ so that we can access the subreddit data
        //using our getHomepage promise function
    .then(function(subredditResult){
        return subredditResult;
    });
}
//end of getSubreddit promise function


function getSortedSubreddit(subreddit, sortingMethod){
    return getHomepage("r/" + subreddit + "/" + sortingMethod)
    //don't forget the "/"
        //urls need them to separated directories
    .then(function(sortedSubResults){
        return sortedSubResults;
    });
}
//end of getSortedSubreddit promise function


function getSubreddits(){
    return getHomepage("subreddits")
    .then(function(subsResults){
        return subsResults;
    });
}


//Mods below!

module.exports.homepage = getHomepage;
//exporting getHomepage
    //access with .homepage
module.exports.sortedHomepage = getSortedHomepage;
//exporting getSortedHomepage
    //access with .sortedHomepage
module.exports.subreddit = getSubreddit;
//exporting getSubreddit
    //access with .subreddit
module.exports.sortedSubreddit = getSortedSubreddit;
//exporting getSortedSubreddit
    //access with .sortedSubreddit    
module.exports.subreddits = getSubreddits;    
//exporting getSubreddits function
    //NOTE!
    //this is different from the getSubreddit function
    //subreddits is a special directory in and of itself
    //access with .subreddits
module.exports.fetchposts = getHomepagePosts;
//exporting the functions as mods
    //NOTE
        //the functions don't have ()
        //that is because we want to call them in our other file, not
        //here. Right now we just need the value of our function as
        //a function

// getHomepage("https://www.reddit.com/");

// getSortedHomepage("https://www.reddit.com/", "top")
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.log("there was an error" + err)
// });




