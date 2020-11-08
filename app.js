
// Require packages used in the project
const express = require('express')
const bodyParser = require('body-parser')
const restaurantList = require('./models/restaurant')
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport')
const usePassport = require('./config/passport')
require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

app.use(session({
    secret: 'MySecret',
    resave: false,
    saveUninitialized: true
}))

// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({extended: true}))

usePassport(app)

app.use(routes)
// Start and listen on express server
app.listen(PORT, () => {
    console.log(restaurantList)
    console.log(`Express is listening on http:localhost:${PORT}`)
})