import React, { useState } from 'react';
import { getCurrentWeather } from './services/weatherService';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherIcon = (weatherMain, description) => {
    const weatherLower = weatherMain.toLowerCase();
    const descLower = description.toLowerCase();
    
    // Map weather conditions to appropriate emojis
    const iconMap = {
      'clear': '☀️',
      'clouds': getCloudIcon(descLower),
      'rain': getRainIcon(descLower),
      'drizzle': '🌦️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'smoke': '🌫️',
      'haze': '🌫️',
      'dust': '🌫️',
      'fog': '🌫️',
      'sand': '🌫️',
      'ash': '🌫️',
      'squall': '💨',
      'tornado': '🌪️'
    };
    
    return iconMap[weatherLower] || '🌤️';
  };

  const getCloudIcon = (description) => {
    if (description.includes('few')) return '🌤️';
    if (description.includes('scattered')) return '⛅';
    if (description.includes('broken') || description.includes('overcast')) return '☁️';
    return '☁️';
  };

  const getRainIcon = (description) => {
    if (description.includes('light')) return '🌦️';
    if (description.includes('heavy')) return '🌧️';
    if (description.includes('shower')) return '🌦️';
    return '🌧️';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    
    try {
      const data = await getCurrentWeather(city.trim());
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ClearSky</h1>
        <p className="app-subtitle">Your simple weather companion</p>
      </header>
      
      <main className="main-content">
        <div className="search-container">
          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading || !city.trim()}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <div className="loading-text">Getting weather data...</div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="error-container">
            <div className="error-title">
              ⚠️ Oops! Something went wrong
            </div>
            <div className="error-message">
              {error}
            </div>
          </div>
        )}
        
        {/* Weather Data */}
        {weatherData && !isLoading && !error && (
          <div className="weather-card">
            <div className="city-name">
              {weatherData.city}, {weatherData.country}
            </div>
            
            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weatherData.weatherMain, weatherData.weatherDescription)}
              </div>
              <div className="temperature">{weatherData.temperature}°C</div>
            </div>
            
            <div className="weather-condition">
              {weatherData.weatherDescription}
            </div>
            
            <div className="weather-details">
              <div className="weather-detail">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{weatherData.feelsLike}°C</span>
              </div>
              
              <div className="weather-detail">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.humidity}%</span>
              </div>
              
              <div className="weather-detail">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{weatherData.pressure} hPa</span>
              </div>
              
              <div className="weather-detail">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weatherData.windSpeed} m/s</span>
              </div>
              
              {weatherData.visibility && (
                <div className="weather-detail">
                  <span className="detail-label">Visibility</span>
                  <span className="detail-value">{weatherData.visibility} km</span>
                </div>
              )}
              
              <div className="weather-detail">
                <span className="detail-label">Sunrise</span>
                <span className="detail-value">{weatherData.sunrise}</span>
              </div>
              
              <div className="weather-detail">
                <span className="detail-label">Sunset</span>
                <span className="detail-value">{weatherData.sunset}</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Welcome Message */}
        {!weatherData && !isLoading && !error && (
          <div className="welcome-message">
            <p style={{ 
              color: 'white', 
              fontSize: '1.1rem', 
              opacity: 0.8,
              fontWeight: 300 
            }}>
              Enter a city name to get started! 🌤️
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;