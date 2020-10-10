const { static } = require('express')
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json').results
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',() => console.log('mongodb error'))
db.once('open', () => {
    console.log('mongodb connected')
    for(let i = 0; i < restaurantList.length; i++){
        Restaurant.create({
            name: restaurantList.name,
            name_en: restaurantList.name_en,
            category: restaurantList.category,
            image: restaurantList.image,
            location: restaurantList.location,
            phone: restaurantList.phone,
            google_map: restaurantList.google_map,
            rating: restaurantList.reating,
            description: restaurantList.description
        })
    }
    console.log('done')
})