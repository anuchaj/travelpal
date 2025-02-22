// Author: Joseph Anucha

//Main JS logic for all modules

import { getWeatherData } from '../modules/weather.js';
import { getDestinationSuggestions } from '../modules/destination.js';
import { getReviews } from '../modules/reviews.js';


// Event listener for search button
document.querySelector("#searchBtn").addEventListener("click", () => {
  const destination = document.querySelector("#destinationInput").value;
  getWeatherData(destination).then(weatherData => {
    // Display weather data
  });

  getDestinationSuggestions(destination).then(suggestions => {
    // Display suggestions
  });

  getReviews(destination).then(reviews => {
    // Display reviews
  });
});


// Toggle menu visibility for mobile
function toggleMenu() {
  const menu = document.getElementById('menu').querySelector('ul');
  menu.classList.toggle('active');
}


