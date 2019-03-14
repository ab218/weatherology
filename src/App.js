import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Components/Card';
import SearchBar from './Components/SearchBar';
import nightImg from './Assets/backgrounds/stars.jpg';
import partlyCloudyNightImg from './Assets/backgrounds/partlycloudynight.jpg';
import cloudsImg from './Assets/backgrounds/clouds.jpg';
import darkCloudsImg from './Assets/backgrounds/darkClouds.jpg';
import fogImg from './Assets/backgrounds/fog.jpg';
import mtnImg from './Assets/backgrounds/mtnbackground.jpg';
import rainyImg from './Assets/backgrounds/rainyDay.jpeg';
import snowyImg from './Assets/backgrounds/snowman.jpg';
import windyImg from './Assets/backgrounds/wind.jpg';
import {
  AppContainer,
  LocationName,
  renderCloudy,
  renderPartlyCloudy,
  renderRainy,
  renderSleet,
  renderSnowy,
  renderSunny,
  Title,
} from './styles';
import './app.css';

// TODO: sleet, wind, fog

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    switch (currentWeather) {
    case null:
      document.body.style.backgroundImage = `url(${mtnImg})`;
      break;
    case 'clear-night':
      document.body.style.backgroundImage = `url(${nightImg})`;
      break;
    case 'partly-cloudy-night':
      document.body.style.backgroundImage = `url(${partlyCloudyNightImg})`;
      break;
    case 'cloudy':
      document.body.style.backgroundImage = `url(${darkCloudsImg})`;
      break;
    case 'fog':
      document.body.style.backgroundImage = `url(${fogImg})`;
      break;
    case 'partly-cloudy-day':
      document.body.style.backgroundImage = `url(${cloudsImg})`;
      break;
    case 'rain':
    case 'sleet':
      document.body.style.backgroundImage = `url(${rainyImg})`;
      break;
    case 'snow':
      document.body.style.backgroundImage = `url(${snowyImg})`;
      break;
    case 'wind':
      document.body.style.backgroundImage = `url(${windyImg})`;
      break;
    default:
      document.body.style.background = 'linear-gradient(to bottom, #1b62dd 0%, #fff 100%) fixed';
    }
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
  });

  const getCurrentPosition = (options =
  { timeout: 10000, maximumAge: 3600000 }) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  const getWeatherData = async (coords) => {
    try {
      const data = await axios.post('/api/weather', {
        lat: coords.lat,
        lng: coords.lng,
      });
      setCurrentWeather(data.data.currently.icon);
      setWeatherData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationName = async (coords) => {
    try {
      const data = await axios.post('/api/google/location', {
        lat: coords.lat,
        lng: coords.lng,
      });
      setLocation(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPlace = async (input) => {
    try {
      const place = await axios.post('api/google/info', { input });
      const coords = await axios.post('api/google/coords', { placeid: place.data });
      getWeatherData({
        lat: coords.data.result.geometry.location.lat,
        lng: coords.data.result.geometry.location.lng,
      });
      getLocationName({
        lat: coords.data.result.geometry.location.lat,
        lng: coords.data.result.geometry.location.lng,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const loadPosition = async () => {
    try {
      const position = await getCurrentPosition();
      getWeatherData({ lat: position.coords.latitude, lng: position.coords.longitude });
      getLocationName({ lat: position.coords.latitude, lng: position.coords.longitude });
    } catch (err) {
      // if user does not allow location tracking, default to vancouver
      if (err.code === 1 || err.code === 3) {
        getWeatherData({ lat: 49.2827, lng: -123.1207 });
        getLocationName({ lat: 49.2827, lng: -123.1207 });
      }
      console.log('failed to get position.', err);
    }
  };

  return (
    <AppContainer>
      {!currentWeather
        ? (
          <div>
            {renderPartlyCloudy()}
            <Title>Weatherology</Title>
          </div>
        )
        : null}
      {currentWeather === 'sleet' && renderSleet()}
      {currentWeather === 'clear-day' && renderSunny()}
      {currentWeather === 'partly-cloudy-day' && renderPartlyCloudy()}
      {currentWeather === 'partly-cloudy-night' && renderPartlyCloudy()}
      {currentWeather === 'cloudy' && renderCloudy()}
      {currentWeather === 'snow' && renderSnowy()}
      {currentWeather === 'rain' && renderRainy()}
      <SearchBar
        getPlace={getPlace}
        loadPosition={loadPosition}
      />
      {location
        && (
          <LocationName
            icon={currentWeather}
          >
            {location}
          </LocationName>
        )
      }
      <Card weatherData={weatherData} />
    </AppContainer>
  );
}

export default App;
