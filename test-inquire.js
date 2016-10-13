//testint the inquire input option

var knightChoices = {
  lancelot: "i"
}

var inquirer = require('inquirer');

    inquirer.prompt({
      type: 'input',
      //type of prompt
        //input takes the input the user enters
      name: 'survey',
      //key of the resolved answer
        //answer.key to access the answer
        //answer is the name of our .then parameter 
      message: 'What is your name?',
      //string that is displayed to the user
    })
    .then(function(answer){
      console.log("Welcome " + answer.survey);
    })