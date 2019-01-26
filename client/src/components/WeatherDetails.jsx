import React from "react";
import WeatherListItem from "./WeatherListItem.jsx";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { celsiusToFahrenheit } from "../utils/tempConversion.js";

var columns = [
  {
    Header: "Date",
    accessor: "applicable_date"
  },
  {
    Header: "Condition",
    accessor: "weather_state_name"
  },
  {
    id: "icon",
    Header: "Icon",
    accessor: function (d) {
      var picUrl = `https://www.metaweather.com/static/img/weather/png/64/${
        d.weather_state_abbr
        }.png`;
      return <img src={picUrl} width={64} height={64} />;
    }
  },
  {
    id: "currentTemp",
    Header: "Current Temp",
    accessor: function (d) {
      return (celsiusToFahrenheit(d.the_temp) + `°F`);
    }
  },
  {
    id: "highTemp",
    Header: "Daily High",
    accessor: function (d) {
      return (celsiusToFahrenheit(d.max_temp) + `°F`);
    }
  },
  {
    id: "lowTemp",
    Header: "Daily Low",
    accessor: function (d) {
      return (celsiusToFahrenheit(d.min_temp) + `°F`);
    }
  },
  {
    id: "humidPercent",
    Header: "Humidity Percentage",
    accessor: function (d) {
      return `${d.humidity}%`;
    }
  },
  {
    id: "chanceOfWeather",
    Header: "Predictability",
    accessor: function (d) {
      return `${d.predictability}%`;
    }
  }
];

const WeatherDetailsList = props => {
  if (!props.items.length) return null;

  return (
    <div>
      <h4> Weather Forecast Details</h4>
      <ReactTable data={props.items} columns={columns} />
    </div>
  );
};

export default WeatherDetailsList;