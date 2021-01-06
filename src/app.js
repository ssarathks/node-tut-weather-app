const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const staticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(staticDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title : 'Index page',
    name : 'Sarath'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title : 'About page',
    name : 'Sarath'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title : 'Help page',
    name : 'Sarath',
    message : 'help message'
  })
})

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error : 'You must provide an adress'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        response,
        location,
        address : req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title : 'Help 404 page',
    name : 'Sarath',
    errorMessage : 'Help articles not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title : '404 page',
    name : 'Sarath',
    errorMessage : '404 Not Found'
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})