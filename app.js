
// Require packages used in the project
const express = require('express')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)
// Start and listen on express server
app.listen(PORT, () => {
    console.log(restaurantList)
    console.log(`Express is listening on http:localhost:${PORT}`)
})