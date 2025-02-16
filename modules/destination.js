//Destination module logic


const getDestinationSuggestions = async (query) => {
    const apiKey = 'YOUR_API_KEY';  // My Google Places API key
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    return data.results;  // Display destination suggestions
  };
  