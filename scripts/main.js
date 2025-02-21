// Author: Joseph Anucha
//Main JS logic for all modules

// import { getWeatherData } from './modules/weather.js';
// import { getDestinationSuggestions } from './modules/destination.js';

// Record the time for the last modification
const date =  new Date().getFullYear();
let lastMod = new Date(document.lastModified);
var removeTZ = lastMod.toLocaleString();

const newParagraph = document.createElement("p");
newParagraph.innerText =`Last Modification: ${removeTZ}`;

document.querySelector('#timemod').appendChild(newParagraph);

// Create the toggleMenu function. 
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const hamburger = document.getElementById('hamburger');

    // Toggle the menu visibility
    menu.classList.toggle('active');

    // Change the hamburger to 'X' when the menu is active
    if (menu.classList.contains('active')) {
        //hamburger.innerHTML = '&times;';
        hamburger.innerHTML = 'X';
    } else {
        hamburger.innerHTML = '&#9776;';
    }
}






