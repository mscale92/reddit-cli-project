//mod for reddit functions

var request = require("request");

/*
This function should "return" the default homepage posts as an array of objects
*/
//Don't use new Promise everywhere
//just put it in a function and call that

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
            })
        })
    )
}
//end of getPromise function
    //this function makes a new promise for us so that 
    //we don't have to keep making new promises all over the place


function getHomepage(url) {
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


function getSortedHomepage(url, sortingMethod) {
    return getHomepage(url + sortingMethod)
    .then(function(sortingResult){
        // console.log(sortingResult);
        return sortingResult;
    });
  }
// Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
//Sorting Method refers to tabs on the reddit homepage, like hot, new, rising
    //controversial, top, gilded, and promoted.
    
    
function getSubreddit(url, subreddit){
    return getHomepage(url + "r/" + subreddit)
    //adding r/ so that we can access the subreddit data
        //using our getHomepage promise function
    .then(function(subredditResult){
        return subredditResult;
    });
}
//end of getSubreddit promise function


function getSortedSubreddit(url, subreddit, sortingMethod){
    return getHomepage(url + "r/" + subreddit + "/" + sortingMethod)
    //don't forget the "/"
        //urls need them to separated directories
    .then(function(sortedSubResults){
        return sortedSubResults;
    });
}
//end of getSortedSubreddit promise function


function getSubreddits(url){
    return getHomepage(url + "subreddits")
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




