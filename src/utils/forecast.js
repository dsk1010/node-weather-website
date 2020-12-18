const request = require('request');

// const forecast = (lattitude, longtitude, callback) => {
const forecast = (latitude, longitude, callback) => {

    // this code runs for open weather map api
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=9cce04d9010a2d1dc431517b7391b784&units=metric';

    request({ url , json:true }, (error, {body}) => {
        if(error){
            // console.log(error);
            callback('Unable to connect to weather services@!!!!!!', undefined);
        } else if (body.message) {
            console.log(body.message, 'data:',undefined);
            // callback('Unable to Find Desired Locaion', undefined);
            // callback is not working here.
            // console.log('Unable to Find Desired Locaion', '= data:',undefined);
        } else {
            callback(undefined, body.current.weather[0].description + ' outside. It is currently ' + body.current.temp + ' degree out. There is a ' + body.current.clouds + '% chance of Winter Clouds' );
        }
    });
}

// to run this code as a separate file, un-comment below code ----------------------------
// forecast(42.36, 71.05, (error, data) => {
//     console.log('error :>> ', error);
//     console.log('data :>> ', data);
// });

module.exports = forecast;

// https://api.openweathermap.org/data/2.5/onecall?lat=20.75&lon=72.95&appid=9cce04d9010a2d1dc431517b7391b784

// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=9cce04d9010a2d1dc431517b7391b784

// https://api.openweathermap.org/data/2.5/onecall?lat=20.75&lon=72.95&exclude=hourly,daily&appid=9cce04d9010a2d1dc431517b7391b784

// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=9cce04d9010a2d1dc431517b7391b784

// http://pro.openweathermap.org/data/2.5/forecast/hourly?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a1

// https://samples.openweathermap.org/data/2.5/forecast?id=1821632&appid=b1b15e88fa797225412429c1c50c122a1