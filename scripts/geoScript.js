const weatherApiKey = "a78ec261e24b796f729e2597d514690b"; // My OpenWeather API key
        
// OpenCage API Key
const OPENCAGE_API_KEY = 'e3e7c27e7b074e95a4dd6a2ae642dfe9';

// DOM Elements
const locationElement = document.querySelector('.locationName');

const map = L.map('map').setView([51.505, -0.09], 2); // Default map view (London)

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Declare map marker
let currentMarker;

// Define coordinates variables
let currentLat = 0;
let currentLon = 0;


// Get the user's current location and update the map and weather
function getCurrentLocation() {
                
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 10);
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([latitude, longitude]).addTo(map);

            // Update coordinates variables
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;

            // Show coordinates on console
            console.log('This is lat', currentLat);
            console.log('This is Lon', currentLon);
            
            // Show location name
            fetchLocationName(currentLat, currentLon);

            // Show location weather
            getWeatherByLatLon(currentLat, currentLon);

        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch the city name using OpenCage (reverse geocoding)
function fetchLocationName(lat, lon) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_API_KEY}`)
        .then(response => response.json())
        .then(data => {
        const city = data.results[0].components.city || data.results[0].components.county || data.results[0].components.state || "Unknown Location";
        city_split = city.split(" ")[0];

        // Show city name on console
        console.log('this is', city_split);
        
        // Show data on console
        console.log(data);

        //Update the <h1> element that shows the location name
        locationElement.innerText = city;

        })
        .catch(error => console.error('Error fetching location:', error));

}

// Fetch weather data by coordinates
function getWeatherByLatLon(lat, lon) {
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${weatherApiKey}&units=metric`;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
    //const weatherUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${weatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("This weather info fetched by lat & lon", data);
            //display weather information
            displayUserWeather(data);
        })
        .catch(error => {
            alert('Error fetching weather data.');
        });
}

// Fetch weather data by city name
function getWeatherByCityName(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${weatherApiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            // Display weather by cityName
            console.log("Weather by cityName: ", data);
            displaySearchedWeather(data);
        })
        .catch(error => {
            alert('Error fetching weather data.');
        });
}

// Display the user's weather data
function displayUserWeather(data) {
    console.log("Display weather2: ", data);
    userWeatherElem = document.getElementById("userWeatherInfo");
    locationName = document.createElement("h1");
    locationName.classList.add("userLocation");
    locationName.innerHTML = `
            <h3>Today</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
    `;

    //document.getElementById("userWeatherInfo"). innerHTML = data.main.temp;
    userWeatherElem.appendChild(locationName);
}


// Display weather data
function displaySearchedWeather(data) {
    const weatherInfo = document.getElementById("weatherForecast");
    document.getElementById("userWeatherInfo").style.display = "none";
    weatherInfo.innerHTML = '';

    data.list.forEach(day => {
        const date = new Date(day.dt * 1000);
        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weather-day');
        weatherDiv.innerHTML = `
            <h3>${date.toDateString()}</h3>
            <p>Temperature: ${day.main.temp}°C</p>
            <p>Weather: ${day.weather[0].description}</p>
        `;
        weatherInfo.appendChild(weatherDiv);
    });
}

// Search for a new location and update the map and weather
function searchLocation() {
    const location = document.getElementById('location').value;
    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${location}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                
                // Show data on console
                console.log(data);

                // Stores the city name
                const cityName = data[0].name;

                // Stores the full location name
                const fullLocationName = data[0].display_name; 
                
                // Update map view
                map.setView([lat, lon], 10);
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }
                currentMarker = L.marker([lat, lon]).addTo(map);
                
                // Fetch weather using city name
                getWeatherByCityName(cityName);
                
                // Update the search input with the found city/state name
                document.getElementById('location').value = fullLocationName;

                // the city name inside the <h1> tag
                document.querySelector('.locationName').innerHTML = cityName;

            } else {
                alert('Location not found.');
            }
        })
        .catch(error => {
            alert('Error fetching location data.');
        });
}

// Initialize with the user's current location
getCurrentLocation();