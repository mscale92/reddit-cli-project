//mod for reddit functions

var request = require("request");

/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage() {
  // Load reddit.com/.json and call back with the array of posts
  return(
      new Promise(function(resolve, reject){
          request("https://www.reddit.com/.json", function(err, result){
              if(err){
                  reject(err);
              }
              else{
                  try{
                      var homepage = JSON.parse(result.body);
                      homepage = homepage.data.children;
                      console.log(homepage);
                      resolve(homepage);
                  }
                  catch(error){
                      reject(error);
                  }
              }
          });
      })
    );
}

/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod) {
    var url = "https://www.reddit.com/" + sortingMethod + ".json";
    return(
        new Promise(function(resolve, reject){
            request(url, function(err, result){
                if(err){
                    reject(err);
                }
                else{
                    try{
                        
                    }
                    catch(error){
                        reject(error);
                    }
                }
            })
        })
    );
  }
// Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods


module.exports.get = getHomepage();