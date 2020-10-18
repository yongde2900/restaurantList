const express = require('express')
const router = express.Router()
const restaurantList = require('../models/restaurant')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)
module.exports = router