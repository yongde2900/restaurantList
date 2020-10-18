
// Require packages used in the project
const express = require('express')

const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000

// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting body-parser
app.use(bodyParser.urlencoded({extended: true}))

// Setting routes
app.use(routes)

// Start and listen on express server
app.listen(port, () => {
    console.log(restaurantList)
    console.log(`Express is listening on http:localhost:${port}`)
})