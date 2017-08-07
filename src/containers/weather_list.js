import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import moment from 'moment';

function day_weather_mapper(array,timezone){
  var result = [];
  for ( var i=1; i<array.length; i++){
    result.push([moment.unix(array[i].apparentTemperatureMinTime).format("MM/DD"), "wi wi-forecast-io-"+array[i].icon])
  }
  return result;
};

function day_weather_mapper2(array,timezone){
  var result = [];
  for ( var i=0; i<array.length; i++){
    result.push([moment.unix(array[i].time).format("MM/DD"), "wi wi-forecast-io-"+array[i].icon])
  }
  return result;
};

class WeatherList extends Component{
  renderWeather(cityData){
    const city_name = cityData.city ;
    const time_zone = cityData.weather_info.timezone
    const session = city_name + Date.now()
    const daily = cityData.weather_info.daily.data.map( weather => weather.apparentTemperatureMax );
    const hourly = cityData.weather_info.hourly.data.map( weather => weather.apparentTemperature );
    const current = cityData.weather_info.currently.apparentTemperature;
    const weather_des = cityData.weather_info.currently.icon;
    const icon = "wi wi-forecast-io-" + weather_des;
    const forecast_unix = cityData.weather_info.daily.data;
    const forecast = day_weather_mapper(forecast_unix, time_zone).map((weather,index) => <div key={weather[0]+'key0'+index}>
      {weather[0]}: <p className={weather[1]}></p>
    </div>)
    const history = cityData.history.map(weather => weather.apparentTemperature);
    const history_weather = day_weather_mapper2(cityData.history,time_zone).map((weather,index) => <div key={weather[0]+'key1'+index}>
      {weather[0]}: <p className={weather[1]}></p>
    </div>)

    return(
      <tr key={session}>
        <td>
          <h3>{city_name}</h3>
          <h3>{current}°F</h3>
        </td>
        <td>
          <h1 className={icon}></h1>
          <p>{weather_des}</p>
        </td>
        <td>
          <Chart data={hourly} color="blue" />
        </td>
        <td>
          <Chart data={daily} color="orange" />
        </td>
        <td>
          {forecast}
        </td>
        <td>
          <Chart data={history} color="blue" />
        </td>
        <td>
          {history_weather}
        </td>
      </tr>
    )
  }

  render(){
    return(
      <table className="table table-hover" key={Date.now()}>
        <thead>
          <tr>
            <th>City</th>
            <th>Weather</th>
            <th>Next 48 Hours</th>
            <th>Next 7 Days</th>
            <th>Forecast(nex 7 days)</th>
            <th>Last 7 Days</th>
            <th>History(last 7 days)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }){
  return { weather } // { weather } === { waether: weather}
}

export default connect(mapStateToProps)(WeatherList);
