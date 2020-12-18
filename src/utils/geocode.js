const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHNrMDEiLCJhIjoiY2tndzQ2MGN1MDUyODJ5cGllYnl4MjJoNCJ9.clRf_v3vT9IFuv9SggvpCA&limit=5';

    // encodeURIComponent will convert special characters to string '%3f'
    request({ url , json:true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services@!!!!!!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to Find Desired Locaion', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

// to run this code as a separate file, un-comment below code ----------------------------
// geocode ('florida', (error, data) => {
//     console.log(error);
//     console.log(data);
//     console.log('Latitude :', data.latitude);
//     console.log('longitude :', data.longitude);
// });

module.exports = geocode;