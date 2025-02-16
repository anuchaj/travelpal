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

// Event listener for search button
document.querySelector("#searchBtn").addEventListener("click", () => {
  const destination = document.querySelector("#destinationInput").value;
  getWeatherData(destination).then(weatherData => { // That's if we are calling destination by city name
    // Display weather data
  });

  // Display suggested cities or places or destinations to the user
  getDestinationSuggestions(destination).then(suggestions => {
    // Display suggestions
  });

});


// Toggle menu visibility for mobile
//function toggleMenu() {
  //const menu = document.getElementById('menu').querySelector('ul');
  //menu.classList.toggle('active');
//}

// Function to toggle the menu bar on smaller viewport
//function toggleMenu(){
    //document.querySelector('#primaryNav').classList.toggle('open');
    //document.querySelector('#hamburgerBtn').classList.toggle('open');
//}

//const hamButton = document.querySelector('#hamburgerBtn');
//hamButton.onclick = toggleMenu;




