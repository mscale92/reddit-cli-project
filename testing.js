var reddit = require("./reddit.js");
//use reddit.homepage to get the homepage function
    //reddit.sortedHomepage to get the sorted homepage function
    //reddit.subreddit to get the subreddit function
    //reddit.sortedSubreddit to get the sortedSubreddit function
    //reddit.subreddits to get the subreddits function
    

    
reddit.homepage("")
.then(function(results){
    console.log(results);
})

// reddit.subreddits()
// .then(function(results){
//     console.log(results[0]);
// })
// .catch(function(err){
//     console.log("Oh no!" + err);
// });

    //testing subreddits mod

// reddit.sortedSubreddit(url, "movies", "top")
// .then(function(results){
//     console.log(results[0]);
// })
// .catch(function(err){
//     console.log("crap, an error happened" + err);
// });

    //testing .sortedSubreddit mod

// reddit.subreddit(url, "movies")
// .then(function(result){
//     console.log(result[0]);
// })
// .catch(function(err){
//     console.log("there was an error" + err);
// })

    //testing .subreddit mod

// reddit.sortedHomepage(url, "top")
// .then(function(result){
//     console.log(result[0]);
// })
// .catch(function(err){
//     console.log("there was an error" + err)
// });

    //testing the .sortedHomepage mod
