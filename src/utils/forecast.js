const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=17fcd203ba250c4357f5dd5e84e8fe32'
  request({url , json : true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    }
    else if(body.message){
      callback(body.message, undefined)
    }
    else{
      const temp = body.main.temp
      const location = body.name
      callback(undefined, "it is "+ temp + " degrees out there in " + location)
    }
  })
}

module.exports = forecast