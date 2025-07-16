// OpenWeatherMap API service
const API_KEY = 'a36625d8db76f8ee273594c9f45edb44'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API configuration.');
      } else {
        throw new Error(`Weather service error: ${response.statusText}`);
      }
    }
    
    const data = await response.json();
    
    // Transform the API response to a more usable format
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      weatherMain: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      icon: data.weather[0].icon,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      timezone: data.timezone
    };
  } catch (error) {
    // Re-throw the error to be handled by the component
    throw error;
  }
};

export const getForecast = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast service error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform forecast data (5-day forecast with 3-hour intervals)
    return data.list.map(item => ({
      datetime: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      weatherMain: item.weather[0].main,
      weatherDescription: item.weather[0].description,
      icon: item.weather[0].icon
    }));
  } catch (error) {
    throw error;
  }
};

export default {
  getCurrentWeather,
  getForecast
};