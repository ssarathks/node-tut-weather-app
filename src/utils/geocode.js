const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZXNrZXllcyIsImEiOiJja2g0eWcwZm8wZGU1MnNvOW45OTNrMTN3In0.cVLvH703us3Dnkfp1QUz2A&limit=1'
  request({ url , json : true}, (error, {body}) => { //{body} = object destructuring
    if (error) {
      callback('Failed access geocode service', undefined)
    }
    else if(body.features.length === 0){
      callback('No location', undefined)
    }
    else{
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      const location = body.features[0].place_name
      const data = {
        latitude : latitude,
        longitude : longitude,
        location : location
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode