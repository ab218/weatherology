import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment';
import { cardStyles } from './styles';

class WeatherCard extends React.Component {
  getIcon = (iconData) => {
    let weatherIcon = null;
    switch (iconData) {
    case 'clear-day':
      weatherIcon = 'fas fa-sun';
      break;

    case 'clear-night':
      weatherIcon = 'far fa-moon';
      break;

    case 'rain':
      weatherIcon = 'fas fa-umbrella';
      break;

    case 'snow':
      weatherIcon = 'fas fa-snowflake';
      break;

    case 'sleet':
      weatherIcon = 'fab fa-empire';
      break;

    case 'wind':
      weatherIcon = 'fab fa-pagelines';
      break;

    case 'fog':
      weatherIcon = 'fas fa-blind';
      break;

    case 'cloudy':
      weatherIcon = 'fas fa-cloud';
      break;

    case 'partly-cloudy-day':
      weatherIcon = 'fab fa-skyatlas';
      break;

    case 'partly-cloudy-night':
      weatherIcon = 'fab fa-soundcloud';
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
            <h1 style={cardStyles.icon}>
              {`${this.toCelcius(weatherData.currently.temperature)}ºC`}
            </h1>
            <h1 style={cardStyles.icon}>
              <i className={this.getIcon(weatherData.currently.icon)} />
            </h1>
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
            <h1 style={cardStyles.icon}>
              <i className={this.getIcon(day.icon)} />
            </h1>
            <h2 style={cardStyles.highTemp}>
              {`${this.toCelcius(day.temperatureHigh)}ºC`}
            </h2>
            <h2 style={cardStyles.lowTemp}>
              {`${this.toCelcius(day.temperatureLow)}ºC`}
            </h2>
            <CardContent>
              <h4>
                {day.summary}
              </h4>
            </CardContent>
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
