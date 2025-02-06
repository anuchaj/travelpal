//Weather API integration


const getWeatherData = async (destination) => {
    const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&units=metric&appid=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    return data;  // Handle this data to display temperature, rainfall, etc.
  };
  