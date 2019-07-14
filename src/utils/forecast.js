const request = require('request')


const forecast = (latitude,longtude, callback) =>{

    const url = 'https://api.darksky.net/forecast/9d8fc4a8f9521b647943907c8c4f8bc7/'+latitude+','+longtude+''
    console.log('url',url)
    request({url, json : true}, (error, response) => {   

        //var myObject = JSON.parse(body);
        //console.log('myObj',myObject)
        
        //console.log('body',body)

        if(error)
        {
            callback('Unable to connect Geo location service',undefined)
        }else if(response.body.error)
        {
           callback('unable to find location....!', undefined);
        }
        else
        {
               console.log('data',response.body.daily.data[0])
                callback(undefined, response.body.daily.data[0].summary+' it is currently '+response.body.currently.temperature+' degree out . The high today is '+ response.body.daily.data[0].temperatureHigh  + ' with a low of '+response.body.daily.data[0].temperatureLow +' these is '
                +response.body.currently.precipProbability+' % of chance of rain')
        }

    })
}


module.exports = forecast