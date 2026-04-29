// Weather icon mapping based on OpenWeatherMap weather conditions
export const getWeatherIcon = (weatherMain, description) => {
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

export default getWeatherIcon;