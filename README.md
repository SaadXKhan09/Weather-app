# Weather-app

# ClearSky Weather App

A clean, modern weather application built with React and Vite that displays current weather information for any city worldwide.

## Features

- **City Search**: Search for weather in any city worldwide
- **Current Weather**: Display temperature, weather condition, humidity, pressure, wind speed, and more
- **Weather Icons**: Dynamic weather icons based on current conditions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Loading States**: Smooth loading animations while fetching data
- **Error Handling**: User-friendly error messages for invalid cities or network issues
- **Clean UI**: Modern glassmorphism design with smooth animations

## Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **OpenWeatherMap API** - Weather data source
- **CSS3** - Styling with modern features (backdrop-filter, gradients, etc.)
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
clearsky-weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Search input component
│   │   ├── WeatherCard.jsx        # Weather display component
│   │   ├── LoadingSpinner.jsx     # Loading animation
│   │   └── ErrorMessage.jsx       # Error display component
│   ├── services/
│   │   └── weatherService.js      # API service functions
│   ├── utils/
│   │   └── weatherIcons.js        # Weather icon mapping
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App-specific styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # App entry point
├── package.json
├── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher
