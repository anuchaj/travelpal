const requestURL = 'https://anuchaj.github.io/travelpal/data/locations.json';
//const requestURL = "..data/locations.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const cities = jsonObject["locations"];
   
    cities.forEach(displayCard);
  });


function displayCard(city) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let cityName = document.createElement('p');
    let state = document.createElement('p');
    let country = document.createElement('p');
    let link = document.createElement('a');
    let description = document.createElement('p');
    let portrait = document.createElement('img');
    let saveBtn = document.createElement('p');

  
    // Change the textContent property of the h2 element to contain the biz's full name
    cityName.textContent = city.name;
    state.textContent = city.state;
    country.textContent = city.country;
    description.textContent = city.description;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', city.imageurl);
    portrait.setAttribute('alt', 'Logo of ' + city.name);
    portrait.setAttribute('loading', 'lazy');

    // Build the link attributes
    link.setAttribute("href", city.maplink);
    link.setAttribute("target", "_blank")
    link.textContent = "Explore " + city.name;

    // Build the button attributes
    saveBtn.setAttribute("class", "saveLocation");
    saveBtn.textContent = "Save";
  
    // Add/append the section(card) with the cityName element
    card.appendChild(portrait);
    card.appendChild(cityName);
    card.appendChild(state);
    card.appendChild(country);
    card.appendChild(description);
    card.appendChild(link);
    //card.appendChild(saveBtn);
  
    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector('#cards').appendChild(card);
}


function gridView() {
  document.getElementById('grid').classList.add("open");
  document.getElementById('cards').classList.remove("open");
}

function listView() {
  document.getElementById('cards').classList.add("open");
  document.getElementById('grid').classList.remove("open");
}

const lv = document.getElementById('list');
lv.onclick = listView;

const c = document.getElementById('grid');
c.onclick = gridView;