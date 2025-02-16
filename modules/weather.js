//Weather API integration


const getWeatherData = async (lat, lon) => {
    const weatherApiKey = 'a78ec261e24b796f729e2597d514690b';  // My OpenWeatherMap API key
    //const url = `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&units=metric&appid=${weatherApiKey}`;
    const openUrl = `https://api.openweathermap.org/data/2.5/forecast?q=lat=${lat}&lon=${lon}&cnt=3&appid=${weatherApiKey}&units=metric`;

  
    const response = await fetch(openUrl);
    const data = await response.json();
  
    return data;  // Handle this data to display temperature, rainfall, etc.
  };
  