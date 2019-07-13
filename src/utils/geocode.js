const request = require('request')

const geocode = (address, callback) =>{
    console.log('Hi'); 

      const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic3ViYmFpYWgxMjM0IiwiYSI6ImNqd3Zqc3g3ZTFobGY0NHA1NmgybmVzbXkifQ.wLeJyGv3HoI2ctsFAxswMw'
     // console.log('url',url)
      
      request({url: url,json: true}, (error, response) =>{
        console.log('response',response.body.features.length)

            if(error)
            {
                callback('Unable to connect to the location service!', undefined)
            }else if(response.body.features.length === 0)
            {
                callback('unable to find the location, Try another search.', undefined)
            }else{
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude :  response.body.features[0].center[0],
                    location: response.body.features[0].place_name
                })
            }

      })
}



module.exports = geocode