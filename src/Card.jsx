import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import { cardStyles } from './styles';
import cloudy from './weatherIcons/cloudy.svg';
import cloudyDay from './weatherIcons/cloudy-day-1.svg';
import cloudyNight from './weatherIcons/cloudy-night-1.svg';
import day from './weatherIcons/day.svg';
import fog from './weatherIcons/fog.svg';
import night from './weatherIcons/night.svg';
import rainy from './weatherIcons/rainy-5.svg';
import sleet from './weatherIcons/rainy-7.svg';
import snowy from './weatherIcons/snowy-5.svg';
import wind from './weatherIcons/wind.svg';

class WeatherCard extends React.Component {
  getIcon = (iconData) => {
    let weatherIcon = null;
    switch (iconData) {
    case 'clear-day':
      weatherIcon = day;
      break;

    case 'clear-night':
      weatherIcon = night;
      break;

    case 'rain':
      weatherIcon = rainy;
      break;

    case 'snow':
      weatherIcon = snowy;
      break;

    case 'sleet':
      weatherIcon = sleet;
      break;

    case 'wind':
      weatherIcon = wind;
      break;

    case 'fog':
      weatherIcon = fog;
      break;

    case 'cloudy':
      weatherIcon = cloudy;
      break;

    case 'partly-cloudy-day':
      weatherIcon = cloudyDay;
      break;

    case 'partly-cloudy-night':
      weatherIcon = cloudyNight;
      break;
    default:
      return weatherIcon;
    }
    return weatherIcon;
  }

  toCelcius = f => Math.round(((f - 32) * 5 / 9))

  renderToday = weatherData => (
    <div style={cardStyles.container}>
      <div>
        <Card style={cardStyles.card}>
          <CardActionArea>
            <h2 style={cardStyles.dateTime}>{moment.unix(weatherData.currently.time).format('dddd, MMM Do, h:mm a')}</h2>
            <h1 style={cardStyles.currentlyFont}>
              {`${this.toCelcius(weatherData.currently.temperature)}ºC`}
            </h1>
            <img
              style={cardStyles.currentlyIcon}
              alt={weatherData.currently.icon}
              src={this.getIcon(weatherData.currently.icon)}
            />
            <CardContent>
              <h2>
                {weatherData.currently.summary}
              </h2>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  )

  renderWeek = weatherData => weatherData.daily.data.map(
    day => (
      <div key={day.sunsetTime} style={cardStyles.weekContainer}>
        <Card style={cardStyles.weekCard}>
          <CardActionArea>
            <h3>{moment.unix(day.time).format('dddd')}</h3>
            <h2>{moment.unix(day.time).format('MMM Do')}</h2>
            <img
              style={cardStyles.icon}
              alt={weatherData.currently.icon}
              src={this.getIcon(day.icon)}
            />
            <div style={cardStyles.temps}>
              <h2 style={cardStyles.highTemp}>
                {`${this.toCelcius(day.temperatureHigh)}º`}
              </h2>
              <h2 style={cardStyles.lowTemp}>
                {`${this.toCelcius(day.temperatureLow)}º`}
              </h2>
            </div>
            <div style={cardStyles.summary}>
              <h4 style={cardStyles.summaryh4}>
                {day.summary}
              </h4>
            </div>
          </CardActionArea>
        </Card>
      </div>
    ),
  )

  render() {
    const { weatherData } = this.props;
    return (
      <div>
        {weatherData.currently
          && this.renderToday(weatherData)
        }
        {weatherData.daily
          && this.renderWeek(weatherData)
        }
      </div>
    );
  }
}

export default WeatherCard;
