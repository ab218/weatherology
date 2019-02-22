import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchBar from './SearchBar';
import nightImg from './stars.jpg';
import partlyCloudyNightImg from './partlycloudynight.jpg';
import cloudsImg from './clouds.jpg';
import darkCloudsImg from './darkClouds.jpg';
import fogImg from './fog.jpg';
import rainyImg from './rainyDay.jpeg';
import snowyImg from './snowman.jpg';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: null,
      weatherData: [],
    };
  }

  componentDidUpdate() {
    const { currentWeather } = this.state;
    switch (currentWeather) {
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
    default:
      document.body.style.background = 'linear-gradient(to bottom, #1b62dd 0%, #fff 100%) fixed';
    }
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
  }

  getCurrentPosition = (options =
  { timeout: 10000, maximumAge: 3600000 }) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      this.getWeatherData({ lat: position.coords.latitude, lng: position.coords.longitude });
      this.getLocationName({ lat: position.coords.latitude, lng: position.coords.longitude });
    } catch (err) {
      // if user does not allow location tracking, default to vancouver
      if (err.code === 1 || err.code === 3) {
        this.getWeatherData({ lat: 49.2827, lng: -123.1207 });
        this.getLocationName({ lat: 49.2827, lng: -123.1207 });
      }
      console.log('failed to get position.', err);
    }
  }

  getWeatherData = async (coords) => {
    try {
      const data = await axios.post('/api/weather', {
        lat: coords.lat,
        lng: coords.lng,
      });
      this.setState({ currentWeather: data.data.currently.icon, weatherData: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  getLocationName = async (coords) => {
    try {
      const data = await axios.post('/api/google/location', {
        lat: coords.lat,
        lng: coords.lng,
      });
      this.setState({ location: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  getPlace = async (input) => {
    try {
      const place = await axios.post('api/google/info', { input });
      const coords = await axios.post('api/google/coords', { placeid: place.data });
      this.getWeatherData({
        lat: coords.data.result.geometry.location.lat,
        lng: coords.data.result.geometry.location.lng,
      });
      this.getLocationName({
        lat: coords.data.result.geometry.location.lat,
        lng: coords.data.result.geometry.location.lng,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { currentWeather, location, weatherData } = this.state;
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
          getPlace={this.getPlace}
          loadPosition={this.loadPosition}
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
}

export default App;
