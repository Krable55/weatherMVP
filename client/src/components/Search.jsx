import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: '',
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.dropDownHandler = this.dropDownHandler.bind(this);
  }

  onInputChange(event) {
    // event is the client typing the city name
    this.setState({
      userInput: event.target.value,
    })
    console.log(event.target.value, 'this is the input!')
    // set userInput to whats being typed
  };

  onSubmitHandler(event) {
    this.props.handleSearch(this.state.userInput);
    // console.log(event.target.value, 'whats the val?')
    console.log(this.state.userInput, 'whats this')
    // console.log(userInput, 'parent userInput?')
    var city = this.state.userInput;
    axios.get('/url', `https://www.metaweather.com/api/location/search/?query=${city}`)
      .then(res => {
        console.log(res, 'are we getting this?')
      })
      .catch((error) => {
        console.log(error, 'Error CLIENT SIDE!!')
      })
  };

  dropDownHandler(e) {
    alert(`We're Sorry but this button is undergoing routine maintenance and should be back up and running in 2037! :)`)
  };

  render() {
    return (
      <div>
        <div>
          <input type='text' onChange={this.onInputChange}></input>
          <button onClick={this.onSubmitHandler}>Submit</button>
        </div>

        <div className="dropdown">
          <button onClick={this.dropDownHandler} className="dropbtn">Most Popular Cities</button>
          <div id="myDropdown" className="dropdown-content">

          </div>
        </div>
      </div>
    );
  }


}


export default Search;