
// Require packages used in the project
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
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

app.use(routes)
// Route setting


app.get('/search', (req, res) => {
  const { keyword } = req.query
  return restaurantList.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
    .lean()
    .then(restaurants => {
        res.render('index', { restaurants, keyword: req.query.keyword })
    })
})

// Start and listen on express server
app.listen(port, () => {
    console.log(restaurantList)
    console.log(`Express is listening on http:localhost:${port}`)
})