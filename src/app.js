const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))



//define path for express configure
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location 
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req,res) => {
  res.render('index',{
      title:'Weather app',
      name: 'Venkat P'
  })
})

app.get('/about',(req,res) =>{
  res.render('about',{
    title:'About Me ',
    name:'Venkat p'

  })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'THis is some helpfull Text',
        title:'Help',
        name: 'Venkat p'

    })
})



app.get('/weather', (req,res) => {

if(!req.query.address) {
  
  return res.send({
    error:'you must provide an error'
  })
  
  }
geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
 if(error){
   return res.send({error})
 }

forecast(latitude,longitude,(error,forecstData) => {

  if(error){
    return res.send({error})
  }

res.send({
forecast: forecstData,
location


})


})

})


 /* res.send({
    forecast: 'it is snowing',
    location: 'philadelphia',
    address:req.query.address

  })*/


})


app.get('/products',(req,res) => {

  if(!req.query.search)
  {
    return res.send({
      error: 'you must provide search term'
    })  
  }


  console.log(req.query.search)
  res.send({
    products : []
  })
})


app.get('/address',(req,res) => {
 if(!req.query.address)
 {
  return  res.send({
    error: 'you must provide search term' 

   })
  
 }

 res.send({
   address:[]
 })


})


app.get('/help/*',(req,res) =>{
  res.render('404',{
    title:'404',
    name:'Venkat',
    errorMessage:'Help artical not found'
    
    })
})

app.get('*',(req,res) =>{
res.render('404',{
title:'404',
name:'Venkat',
errorMessage:'page not found'

})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})