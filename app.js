const { static } = require('express')
// Require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')
// Require handlebars
const exphbs =require('express-handlebars')

// Setting static files
app.use(express.static('public'))

// Setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Route setting
app.get('/' ,(req,res) => {
    res.render('index')
})

// Start and listen on express server
app.listen(port, () => {
    console.log(`Express is listening on http:localhost:${port}`)
})