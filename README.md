# City Weather Forecast Application

A single-page application developed with React and TypeScript that displays a 7-day weather forecast for major cities in China. The application fetches real-time weather data through the QWeather API and presents it in an aesthetically pleasing card format.



## Features

- Displays a 7-day weather forecast
- Supports searching and selecting major Chinese cities
- Automatically switches between day/night weather icons based on current time
- Shows daily temperature range, weather conditions, humidity, wind direction, and wind force
- Uses QWeather icons to visually represent weather conditions
- Responsive design that adapts to different screen sizes
- Complete accessibility support
- Beautiful UI design with card hover effects and smooth transition animations

## Tech Stack

- React 18
- TypeScript
- styled-components (CSS-in-JS solution)
- react-select (searchable dropdown selector)
- Axios (HTTP request library)
- QWeather API and icon library

## Installation and Setup

1. Clone the repository

```bash
git clone https://github.com/yoluxi/weather-app.git
cd weather
```

2. Install dependencies

```bash
npm install
```


3. Configure API Key

Create a `.env` file in the root directory of the project and add your QWeather API key:

```
REACT_APP_API_KEY=your-qweather-api-key
```

4. Start the development server

```bash
npm start
```

The application will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/public
  - index.html (includes QWeather icon library reference)
  - favicon.ico
  - manifest.json
/src
  /components
    - WeatherCard.tsx (Weather card component)
    - CitySelector.tsx (City selection component)
    - SkeletonCard.tsx (Loading skeleton component)
    - ErrorBoundary.tsx (Error boundary component)
  - App.tsx (Main application component)
  - api.ts (API service)
  - types.ts (TypeScript type definitions)
  - index.tsx (Application entry)
  - index.css (Global styles)
```

## Usage Guide

1. When you open the application, Shanghai's weather forecast is displayed by default
2. Use the city selector at the top to search for and select other cities
3. The application will automatically fetch and display the weather forecast for the selected city
4. Each weather card shows one day's weather information, including date, weather icon, temperature range, weather conditions, humidity, wind direction, and wind force
5. Weather icons automatically switch between day and night versions based on the current time

## Building for Production

```bash
npm run build
```


## Notes

- The free version of QWeather API has daily call limits, please use it reasonably
- This application uses the QWeather icon library, which requires an internet connection to load correctly


## License

MIT
