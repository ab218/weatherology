import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from './Card'
import SearchBar from './SearchBar'
import { 
  AppContainer, 
  LocationName,
  renderCloudy,
  renderPartlyCloudy,
  renderRainy,
  renderSnowy,
  renderSunny,
  Title
} from './styles'
import './app.css'

// TODO: sleet, wind, fog

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: null,
      weatherData: [],
      loading: false,
    };
  }

  componentDidUpdate() {
    switch (this.state.currentWeather) {
      case 'clear-night':
      case 'partly-cloudy-night':
        return document.body.style.background = 'linear-gradient(to bottom, #191970 0%, #383838 100%) fixed';
      case 'cloudy':
        return document.body.style.background = 'linear-gradient(to bottom, #1ad1ff 0%, #e6faff 100%) fixed';
      case 'rain':
      case 'snow':
        return document.body.style.background = 'linear-gradient(to bottom, #808080 0%, #f2f2f2 100%) fixed';
      default:
        return document.body.style.background = 'linear-gradient(to bottom, #1b62dd 0%, #fff 100%) fixed'
    }
  }

  getCurrentPosition = (options = { timeout: 10000, maximumAge: 3600000 }) => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  loadPosition = async () => {
    try {
      await this.setState({loading: true})
      const position = await this.getCurrentPosition();
      this.getWeatherData({ lat: position.coords.latitude, lng: position.coords.longitude })
      this.getLocationName({ lat: position.coords.latitude, lng: position.coords.longitude })
      await this.setState({loading: false})
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

  getLocationName = async (coords) => {
    try {
      const data = await axios.post('/api/google/location', {
        lat: coords.lat,
        lng: coords.lng
      })
      this.setState({ location: data.data })
    } catch (e) {
      console.log(e);
    }
  }

  getPlace = async (input) => {
    try {
        const place = await axios.post('api/google/info', { input })
        const coords = await axios.post('api/google/coords', { placeid: place.data })
        this.getWeatherData({
            lat: coords.data.result.geometry.location.lat, 
            lng: coords.data.result.geometry.location.lng
        })
        this.getLocationName({
          lat: coords.data.result.geometry.location.lat, 
          lng: coords.data.result.geometry.location.lng
         })
    } catch (e) {
        console.log(e);
    }
}

  render() {
    return (
      <AppContainer>
        {!this.state.currentWeather 
        ? <div>
          {renderPartlyCloudy()}
          <Title>Weatherology</Title>
        </div> 
        : null}
        {this.state.currentWeather === 'clear-day' && renderSunny()}
        {this.state.currentWeather === 'partly-cloudy-day' && renderPartlyCloudy()}
        {this.state.currentWeather === 'partly-cloudy-night' && renderPartlyCloudy()}
        {this.state.currentWeather === 'cloudy' && renderCloudy()}
        {this.state.currentWeather === 'snow' && renderSnowy()}
        {this.state.currentWeather === 'rain' && renderRainy()}
        <SearchBar
        getPlace={this.getPlace}
        loadPosition={this.loadPosition}
        />
        {this.state.location && 
        <LocationName
        icon={this.state.currentWeather}
        >
        {this.state.location}</LocationName>
        }
        {this.state.loading && <CircularProgress/>}
        <Card weatherData={this.state.weatherData}/>
      </AppContainer>
    );
  }
}

export default App;
