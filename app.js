const { static } = require('express')
// Require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json').results
// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Route setting
app.get('/', (req,res) => {
    res.render('index', {restaurant: restaurantList} )
})

app.get('/restaurants/:restaurant_id', (req,res) => {
    const show_restaurant = restaurantList.filter( restaurant => restaurant.id === Number(req.params.restaurant_id))
    res.render('show', {restaurant: show_restaurant})
})

app.get('/search', (req,res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.filter( restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
    res.render('index', {restaurant: restaurants, keyword: keyword})
})
// Start and listen on express server
app.listen(port, () => {
    console.log(`Express is listening on http:localhost:${port}`)
})