const axios = require('axios');
const API_KEY = require('./API_KEY.js');
const getDistance = (origin, destination, time) => {
  const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix';
  const outputFormat = 'json?';
  const unitsURL = 'units=imperial&';

  const originURL = `origins=${origin.split(' ').join('+')}&`;
  const destinationURL = `destinations=${destination.split(' ').join('+')}&`;

  // assume that 'standard date or time object' described in the assignment is a local time, created with new Date(year, month, date, hour, minute, second).
  // since Google API takes departure_time parameter in UTC time in seconds, the local time needs to be converted into UTC format and from milliseconds to seconds.
  // simply calling a prototype method getTime(), dividing it by 1000, and rounding down the result will convert the Date object into UTC in seconds, taking time-zone offset value into account.
  // if 'standard date or time object' is already UTC time, just simply put ${time} into departureTimeURL instead of ${timeUTC}.
  const timeUTC = Math.floor(time.getTime() / 1000);
  const departureTimeURL = `departure_time=${timeUTC}&`;

  const query = `${BASE_URL}/${outputFormat}${unitsURL}${originURL}${destinationURL}${departureTimeURL}key=${API_KEY}`;

  return axios
    .get(query)
    .then(response => {
      // refer to https://developers.google.com/maps/documentation/distance-matrix/start for the payload structure of the response
      let result = response.data.rows[0].elements[0].distance.text;
      return result;
    })
    .catch(error => {
      console.log(error);
    });
};

const nearbyAgent = '2114 6th avenue los angeles, ca 90018';
const houseProperty = '148 S Gramercy Pl Los Angeles, CA 90004';
const appointment = new Date()

getDistance(nearbyAgent, houseProperty, appointment)
  .then((response) => {
    // response is the distance in miles retrieved from the API call to google.
    // since axios uses promise, it will return promise with data attached to it.
    // do something here with the response, in this case, number of miles.
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  })


// Google Distance Matrix API takes many optional parameters.
// when departure_time or arrival_time is provided, it responds back with duration_in_traffic,
// which should be the most important information in order to manage travel time successfully.
// it would be a lot more useful if the wrapper could give the travel time with traffic into account.
// also one of most useful option that could be implemented would be arrival_time.
// I assume that many appointments are made at specific times.  In order to arrive by the appointment time,
// knowing ahead when is the safe time to leave and start heading from a current location is crucial.
