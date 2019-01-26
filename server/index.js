var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

// need json(bodyParser(data)) - at some point

var app = express();
app.use(bodyParser.json())
// set te port number to be used localhost for testing
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../react-client/dist'));

// set up a standard pull from the server for the client
// getting pull from index.html which is also known as "/"
app.get('/search', function (req, res) {
  console.log('req test', req.query);
  axios.get(`https://www.metaweather.com/api/location/search?query=${req.query.searchString}`)
    .then(({ data }) => {
      console.log('response', data);
      res.send(data);
    })
    .then((woeid) => {
      console.log(woeid, 'whats woeid')
      return axios.get(`https://www.metaweather.com/api/location/${woeid}`)
    })
    .then(({ data }) => {
      var status = 200;
      var currentTemp = data.consolidated_weather[0].the_temp * (9 / 5)
      console.log(data, 'second round data sooonnnnnnnn!!!!!!!!!!!!')
      console.log(data.consolidated_weather[0].the_temp, 'TEMP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      res.status(status).send(data.consolidated_weather[0].the_temp)
      // console.log(data.the_temp, 'temp in cel')
      // res.send(status, body): Use res.status(status).send(body)
    })
  console.log('we getting this?', req.body.userInput)
})

app.get('/forecast/:woeid', function (req, res) {
  console.log('req test', req.params);
  axios.get(`https://www.metaweather.com/api/location/${req.params.woeid}`)
    .then(({ data }) => {
      console.log('response woeid', data);
      res.send(data);
    })
    .then((woeid) => {
      console.log(woeid, 'whats woeid')
      return axios.get(`https://www.metaweather.com/api/location/${woeid}`)
    })
    .then(({ data }) => {
      var status = 200;
      var currentTemp = data.consolidated_weather[0].the_temp * (9 / 5)
      console.log(data, 'second round data sooonnnnnnnn!!!!!!!!!!!!')
      console.log(data.consolidated_weather[0].the_temp, 'TEMP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      res.status(status).send(data.consolidated_weather[0].the_temp)
      // console.log(data.the_temp, 'temp in cel')
      // res.send(status, body): Use res.status(status).send(body)
    })
  console.log('we getting this?', req.body.userInput)
})




app.get('/', function (req, res) {
  if (err) {
    console.log(err)
  } else {
    res.send('server testing and working!!')
  }
})

// import Search
// set URL - = api www
// app.get(`https://www.metaweather.com/api/location/search/?query=${city}`, function(req, res) {
//   // axios.get('`https://www.metaweather.com/api/location/search/?query=${city}`')
//   if (err) {
//     console.log(err)
//   } else {
//     res.send('yoooooo', )
//     console.log('are we getting this?')
//   }


// })
// .then(res => {
// })

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.send('items page son!');
//       // res.json(data);
//     }
//   });
// });

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});