import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';
import Search from './components/Search.jsx'
import WeatherDetailsList from './components/WeatherDetailsList.jsx'
import ReactTable from "react-table";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // could "items" be an object with poperties temp, maxTemp, minTemp, humidity, and state (sunny, cloudy etc)
      searchString: '',
      searchResults: [],
      weatherData: {
        consolidated_weather: []
      },
    }
    this.search = this.search.bind(this)
    this.searchWeatherByWoeid = this.searchWeatherByWoeid.bind(this)
  }

  searchWeatherByWoeid(woeid) {
    console.log('woeid test', woeid);
    axios.get(`/forecast/${woeid}`)
      .then(({ data }) => {
        console.log(data, 'is this the returned data woeid?')
        this.setState({
          weatherData: data
        });
      })
      .catch(function (error) {
        // if error is thrown console log the error
        console.log(error, 'did this error come to the client?');
      });
  }

  search(searchString) {
    axios.get(`/search?searchString=${searchString}`)
      .then(({ data }) => {
        console.log(data, 'is this the returned data?')
        this.setState({
          searchResults: data
        });
      })
      .catch(function (error) {
        // if error is thrown console log the error
        console.log(error, 'did this error come to the client?');
      });
  }

  render() {
    return (
      <div>
        <h1>Weather || Not</h1>
        <Search handleSearch={this.search} />
        <List items={this.state.searchResults} handleItemClick={this.searchWeatherByWoeid} />
        <WeatherDetailsList items={this.state.weatherData.consolidated_weather} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));