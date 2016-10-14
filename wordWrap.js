//practice word wrapping

var wrap = require('word-wrap');

var string = "I just found this baby wrapped up outside my door (Hey!) A tasty little snack for any dinosaur But I just finished breakfast, I'm full up to my head So I'll give him to Yellow instead";

// string = wrap(string,{
//     width: 25,
//     trim: true,
//     indent: "   "
//     });

function indent(string, indent){
console.log(wrap(string,{
    width: 30,
    trim: true,
    indent: "   "
    }
));
}


var string2 = wrap('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

console.log(string2);