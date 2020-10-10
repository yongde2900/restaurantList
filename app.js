
// Require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

// Setting body-parser
app.use(bodyParser.urlencoded({extended: true}))

// Route setting
app.get('/', (req, res) => {
    restaurantList.find()
        .lean()
        .then( restaurants => {
            console.log(restaurants)
            res.render('index', {restaurants})
        } )
        .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

app.post('/restaurants', (req, res) => {
    const newRestaurant = req.body
    return restaurantList.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
app.get('/restaurants/:_id', (req,res) => {
    const _id = req.params._id
    restaurantList.findById(_id)
        .lean()
        .then( restaurants => {
            console.log(restaurants)
            res.render('show', {restaurants})})
        .catch( error => console.log(error))
})

// app.get('/search', (req,res) => {
//     const keyword = req.query.keyword
//     const restaurants = restaurantList.filter( restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
//     res.render('index', {restaurant: restaurants, keyword: keyword})
// })
// Start and listen on express server
app.listen(port, () => {
    console.log(`Express is listening on http:localhost:${port}`)
})