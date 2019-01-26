var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3004;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function (req, res) {
  axios.get(`https://www.metaweather.com/api/location/search?query=${req.query.searchString}`)
    .then(({ data }) => {
      // console.log('response', data);
      res.send(data);
    })
    .then((woeid) => {
      // console.log(woeid, 'whats woeid')
      return axios.get(`https://www.metaweather.com/api/location/${woeid}`)
    })
    .then(({ data }) => {
      var status = 200;
      var currentTemp = data.consolidated_weather[0].the_temp * (9 / 5)
      // console.log(data.consolidated_weather[0].the_temp, 'TEMP!!')
      res.status(status).send(data.consolidated_weather[0].the_temp)
      // console.log(data.the_temp, 'temp in cel')
      // res.send(status, body): Use res.status(status).send(body)
    })
  // console.log('we getting this?', req.body.userInput)
})

app.get('/forecast/:woeid', function (req, res) {
  // console.log('req test', req.params);
  axios.get(`https://www.metaweather.com/api/location/${req.params.woeid}`)
    .then(({ data }) => {
      // console.log('response woeid', data);
      res.send(data);
    })
    .then((woeid) => {
      // console.log(woeid, 'whats woeid')
      return axios.get(`https://www.metaweather.com/api/location/${woeid}`)
    })
    .then(({ data }) => {
      var status = 200;
      // var currentTemp = data.consolidated_weather[0].the_temp * (9 / 5)
      // console.log(data.consolidated_weather[0].the_temp, 'TEMP!!!')
      res.status(status).send(data.consolidated_weather[0].the_temp)
      // console.log(data.the_temp, 'temp in cel')
      // res.send(status, body): Use res.status(status).send(body)
    })
  // console.log('we getting this?', req.body.userInput)
})

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});