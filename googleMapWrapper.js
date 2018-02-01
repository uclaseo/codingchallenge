const axios = require('axios');
const API_KEY = require('./API_KEY');
const getDistance = (origin, destination, time) => {
  const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix';
  const outputFormat = 'json?';
  const unitsURL = 'units=imperial&';

  const originURL = `origins=${origin.split(' ').join('+')}&`;
  const destinationURL = `destinations=${destination.split(' ').join('+')}&`;

  // Assume that 'standard date or time object' described in the assignment is a local time, created with new Date(year, month, date, hour, minute, second).
  // Since Google API takes departure_time parameter in UTC time, the local time needs to be converted into UTC format.
  // Simply calling a prototype method, getTime() will automatially convert the Date object into UTC, taking time-zone offset value into account.
  const timeUTC = time.getTime();
  const departureTimeURL = `departure_time=${timeUTC}&`;

  const query = `${BASE_URL}/${outputFormat}${unitsURL}${originURL}${destinationURL}${departureTimeURL}key=${API_KEY}`;
  axios
    .get(query)
    .then(response => {
      let result = response.data.rows[0].elements[0].distance.text;
      return result;
    })
    .catch(error => {
      console.log(error);
    });
};

const nearbyAgent = '178 S Oxford Ave Los Angeles, CA 90004';
const houseProperty = '148 S Gramercy Pl Los Angeles, CA 90004';
// 2018 Feb 04 10:30
const appointment = new Date(2018, 1, 4, 10, 30);

getDistance(nearbyAgent, houseProperty, appointment);
