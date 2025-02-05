//Reviews and ratings module


const getReviews = async (destinationId) => {
    const apiKey = 'YOUR_API_KEY';  // Replace with your Reviews API key
    const url = `https://api.tripadvisor.com/api/v1/reviews/${destinationId}?apikey=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    return data.reviews;  // Display user reviews
  };
  