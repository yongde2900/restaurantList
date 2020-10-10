
// Require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const restaurantList = require('./models/restaurant')
const app = express()
const port = 3000
// Setting database
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',() => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected',))

// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Route setting
app.get('/', (req,res) => {
    restaurantList.find()
        .lean()
        .then( restaurants => {
            console.log(restaurants)
            res.render('index', {restaurants})
        } )
        .catch(error => console.error(error))
})

// app.get('/restaurants/:restaurant_id', (req,res) => {
//     const show_restaurant = restaurantList.filter( restaurant => restaurant.id === Number(req.params.restaurant_id))
//     res.render('show', {restaurant: show_restaurant})
// })

// app.get('/search', (req,res) => {
//     const keyword = req.query.keyword
//     const restaurants = restaurantList.filter( restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
//     res.render('index', {restaurant: restaurants, keyword: keyword})
// })
// Start and listen on express server
app.listen(port, () => {
    console.log(`Express is listening on http:localhost:${port}`)
})