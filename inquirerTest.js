//Inquirer test

var inquirer = require('inquirer');

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

function promptUser(menu){
    return (
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What do you want to do?',
      choices: menu
    })
    );
}
//end of promptUser function
    //this function takes menu as a parameter
    //the menu will decide the choices, i.e. the menu
    //All menus are presented as a list


function homeMenu(){
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'What do you want to do?',
      choices: mainMenu
    }).then(
      function(answers) {
        console.log(answers);
        //it would be in here!!!
      }
    );
}

module.exports.homeMenu = homeMenu;