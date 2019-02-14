import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card'
import SearchBar from './SearchBar'
import { 
  AppContainer, 
  renderCloudy,
  renderPartlyCloudy,
  renderRainy,
  renderSnowy,
  renderSunny
} from './styles'
import './app.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: null,
      weatherData: [],
    };
  }

  componentDidUpdate() {
    // if (this.state.currentWeather === 'clear-night') {
    //   return document.body.style.background = 'black';
    // }
    if (this.state.currentWeather === 'cloudy') {
      return document.body.style.background = 'linear-gradient(to bottom, #1ad1ff 0%, #e6faff 100%) fixed';
    }
    if (this.state.currentWeather === 'rainy' || this.state.currentWeather === 'snowy') {
      return document.body.style.background = 'linear-gradient(to bottom, #808080 0%, #f2f2f2 100%) fixed';
    }
    return document.body.style.background = 'linear-gradient(to bottom, #1b62dd 0%, #fff 100%) fixed'
  }

  getCurrentPosition = (options = { timeout: 10000, maximumAge: 3600000 }) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition();
      this.getWeatherData({ lat: position.coords.latitude, lng: position.coords.longitude })
    } catch (err) {
      // if user does not allow location tracking, default to vancouver
      if (err.code === 1 || err.code === 3) {
        return this.getWeatherData({ lat: 49.2827, lng: -123.1207 })
      }
      console.log('failed to get position.', err);
    }
  }

  getWeatherData = async (coords) => {
    try {
      const data = await axios.post('/api/weather', { 
        lat: coords.lat, 
        lng: coords.lng 
      })
      this.setState({ currentWeather: data.data.currently.icon, weatherData: data.data });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <AppContainer>
        <SearchBar
        getWeatherData={this.getWeatherData}
        loadPosition={this.loadPosition}
        />
        {this.state.currentWeather === 'clear-day' && renderSunny()}
        {this.state.currentWeather === 'partly-cloudy-day' && renderPartlyCloudy()}
        {this.state.currentWeather === 'cloudy' && renderCloudy()}
        {this.state.currentWeather === 'snowy' && renderSnowy()}
        {this.state.currentWeather === 'rainy' && renderRainy()}
        <Card weatherData={this.state.weatherData}/>
      </AppContainer>
    );
  }
}

export default App;
