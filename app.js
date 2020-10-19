
// Require packages used in the project
const express = require('express')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')
const app = express()
const port = 3000 || process.env.PORT

// Require handlebars
const exphbs =require('express-handlebars')
const { put } = require('./routes')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)
// Start and listen on express server
app.listen(port, () => {
    console.log(restaurantList)
    console.log(`Express is listening on http:localhost:${port}`)
})