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
    let businessName = document.createElement('p');
    let state = document.createElement('p');
    let country = document.createElement('p');
    let link = document.createElement('a');
    let description = document.createElement('p');
    let portrait = document.createElement('img');
  
    // Change the textContent property of the h2 element to contain the biz's full name
    businessName.textContent = city.name;
    state.textContent = city.state;
    country.textContent = city.country;
    link.textContent = city.maplink;
    description.textContent = city.description;

    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', city.imageurl);
    portrait.setAttribute('alt', 'Logo of ' + city.name);
    portrait.setAttribute('loading', 'lazy');
  
    // Add/append the section(card) with the businessName element
    card.appendChild(portrait);
    card.appendChild(businessName);
    card.appendChild(state);
    card.appendChild(country);
    //card.appendChild(link);
    card.appendChild(description);
    
  
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