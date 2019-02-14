import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card'
import SearchBar from './SearchBar'
import styled from 'styled-components';
import './clouds.css'
import './sun.css'
import './snow.css';
import './rain.css';

const AppContainer = styled.div`
min-height: 100%;
text-align: center;
`

const Sun = styled.div`
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin: 15vh auto;  
  width:300px;
  height:300px;
  border-radius:50%;	
  background:rgb(234, 238, 18);
  opacity:0.9;			
  box-shadow: 0px 0px 40px 15px rgb(234, 238, 18);  
  z-index: -1;
`

const RayBox = styled.div`
  position: absolute;
  margin: auto;
  top:0px;
  left:0;
  right:0;
  bottom:0;	
  width:70px;  
  -webkit-animation: rayAnim 45s linear infinite;
  animation: rayAnim 45s linear infinite;
  z-index: -1;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: null,
      weatherData: [],
    };
  }

  componentDidUpdate() {
    if (this.state.currentWeather === 'clear-night') {
      return document.body.style.background = 'black';
    }
    if (this.state.currentWeather === 'cloudy') {
      return document.body.style.background = 'grey';
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

  renderSunny = () => (
  <Sun>
    <RayBox>
      <div className="ray ray1"></div>
      <div className="ray ray2"></div>
      <div className="ray ray3"></div>
      <div className="ray ray4"></div>
      <div className="ray ray5"></div>
      <div className="ray ray6"></div>
      <div className="ray ray7"></div>
      <div className="ray ray8"></div>
    </RayBox>
  </Sun>
  )

  renderPartlyCloudy = () => (
    <div>
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="cloud cloud4"></div>
      <div className="cloud cloud5"></div>
  </div>
  )

  renderCloudy = () => (
  <div>
    <div className="cloud cloud1"></div>
    <div className="cloud cloud2"></div>
    <div className="cloud cloud3"></div>
    <div className="cloud cloud4"></div>
    <div className="cloud cloud5"></div>
    <div className="cloud cloud6"></div>
    <div className="cloud cloud7"></div>
    <div className="cloud cloud8"></div>
    <div className="cloud cloud9"></div>
    <div className="cloud cloud10"></div>
  </div>
  )

  renderSnowy = () => (
    <div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
      <div className="snowflake"></div>
    </div>
    )

    renderRainy = () => (
      <div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
        <div className="raindrop"></div>
      </div>
    )

  render() {
    return (
      <AppContainer>
        <SearchBar
        getWeatherData={this.getWeatherData}
        loadPosition={this.loadPosition}
        />
        {this.state.currentWeather === 'clear-day' && this.renderSunny()}
        {this.state.currentWeather === 'partly-cloudy-day' && this.renderPartlyCloudy()}
        {this.state.currentWeather === 'cloudy' && this.renderCloudy()}
        {this.state.currentWeather === 'snowy' && this.renderSnowy()}
        {this.state.currentWeather === 'rainy' && this.renderRainy()}
        <Card weatherData={this.state.weatherData}/>
      </AppContainer>
    );
  }
}

export default App;
