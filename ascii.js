//Messing with ascii mode to make images appear in the console

const imageToAscii = require("image-to-ascii");
const computeSize = require("compute-size");

imageToAscii("http://images.nintendolife.com/news/2013/09/youll_be_able_to_choose_bulbasaur_charmander_or_squirtle_in_pokemon_x_and_y/attachment/0/885x.jpg", 
{
    size: computeSize({
    // Wanted size
    width: 30
    // 40% of the screen height
  , height: "50%"
}, {
    // Object width (e.g. an image)
    width: 64
    // ..and the height
  , height: 64
}, {
    screen_size: {
        width: 100
      , height: 200
    },
    preserve_aspect_ratio: false
})
    
}, 
(err, converted) => {
    console.log(err || converted);
});